---
title: "https: protocol"
subtitle: To access an individual web resource via HTTPS
---

Fetches the web resource at the indicated location via HTTPS.

```console
$ ori https://example.com
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
…
```

See also [`http:`](http.html). If you have a path with a dynamic portion, the Origami-specific [`httpstree:`](httpstree.html) protocol may be useful; see that page for an example.
