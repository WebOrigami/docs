---
title: Deep graphs
numberHeadings: true
intro = node_modules/@explorablegraph/pattern-intro/src/class:
---

## Converting a deep graph to a plain object

```{{'js'}}
{{ intro/plain.js }}
```

Note: We could make this function more efficient if we didn't `await` the result of each `get` call serially. Instead, we could kick off all the asynchronous requests, then wait for them all to resolve before continuing. That said, the simple approach here suffices.
