---
title: ObjectMap class
subtitle: Wraps a plain JavaScript object or array as an async tree
---

## JavaScript usage

Create a new `ObjectMap` by passing an object or array to the constructor:

```js
// object.js

import { ObjectMap } from "@weborigami/origami";

// Wrap an object to create an async tree.
export default new ObjectMap({
  Alice: "Hello, Alice.",
  Bob: "Hello, Bob.",
  Carol: "Hello, Carol.",
});
```

This defines a tree whose keys are the object's keys, and whose values are the object's values:

<figure>
${ svg({
  Alice: "Hello, Alice."
  Bob: "Hello, Bob."
  Carol: "Hello, Carol."
}) }
</figure>

The [ori](/cli) tool will display the contents of the resulting `ObjectMap`.

```console
$ ori object.js/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

## API

${ src/templates/class.ori(api/drivers/ObjectMap.yaml/exports/0) }
