---
title: ObjectGraph
subtitle: Wraps a plain JavaScript object or array as an explorable graph
sample:
  Alice: Hello, Alice.
  Bob: Hello, Bob.
  Carol: Hello, Carol.
---

## Usage

Create a new `ObjectGraph` by passing an object or array to the constructor:

```js
// object.js

import { ObjectGraph } from "@graphorigami/origami";

// Wrap an object to create an explorable graph.
export default new ObjectGraph({
  Alice: "Hello, Alice.",
  Bob: "Hello, Bob.",
  Carol: "Hello, Carol.",
});
```

This defines a graph whose keys are the object's keys, and whose values are the object's values:

<figure>
{{ svg sample }}
</figure>

The [ori](/ori) tool will display the contents of the resulting `ObjectGraph`.

```console
$ ori object
{{ yaml sample }}
```

{{ templates/class.ori(api/ObjectGraph.yaml/exports/0) }}
