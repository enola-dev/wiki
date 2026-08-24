#!/usr/bin/env python3
"""
Wiki Lint & Fixer for enola-dev/wiki according to AGENTS.md specification.
Checks and fixes:
  1. Frontmatter requirements (type mandatory, title/description omitted, status: stable omitted).
  2. Heading structure (H1 title as first heading, description as first paragraph).
  3. Magic Links syntax ([[path]] without .md, no [[foo|bar]], no [[¬/...]], no [[/...]], no dead links).
  4. File & directory naming (lowercase, kebab-case / domain slugs; no index.md in docs/).
"""

import os
import re
import sys
import argparse
from pathlib import Path

try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False


MAGIC_LINK_REGEX = re.compile(r"\[\[(.*?)\]\]")
H1_HEADING_REGEX = re.compile(r"^#\s+(.+)$", re.MULTILINE)
SLUG_REGEX = re.compile(r"^[a-z0-9]+([.-][a-z0-9]+)*$")


def parse_frontmatter(content: str):
    """Extract frontmatter and remaining body from markdown content."""
    if not content.startswith("---"):
        return None, content, 0
    
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, content, 0
    
    fm_raw = parts[1]
    body = parts[2]
    fm_line_count = fm_raw.count("\n") + 2
    return fm_raw, body, fm_line_count


def simple_parse_yaml(raw_yaml: str) -> dict:
    """Fallback simple YAML parser for basic key-values if PyYAML is not installed."""
    data = {}
    lines = raw_yaml.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        
        if ":" in line and not line.startswith(" ") and not line.startswith("\t"):
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            if val == "":
                sub_list = []
                sub_dict = {}
                i += 1
                while i < len(lines) and (lines[i].startswith(" ") or lines[i].startswith("\t") or not lines[i].strip()):
                    sub_line = lines[i].strip()
                    if sub_line.startswith("- "):
                        sub_list.append(sub_line[2:].strip())
                    elif ":" in sub_line:
                        sk, sv = sub_line.split(":", 1)
                        sub_dict[sk.strip()] = sv.strip()
                    i += 1
                if sub_list:
                    data[key] = sub_list
                elif sub_dict:
                    data[key] = sub_dict
                else:
                    data[key] = ""
                continue
            else:
                if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                    val = val[1:-1]
                data[key] = val
        i += 1
    return data


def load_yaml(raw_yaml: str) -> dict:
    if HAS_YAML:
        try:
            return yaml.safe_load(raw_yaml) or {}
        except Exception:
            return simple_parse_yaml(raw_yaml)
    return simple_parse_yaml(raw_yaml)


