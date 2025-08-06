---
title: indexPage([tree])
supertitle: "Origami."
---

Returns a default `index.html` page for the indicated tree. This will contain links for each of the tree's keys.

This built-in function is implicitly included when you use the [`serve`](/builtins/dev/serve.html) function, but you can also invoke it manually in situations where you want to explicitly create a functional index page but don't care about its appearance, or want to define a simple index page with a different name.

For example, in an Origami `.ori` file you can write:

```ori
public = {
  listing.html = Tree.indexPage(public)
}
```

In conjunction with [`debug`](/builtins/dev/debug.html), you can invoke `indexPage` from the browser address bar to obtain a listing of the contents of that point in the site's tree:

```
http://localhost:5000/path/to/something/!indexPage
```

This is helpful if you need to browse or access pages or resources that aren't exposed on the page at that route.

See also [`static`](static.html).
