---
title: Caching
---

_This page documents experimental behavior caching behavior in an Origami test release. This material is not yet relevant for regular Origami releases._

_There is currently no way to turn off this caching; such a feature would only be added if it proves to be necessary. If you have concrete cases where caching is inappropriate, and you need to compute a value each time it's requested, please describe your scenario in the Origami chat._

When you serve or build your site, Origami must calculate the values of pages and other resources. To improve performance, Origami caches (remembers) the values in memory so that subsequent requests can immediately return a result without rerunning the original code logic.

Origami’s caching is designed to be largely invisible, but understanding how and when it comes into play can help you get better performance in your Origami projects.

## What gets cached

* Local files. All files loaded by your site are cached in memory. If you edit files while a site is running, Origami throws away all cached values that depend on that file so that they may be recalculated; see below.
* Unpacked file data. Text files in formats like JSON, YAML, or Origami are _unpacked_ to objects that you can work with in code. Any given file will only need to be unpacked at most once. If one part of your site references `data.json/name` and another location references `data.json/description`, the `data.json` file will be unpacked only once.
* Values addressable with a path. Using the `ori` command-line tool, you can extract values from your site using a slash-separated path. If `site.ori` defines `index.html`, then `site.ori/index.html` returns that page. That page is _addressable_ with that path; all such addressable values are cached. (See below for more details.) This also applies to extracting values from a site while serving it, so serving `site.ori` and then navigating to `index.html` caches that page.
* Scope references. If your Origami file includes a file path like `src/template.ori`, Origami searches up the file hierarchy to figure out which `src` folder you’re referring to. (See [Scope](scope.html) for details on this.) Origami will do that search once and save the reference.
* Referenced URLs. If you reference an `https:` or other URL, that data will be downloaded and saved in memory. That happens only once per URL, regardless of where the URL is used in your site.

### Addressable vs non-addressable values

To elaborate on what is meant by an "addressable" value, consider the following Origami file:

```ori
// addressable.ori
${ samples/help/caching/addressable.ori }
```

Here it's possible for you to directly extract `addressable.ori/about/index.html`, so by definition that page is addressable — which means that value is cacheable. If you ask for that page, the call to the template `page.ori.html` will happen once, and the result remembered for next time.

But not everything in Origami is addressable. Consider this file that defines a function that returns the maximum of two numbers:

```ori
${ samples/help/caching/max.ori }
```

This function can't be invoked with a path — paths must take string arguments — so Origami won't cache calls to this function. If you were to call this function and incorporate the resulting number into, say, building an HTML page with a string name, Origami wouldn't cache the intermediate number, but would cache the complete page text.

## Eager versus lazy properties

Origami provides two ways of defining object properties: standard eager properties defined with `:`, and lazy properties defined with `=`. Here’s an example of both:

```ori
{
  a: 1
  b = 2
}
```

Here `a` is an eager property that will always be evaluated as soon as this file is loaded. This is standard JavaScript behavior.

In contrast, `b` is a lazy property and will only be evaluated if you ask this object for that property. If you were to inspect this object, `b` will be a property getter (alternatively known as a property accessor). Because Origami expressions are fundamentally asynchronous, the `b` property getter returns a `Promise` for a result.

### The `:` syntax is for JavaScript interoperability

Eager properties may do more work than is actually necessary, so only use the eager `:` syntax when you defining an object you will pass to a JavaScript function that expects a plain object with synchronous properties. Example:

```ori
JSON.stringify({ timestamp: Date.now() })
```

Here the standard `JSON.stringify` function expects a plain JavaScript object, so you must define the `timestamp` property with a `:`. If you were to use `=` in this situation, the `timestamp` would be a `Promise`, which `JSON.stringify` cannot render.

### Prefer `=` syntax for object properties

Unless you have to interoperate with JavaScript (see above), it is always preferable to define a property as lazy by using `=`. When serving locally, depending on what page you’re looking at, the value might not need to be calculated at all, so your site will be faster. And if the value is requested, it's calculated only once and then cached.

## File changes automatically clear cache entries

To support local development sessions in the browser, Origami tracks which files your code loads in order to generate specific site resources. When those files change, Origami clears all affected cache entries so that subsequent requests will recalculate those resources.

Given this site definition:

```ori
// site.ori
{
  index.html = page.ori(index.md)
  about.html = page.ori(about.md)
}
```

if you browse to `index.html`, Origami loads `page.ori` and `index.md`, and records that `index.html` depends on those two files as well a third dependency on the overall `site.ori` definition. If you refresh your browser at this point, Origami returns the cached value of `index.html` because nothing has changed.

When you edit any of `page.ori`, `index.md`, or `site.ori`, Origami clears the cached value of `index.html`. If you then refresh your browser, Origami recalculates `index.html` and returns the updated page so you can see the results of your change.

If you are viewing `index.html` and edit `about.md`, Origami retains the cached value of `index.html`, because that page doesn't depend on `about.md`.

## Persistent caching in the file system

Origami automatically caches the value of network resources in memory, so the cached values are lost when Origami exits. If you have a site that depends on many network resources, it can be useful to explicitly ask for those resources to be cached as local files using the [`Tree.cache`](/builtins/tree/cache.html) operation.
