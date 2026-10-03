# midden

Find what is holding a JVM heap dump's memory: retained sizes, owners, leak suspects. One static
binary, no JDK needed.

It reads `.hprof` dumps from `jcmd`, `jmap` or `-XX:+HeapDumpOnOutOfMemoryError`, gzipped or inside a
tar or zip, and builds the full object graph and dominator tree, so every object has a retained size.

See [https://github.com/NullByte3/midden](https://github.com/NullByte3/midden)
