---
type: Concept
tags:
  - java
  - logging
  - slf4j
  - logback
  - concurrency
sources:
  - resource: https://www.slf4j.org/codes.html#substituteLogger
    id: slf4j-substitute-logger
    title: SLF4J Warning - Substitute Logger
---

# SLF4J SubstituteLoggerFactory Concurrency Quirk

In SLF4J 2.x, concurrent initialization can cause `LoggerFactory.getILoggerFactory()` to temporarily return a `SubstituteLoggerFactory` instead of the expected logging backend factory (such as Logback's `LoggerContext`), resulting in unexpected `ClassCastException` in multi-threaded environments.

## Problem Description

When bootstrapping a Java application or test suite that runs tests concurrently (such as JUnit 5 parallel execution), multiple threads may interact with logging simultaneously.

If code attempts to cast the underlying `ILoggerFactory` to a concrete implementation:

```java
var context = (LoggerContext) LoggerFactory.getILoggerFactory();
```

A `ClassCastException` can be thrown intermittently:

```text
java.lang.ClassCastException: class org.slf4j.helpers.SubstituteLoggerFactory cannot be cast to class ch.qos.logback.classic.LoggerContext
```

## Root Cause Analysis

In SLF4J 2.x, `org.slf4j.LoggerFactory` tracks its lifecycle via internal states: `UNINITIALIZED`, `ONGOING_INITIALIZATION`, `SUCCESSFUL_INITIALIZATION`, and `FAILED_INITIALIZATION`.

When the first thread triggers SLF4J initialization:

1. `INITIALIZATION_STATE` transitions from `UNINITIALIZED` to `ONGOING_INITIALIZATION`.
2. The initializing thread enters `performInitialization()`, which uses Java SPI (`ServiceLoader<SLF4JServiceProvider>`) to discover, instantiate, and initialize the provider (e.g. `LogbackServiceProvider`).

During this window, if another thread calls `LoggerFactory.getILoggerFactory()`:

1. It checks `if (INITIALIZATION_STATE == UNINITIALIZED)`. Because the state is `ONGOING_INITIALIZATION`, it bypasses synchronization on `LoggerFactory.class`.
2. In the following switch statement, `case ONGOING_INITIALIZATION:` returns `SUBST_PROVIDER` (intended to support re-entrant logging on the initializing thread without deadlocks).
3. As a result, the non-initializing thread immediately receives `SubstituteLoggerFactory` rather than waiting for initialization to finish.

## Resolution

When programmatically configuring or accessing the backend context, do not assume `LoggerFactory.getILoggerFactory()` immediately returns the concrete factory during early startup. Instead, poll with a timeout when `SubstituteLoggerFactory` is encountered:

```java
private static LoggerContext getLoggerContext() {
    var factory = LoggerFactory.getILoggerFactory();
    if (factory instanceof SubstituteLoggerFactory) {
        var sleeper = Sleeper.of(Duration.ofMillis(10), Duration.ofSeconds(5));
        while (factory instanceof SubstituteLoggerFactory) {
            sleeper.sleep("Timed out waiting for SLF4J initialization");
            factory = LoggerFactory.getILoggerFactory();
        }
    }
    if (factory instanceof LoggerContext context) {
        return context;
    }
    throw new IllegalStateException("Expected LoggerContext but got " + factory.getClass().getName());
}
```
