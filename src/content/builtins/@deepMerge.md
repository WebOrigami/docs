---
title: "deepMerge(...treelikes)"
---

Similar to [`merge`](merge.html), but performs a deep merge: if multiple trees define values for the same key, and those values are themselves async trees, then those values themselves will be merged.
