---
title: from(obj, [options])
supertitle: "Tree."
---

Attempts to cast the indicated object to an async tree.

If the object is a plain object, it will be converted to an [ObjectMap](/async-tree/ObjectMap.html).

The optional `deep` option can be set to `true` to convert a plain object to a `DeepObjectMap`. The optional `parent` parameter will be used as the default parent of the new tree.
