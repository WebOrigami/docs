---
title: "@index([graph])"
---

Returns a default `index.html` page for the indicated graph. This will contain links for each of the graph's keys.

This built-in function is implicitly included when you use the [@serve](#@serve) function, but you can also invoke it manually in situations where you want to explicitly create a functional index page but don't care about its appearance, or want to define a simple index page with a different name.

For example, in an Origami `.graph` file you can write:

```
public = {
  listing.html = @index(public)
}
```

In conjunction with [@debug](@debug.html), you can invoke `@index` from the browser address bar to obtain a listing of the contents of that point in the site's graph:

```
http://localhost:5000/path/to/something/!@index
```

This is helpful if you need to browse or access pages or resources that aren't exposed on the page at that route.
