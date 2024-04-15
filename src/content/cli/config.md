---
title: Configuration
---

You can configure Origami by defining a `config.ori` file at the root of your project. Typically you will put this in same folder as your npm `package.json` file.

Any values you define in the `config.ori` will be available when you invoke the `ori` CLI anywhere inside the project, and will also be available to Origami expressions in other `.ori` files.

```console
$ cat config.ori
{
  message = "This message is defined in the Origami configuration file."
}
$ ori message
This message is defined in the Origami configuration file.
```
