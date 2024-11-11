---
title: "inherited: namespace"
subtitle: URL protocol to get an inherited value instead of a local one
---

Gets the value of `key` which the tree inherits from its parent [scope](/language/scope.html), bypassing any value the current tree itself may have for `key`.

For example, in an Origami `.ori` file, you can write:

```ori
{
  public = {
    message = "Hello"
    hola = inherited/message     // "Hola"
  }

  message = "Hola"
}
```
