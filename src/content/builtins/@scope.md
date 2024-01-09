---
title: "@scope"
---

This is a collection of functions for working with [scope](scope.html).

<a name="extend"></a>

## @scope/extend(tree, ...scopeTrees)

Returns a copy of the given `tree` whose scope will the indicated trees _and_ the current scope. This is similar to [@scope/set](#set), but the latter doesn't implicitly include the current scope.

<a name="get"></a>

## @scope/get([tree])

If the `tree` has a `scope` property, this returns the value of that property.

<a name="set"></a>

## @scope/set(tree, ...scopeTrees)

Returns a copy of the given `tree` with the indicated trees as its scope.
