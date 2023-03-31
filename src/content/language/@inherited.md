---
title: "@inherited(key)"
---

Gets the value of `key` which the graph inherits from its parent [scope](/language/scope.html), bypassing any value the current graph itself may have for `key`.

For example, in an Origami `.graph` file, you can write:

```
public = {
  message = "Hello"
  hola = @inherited/message     # "Hola"
}

message = "Hola"
```
