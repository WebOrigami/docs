---
title: File graphs
numberHeadings: true
intro = client/samples/patternIntro:
---

We now have a working markdown-to-HTML system. Depending on our needs, we might be done. But the markdown content is stored in a JavaScript object defined in a JavaScript file. As discussed earlier, there are a number of other data representations and storage systems we could choose.

Which approach is best for our particular team authors might vary, but as an example let's look at how we can transition our system to read markdown from file system folders because that's relatively simple. The graph approach we're taking is flexible, so we could change our mind again later.

## Rough in the file graph

```{{'js'}}
{{ intro/round2complete/folder.js }}
```

&nbsp;

Next: [Copy a graph](intro6.html)
