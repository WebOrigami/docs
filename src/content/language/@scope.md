---
title: "@scope"
---

This is a collection of functions for working with [scope](scope.html).

<a name="extend"></a>

## @scope/extend(graph, ...scopeGraphs)

Returns a copy of the given `graph` whose scope will the indicated graphs _and_ the current scope. This is similar to [@scope/set](#set), but the latter doesn't implicitly include the current scope.

<a name="get"></a>

## @scope/get([graph])

If the `graph` has a `scope` property, this returns the value of that property.

<a name="set"></a>

## @scope/set(graph, ...scopeGraphs)

Returns a copy of the given `graph` with the indicated graphs as its scope.
