---
title: "help: protocol"
subtitle: Command line help on built-in namespaces and commands
---

Returns a brief help summary and a link to the relevant page on this Origami documentation site.

- `help` — lists available namespaces
- `help:<namespace>` — lists the commands in the given namespace
- `help:<command>` — a one-line summary of the command that includes the namespace and function signature

For example, if you want to fully specify a reference the [`json`](/builtins/origami/json.html) that includes the namespace, but can't remember what namespace `json` is in:

```console
$ ori help:json
${ help:json }
```

This shows that the `json` command is in the [`origami:`](/builtins/origami) namespace.
