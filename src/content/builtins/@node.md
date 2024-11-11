---
title: "node"
---

The `js` built-in provides access to a number of Node.js modules with functions that you may find useful in Origami expressions:

- [Buffer](https://nodejs.org/dist/latest-v19.x/docs/api/buffer.html)
- [path](https://nodejs.org/dist/latest-v19.x/docs/api/path.html)
- [process](https://nodejs.org/dist/latest-v19.x/docs/api/process.html)
- [url](https://nodejs.org/dist/latest-v19.x/docs/api/url.html)

For example, in an Origami template you can use the `node/process` module to include information about the development environment:

```
Environment: \$\{ node/process/env/NODE_ENV }
```

See also [`js`](js.html), which provides access to a number of JavaScript classes and utility functions.
