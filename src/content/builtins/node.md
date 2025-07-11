---
title: "node: protocol"
subtitle: Node.js modules
---

The `node:` protocol provides access to Node.js modules.

For example, you can use `<path>` syntax to load the [`node:process`](https://nodejs.org/api/process.html) module, then look up information about the current environment via that module's [`env`](https://nodejs.org/api/process.html#processenv) member:

```
<node:process>.env.NODE_ENV
```
