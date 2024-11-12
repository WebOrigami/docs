---
title: "https: protocol"
subtitle: To access an individual web resource via HTTP
---

Fetches the HTTPS web resource at the indicated location.

The first argument is a string indicating the URL domain; the remainder are the portions of the URL path within that domain. E.g., for the URL `example.com/foo/bar`, the arguments would be `example.com`, `foo`, and `bar`.

Since HTTPS URLs are a valid expression in the Origami language, you won't normally need to call this function. If you specify a URL like `https://example.com` in an expression, it invokes the `https` function for you to fetch the indicated web resource.

```console
$ ori https://example.com
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
…
```
