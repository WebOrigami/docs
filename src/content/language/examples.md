---
title: Example sites
subtitle: Created with the Origami language
---

${ map(examples.yaml, (example, keySlash) => `

<h2>${ example/name }</h2>
<a href="${ example/url }">
  <img class="screenshot" src="/assets/screenshots/${ slash/remove(keySlash) }.png" alt="Screenshot of ${ example/url }">
</a>
<p>
${ example/description }
${ if(example/video, `<a href="${ example/video }">Video tour</a> &nbsp; `) }
<a href="${ example/url }">Visit site</a>
${ if(example/repo, ` &nbsp; <a href="${ example/repo }">View source</a>`) }
</p>
`) }

<h2>Japan Traverse Hike ebook</h2>
<a href="https://github.com/WebOrigami/japan-hike-ebook">
  <img class="screenshot" src="/assets/misc/ebookCover.jpg" alt="Book cover showing a grassy meadow with an elevated wooden pathway">
</a>

In addition to creating websites, Origami can generate other software artifacts like ebooks. This example project generates an ebook using markdown text with images.

<a href="https://github.com/WebOrigami/japan-hike-ebook">View source</a>
