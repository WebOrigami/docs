---
title: How to define common HTML elements for many pages
---

You want all the pages on your site to share common elements: a header, navigation, links to stylesheets, etc.

<span class="tutorialStep"></span> Create those pages as HTML fragments — valid HTML for just the content of the page. Example: you have a file called `a.html` that contains

```{{"html"}}
{{ samples.ori/templates/fragments/a.html }}
```

<span class="tutorialStep"></span> Put those HTML fragments in a folder called `html` (or `bodies`, `fragments`, etc.):

```
myProject/
  html/
    a.html
    b.html
    c.html
```

<span class="tutorialStep"></span> Create a page template with a name like `page.orit`. Place a `\{{ _ }}` placeholder where you want the page fragment/body to go.

```console
$ cat page.orit
{{ samples.ori/templates/page.orit }}
```

You can apply this template to a single page to preview how it looks the content of a page like `a.html` will be placed inside the contents of the `page.orit` template:

```console
$ ori page.orit html/a.html
{{ samples.ori/templates/page.orit samples.ori/templates/fragments/a.html }}
```

<span class="tutorialStep"></span> Create a site.ori file to define your site. This defines a virtual `public` folder that applies your `page.orit` template to all the pages in the `html` folder.

```
{
  public = @map(html, page.orit)
}
```

<span class="tutorialStep"></span> Serve your site and browse to a page.

```console
$ ori @serve site.ori/public
```

The virtual `public` folder contains versions of all the page fragments in the original `html` folder, only now those fragments have each been placed inside the standard page elements for your site.

<figure>
{{
  svg.js @map(samples.ori/templates/fragments, samples.ori/templates/page.orit)
}}
</figure>