---
title: Transforming data with maps
files:
  folder: |
    html: !ori map(markdown, mdHtml, extension='md→html')
    markdown:
      Alice.md: Hello, **Alice**.
      Bob.md: Hello, **Bob**.
      Carol.md: Hello, **Carol**.
---

## Example: Defining a virtual folder

```console
$ ls
markdown    html = map(markdown, mdHtml, extension='md->html')
$ ls markdown
Alice.md    Bob.md    Carol.md
$ cat Alice.md
Hello, **Alice**.
```

```console assert: true, path: files
$ ori folder
html: !ori map(markdown, mdHtml, extension='md->html')
markdown:
  Alice.md: Hello, **Alice**.
  Bob.md: Hello, **Bob**.
  Carol.md: Hello, **Carol**.
```

<figure>
${ svg folder }
</figure>

```console assert: true, path: files
$ ori meta folder
html:
  Alice.html: |
    <p>Hello, <strong>Alice</strong>.</p>
  Bob.html: |
    <p>Hello, <strong>Bob</strong>.</p>
  Carol.html: |
    <p>Hello, <strong>Carol</strong>.</p>
"html = map(markdown, mdHtml, extension='md->html')": null
markdown:
  Alice.md: Hello, **Alice**.
  Bob.md: Hello, **Bob**.
  Carol.md: Hello, **Carol**.
```

<figure>
${ svg meta folder }
</figure>
