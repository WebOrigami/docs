---
title: "http: protocol"
subtitle: To access an individual web resource via HTTP
---

Fetches the HTTP web resource at the indicated location.

The first argument is a string indicating the URL domain; the remainder are the portions of the URL path within that domain. E.g., for the URL `example.com/foo/bar`, the arguments would be `example.com`, `foo`, and `bar`.

Since HTTP URLs are a valid expression in the Origami language, you won't normally need to call this function. If you specify a URL like `http://example.com` in an expression, it invokes the `http` function for you.
