---
title: "@if(condition, trueValue, [falseValue])"
---

Evaluates `condition`, and if it is truthy, returns `trueValue`. If the condition is not truthy, this returns `falseValue` if supplied, otherwise `undefined`.

If `trueValue` or `falseValue` is a function, it will be evaluated and its result returned instead.
