---
title: redirect(url, [options])
supertitle: "Origami."
---

This redirects to the indicated URL.

The optional `options` parameter can include a `permanent` option:

- If `false` (the default), the redirect will be temporary.
- If `true`, the redirect will be permanent.

When used with a running Origami server via [`serve`](/builtins/dev/serve.html), this will issue an immediate redirect via an HTTP status code 307 (Temporary Redirect) or 301 (Moved Permanently) as appropriate.

When copied to the file system via [`copy`](/builtins/dev/copy.html), this creates an HTML page implementing an [HTML redirection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#html_redirections)) through a `<meta>` tag.
