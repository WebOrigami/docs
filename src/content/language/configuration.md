---
title: Configuration
---

You can configure Origami by defining a `config.ori` file at the root of your project. Typically you will put this in same folder as your npm `package.json` file.

Any values you define in the `config.ori` will be available to Origami expressions in `.ori` files and in expressions you invoke the `ori` [CLI](/cli) anywhere inside the project,

```console
$ cat config.ori
{
  message = "This message is defined in the Origami configuration file."
}
$ ori message
This message is defined in the Origami configuration file.
```
