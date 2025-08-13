---
title: ObjectTree class
subtitle: Wraps a plain JavaScript object or array as an async tree
---

## JavaScript usage

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
${ svg.js({
  Alice: "Hello, Alice."
  Bob: "Hello, Bob."
  Carol: "Hello, Carol."
}) }
</figure>

The [ori](/cli) tool will display the contents of the resulting `ObjectTree`.

```console
$ ori object.js/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## API

${ templates/class.ori(api.ori/drivers/ObjectTree.yaml/exports/0) }
