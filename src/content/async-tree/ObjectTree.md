---
title: ObjectTree
subtitle: Wraps a plain JavaScript object or array as an async tree
sample:
  Alice: Hello, Alice.
  Bob: Hello, Bob.
  Carol: Hello, Carol.
---

## Usage

Create a new `ObjectTree` by passing an object or array to the constructor:

```js
// object.js

import { ObjectTree } from "@weborigami/origami";

// Wrap an object to create an async tree.
export default new ObjectTree({
  Alice: "Hello, Alice.",
  Bob: "Hello, Bob.",
  Carol: "Hello, Carol.",
});
```

This defines a tree whose keys are the object's keys, and whose values are the object's values:

<figure>
${ svg.js sample }
</figure>

The [ori](/ori) tool will display the contents of the resulting `ObjectTree`.

```console
$ ori object.js/
${ @yaml sample }
```

${ templates/class.ori(api.ori/ObjectTree.yaml/exports/0) }