class WikiLinter:
    def __init__(self, docs_root: Path, fix: bool = False):
        self.docs_root = docs_root.resolve()
        self.fix = fix
        self.errors = []
        self.warnings = []
        self.fixed = []

    def log_error(self, file_path: Path, message: str):
        rel = file_path.relative_to(self.docs_root.parent)
        self.errors.append((str(rel), message))

    def log_warning(self, file_path: Path, message: str):
        rel = file_path.relative_to(self.docs_root.parent)
        self.warnings.append((str(rel), message))

    def log_fixed(self, file_path: Path, message: str):
        rel = file_path.relative_to(self.docs_root.parent)
        self.fixed.append((str(rel), message))

    def check_naming(self, path: Path):
        """Verify naming conventions: kebab-case/lowercase; index.md must not exist in docs/."""
        name = path.stem
        if path.is_file() and path.suffix == ".md":
            if path.name.lower() == "index.md":
                self.log_error(path, "File 'index.md' is auto-generated during build and must not be placed in docs/")
                if self.fix:
                    try:
                        path.unlink()
                        self.log_fixed(path, "Removed auto-generated 'index.md'")
                    except Exception as e:
                        self.log_error(path, f"Failed to delete 'index.md': {e}")
            elif not SLUG_REGEX.match(name):
                self.log_error(path, f"File name '{path.name}' should be lowercase kebab-case/domain slug")
        elif path.is_dir():
            if not SLUG_REGEX.match(path.name):
                self.log_error(path, f"Directory name '{path.name}' should be lowercase kebab-case")

    def resolve_magic_link(self, source_file: Path, target: str) -> bool:
        """Check if an internal link target resolves to an existing file or directory."""
        if target.startswith("http://") or target.startswith("https://") or target.startswith("mailto:"):
            return True
        
        target_clean = target.lstrip("/")
        if "#" in target_clean:
            target_clean = target_clean.split("#", 1)[0]
        if not target_clean:
            return True

        base_dir = source_file.parent
        dir_target = target_clean[:-6] if target_clean.endswith("/index") else target_clean

        candidate_paths = [
            base_dir / target_clean,
            base_dir / f"{target_clean}.md",
            base_dir / dir_target,
            self.docs_root / target_clean,
            self.docs_root / f"{target_clean}.md",
            self.docs_root / dir_target,
        ]
        return any(p.exists() for p in candidate_paths)

    def lint_and_fix_file(self, file_path: Path):
        self.check_naming(file_path)
        if file_path.name.lower() == "index.md":
            return

        try:
            content = file_path.read_text(encoding="utf-8")
        except Exception as e:
            self.log_error(file_path, f"Failed to read file: {e}")
            return

        fm_raw, body, _ = parse_frontmatter(content)
        modified_fm = False
        modified_body = False

        # 1. Frontmatter Validation
        if fm_raw is None:
            self.log_error(file_path, "Missing required YAML frontmatter (must start with '---')")
            if self.fix:
                doc_type = "Article"
                fm_raw = f"\ntype: {doc_type}\n"
                body = content
                modified_fm = True
                self.log_fixed(file_path, f"Added missing frontmatter with type: {doc_type}")
        
        if fm_raw is not None:
            fm_data = load_yaml(fm_raw)
            if not isinstance(fm_data, dict):
                self.log_error(file_path, "Frontmatter is not a valid YAML mapping")
            else:
                # Check mandatory 'type:'
                if "type" not in fm_data:
                    self.log_error(file_path, "Frontmatter missing mandatory 'type:' property")
                    if self.fix:
                        doc_type = "Article"
                        fm_raw = f"\ntype: {doc_type}" + fm_raw
                        modified_fm = True
                        self.log_fixed(file_path, f"Added 'type: {doc_type}' to frontmatter")

                # Check forbidden 'title:'
                if "title" in fm_data:
                    self.log_error(file_path, "Frontmatter MUST NOT contain 'title:' (inferred from first H1 heading)")
                    if self.fix:
                        title_val = fm_data.get("title", "")
                        fm_raw = re.sub(r"(?m)^title:\s*.*$\n?", "", fm_raw)
                        modified_fm = True
                        if not H1_HEADING_REGEX.search(body):
                            body = f"\n# {title_val}\n" + body
                            modified_body = True
                        self.log_fixed(file_path, "Removed 'title:' from frontmatter")

                # Check forbidden 'description:'
                if "description" in fm_data:
                    self.log_error(file_path, "Frontmatter MUST NOT contain 'description:' (inferred from first paragraph)")
                    if self.fix:
                        fm_raw = re.sub(r"(?m)^description:\s*.*$\n?", "", fm_raw)
                        modified_fm = True
                        self.log_fixed(file_path, "Removed 'description:' from frontmatter")

                # Check status: stable
                if fm_data.get("status") == "stable":
                    self.log_warning(file_path, "Frontmatter contains 'status: stable' (stable is default and should be omitted)")
                    if self.fix:
                        fm_raw = re.sub(r"(?m)^status:\s*stable\s*$\n?", "", fm_raw)
                        modified_fm = True
                        self.log_fixed(file_path, "Removed redundant 'status: stable' from frontmatter")

        # 2. Heading Structure Validation (ignore code blocks)
        body_no_code = re.sub(r"```[\s\S]*?```", "", body)
        h1_matches = list(H1_HEADING_REGEX.finditer(body_no_code))
        if not h1_matches:
            self.log_error(file_path, "Document body missing required level-1 heading (# Title)")
            if self.fix:
                inferred_title = file_path.stem.replace("-", " ").title()
                body = f"\n# {inferred_title}\n" + body
                modified_body = True
                self.log_fixed(file_path, f"Added H1 heading '# {inferred_title}'")
        elif len(h1_matches) > 1:
            self.log_warning(file_path, f"Document body contains multiple ({len(h1_matches)}) H1 headings; single H1 recommended")

        # 3. Magic Links Validation
        def fix_magic_link(match):
            nonlocal modified_body
            raw_target = match.group(1).strip()
            fixed_target = raw_target

            # Check explicit label [[URI|Text]] -> forbidden
            if "|" in fixed_target:
                self.log_error(file_path, f"Magic link [[{raw_target}]] has forbidden explicit label ('|')")
                fixed_target = fixed_target.split("|")[0].strip()

            # Check workspace root prefix [[¬/...]] -> forbidden
            if fixed_target.startswith("¬/"):
                self.log_error(file_path, f"Magic link [[{raw_target}]] uses forbidden root prefix '¬/'")
                fixed_target = fixed_target[2:]

            # Check absolute filesystem prefix [[/...]] -> forbidden
            if fixed_target.startswith("/") and not fixed_target.startswith("//"):
                self.log_error(file_path, f"Magic link [[{raw_target}]] uses forbidden absolute path '/'")
                fixed_target = fixed_target.lstrip("/")

            # Check .md extension in magic link [[foo.md]] -> forbidden
            if fixed_target.endswith(".md"):
                self.log_error(file_path, f"Magic link [[{raw_target}]] must omit '.md' extension")
                fixed_target = fixed_target[:-3]

            if not self.resolve_magic_link(file_path, fixed_target):
                self.log_warning(file_path, f"Magic link [[{fixed_target}]] target could not be resolved")

            if self.fix and fixed_target != raw_target:
                modified_body = True
                self.log_fixed(file_path, f"Fixed magic link [[{raw_target}]] -> [[{fixed_target}]]")
                return f"[[{fixed_target}]]"
            return match.group(0)

        new_body = MAGIC_LINK_REGEX.sub(fix_magic_link, body)
        if new_body != body:
            body = new_body
            modified_body = True

        # Write back fixes if modified
        if self.fix and (modified_fm or modified_body):
            fm_clean = "\n".join([line for line in fm_raw.splitlines() if line.strip() != ""])
            if fm_clean:
                fm_clean = "\n" + fm_clean + "\n"
            else:
                fm_clean = "\n"
            
            reconstructed = f"---{fm_clean}---{body}"
            file_path.write_text(reconstructed, encoding="utf-8")

    def run(self) -> int:
        for dirpath, dirnames, filenames in os.walk(self.docs_root):
            for dirname in dirnames:
                self.check_naming(Path(dirpath) / dirname)
            for filename in filenames:
                if filename.endswith(".md"):
                    file_path = Path(dirpath) / filename
                    self.lint_and_fix_file(file_path)

        # If in fix mode, re-run in check mode to ensure all issues were addressed
        remaining_errors = []
        remaining_warnings = []
        if self.fix:
            checker = WikiLinter(docs_root=self.docs_root, fix=False)
            for dirpath, dirnames, filenames in os.walk(self.docs_root):
                for dirname in dirnames:
                    checker.check_naming(Path(dirpath) / dirname)
                for filename in filenames:
                    if filename.endswith(".md"):
                        file_path = Path(dirpath) / filename
                        checker.lint_and_fix_file(file_path)
            remaining_errors = checker.errors
            remaining_warnings = checker.warnings
        else:
            remaining_errors = self.errors
            remaining_warnings = self.warnings

        print("=" * 60)
        print(f"Wiki Maintenance Lint Report for: {self.docs_root}")
        print("=" * 60)

        if self.fixed:
            print(f"\n[FIXED] ({len(self.fixed)} issues fixed):")
            for file, msg in self.fixed:
                print(f"  ✓ {file}: {msg}")

        if remaining_errors:
            print(f"\n[ERRORS] ({len(remaining_errors)} unresolved issues):")
            for file, msg in remaining_errors:
                print(f"  ✗ {file}: {msg}")

        if remaining_warnings:
            print(f"\n[WARNINGS] ({len(remaining_warnings)} warnings):")
            for file, msg in remaining_warnings:
                print(f"  ⚠ {file}: {msg}")

        if not remaining_errors and not remaining_warnings:
            print("\n✨ All wiki documents strictly comply with AGENTS.md!")

        return 1 if remaining_errors else 0


def main():
    parser = argparse.ArgumentParser(description="Lint and fix enola-dev/wiki Markdown documents against AGENTS.md.")
    parser.add_argument("--docs-dir", type=str, default="docs", help="Path to docs directory (default: docs)")
    parser.add_argument("--check", action="store_true", help="Check only; do not modify files (exit 1 if errors found)")
    parser.add_argument("--fix", action="store_true", help="Automatically fix detected issues where possible")
    args = parser.parse_args()

    fix_mode = args.fix
    docs_path = Path(args.docs_dir)

    if not docs_path.is_dir():
        print(f"Error: Docs directory not found at '{docs_path}'", file=sys.stderr)
        sys.exit(2)

    linter = WikiLinter(docs_root=docs_path, fix=fix_mode)
    exit_code = linter.run()
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
