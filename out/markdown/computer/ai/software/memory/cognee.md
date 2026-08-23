---
type: Software
resource: https://www.cognee.ai
generated: { by: reference_agent/gemini-3.7-flash, at: 2026-08-23T15:56:15Z }
tags:
  - ai
  - memory
  - agents
  - opensource
  - knowledge-graph
sources:
  - resource: https://docs.cognee.ai
    title: "Cognee Documentation"
  - resource: https://github.com/topoteretes/cognee
    title: "Cognee GitHub Repository"
---

# Cognee

Cognee is an open-source memory engine for AI applications and agents that organizes data into interconnected, topological knowledge graphs and vector embeddings. It bridges the gap between unstructured data ingestion and high-precision retrieval by transforming documents, conversations, and code into structured relational graphs enriched with semantic vectors.

```mermaid
graph LR
    Input[Unstructured Data / Transcripts / Docs] --> Add["cognee.add()"]
    Add --> Cognify["cognee.cognify()<br/>(LLM Extraction & Graph Construction)"]
    Cognify --> GraphStore[(Graph DB: Neo4j / NetworkX / Kùzu)]
    Cognify --> VectorStore[(Vector DB: Qdrant / LanceDB / PGVector)]
    GraphStore & VectorStore --> Search["cognee.search()<br/>(Hybrid / Multi-hop Recall)"]
    Search --> Agent[AI Agent / LLM]
```

## Key Characteristics

- **Topological Knowledge Graphs**: Transforms raw inputs into nodes and edges representing entities and relations, enabling multi-hop associative queries that pure vector similarity searches miss.
- **Local & Self-Hostable**: Can run completely locally using embedded engines like SQLite, NetworkX, and LanceDB, or scale to production using Neo4j, Qdrant, and PostgreSQL (`pgvector`).
- **Deterministic Pipeline**: Provides explicit control over data ingestion (`add`), graph cognition (`cognify`), and semantic/graph querying (`search`).
- **Multi-Modal Support**: Processes PDFs, audio files, GitHub repositories, and tabular data into uniform cognitive graphs.

## Core API Workflow

Cognee exposes a Python API structured around three main operations:

```python
import asyncio
import cognee

async def main():
    # 1. Add raw text, files, or datasets to the memory pipeline
    await cognee.add("Alice is the lead architect for the Orion project based in Zurich.")
    await cognee.add("The Orion project uses Rust and Apache Arrow for memory efficiency.")

    # 2. Cognify: Extract entities, resolve relationships, and construct graph embeddings
    await cognee.cognify()

    # 3. Search: Retrieve structured memory context
    results = await cognee.search("What technologies does Alice's project rely on?")
    for result in results:
        print(result)

if __name__ == "__main__":
    asyncio.run(main())
```

## Supported Storage Backends

| Component | Embedded / Local | Production / Distributed |
| :--- | :--- | :--- |
| **Relational DB** | SQLite | PostgreSQL |
| **Graph DB** | NetworkX, Kùzu | Neo4j, FalkorDB |
| **Vector DB** | LanceDB, ChromaDB | Qdrant, Milvus, pgvector |

## Related Concepts

- [LLM and Agent Memory](memory.md) - Overview of AI agent memory architectures.
- [Graphiti and Zep](graphiti.md) - Temporal knowledge graph engine for dynamic conversational memory.
- [HippoRAG](hipporag.md) - Neurobiologically inspired knowledge graph retrieval with PageRank.
