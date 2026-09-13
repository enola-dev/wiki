# Logging

Logging frameworks and utilities for Java.

- [SLF4J SubstituteLoggerFactory Concurrency Quirk](slf4j-substitute-logger-factory.md) - In SLF4J 2.x, concurrent initialization can cause LoggerFactory.getILoggerFactory() to temporarily return a SubstituteLoggerFactory instead of the expected logging backend factory (such as Logback's LoggerContext), resulting in unexpected ClassCastException in multi-threaded environments.
