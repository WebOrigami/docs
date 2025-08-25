---
title: "help([namespace|command])"
supertitle: "Dev."
---

Returns a brief help summary and a link to the relevant page on this Origami documentation site.

- `help` — lists available namespaces
- `help/<namespace>` — lists the commands in the given namespace
- `help/<command>` — a one-line summary of the command that includes the namespace and function signature

For example, if you want to fully specify a reference the [`json`](/builtins/tree/json.html) that includes the namespace, but can't remember what namespace `json` is in:

```console
$ ori help/json
${ Dev.help("json") }
```

This shows that the `json` command is in the [`Tree`](/builtins/tree) namespace.
