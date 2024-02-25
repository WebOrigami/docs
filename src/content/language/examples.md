---
title: Example sites
subtitle: Created with the Origami language
---

{{
=@map(examples.yaml, =`

<h2>{{ _/name }}</h2>
<a href="{{ _/url }}">
  <img class="screenshot" src="/assets/screenshots/{{ @key }}.png" alt="Screenshot of {{ _/url }}">
</a>
<p>
{{ _/description }}
{{ @if(_/video, `<a href="{{ _/video }}">Video tour</a> &nbsp; `) }}
<a href="{{ _/url }}">Visit site</a>
{{ @if(_/repo, ` &nbsp; <a href="{{ _/repo }}">View source</a>`) }}
</p>
`)
}}

<h2>Japan Traverse Hike ebook</h2>
<a href="https://github.com/WebOrigami/japan-hike-ebook">
  <img class="screenshot" src="/assets/misc/ebookCover.jpg" alt="Book cover showing a grassy meadow with an elevated wooden pathway">
</a>

In addition to creating websites, Origami can generate other software artifacts like ebooks. This example project generates an ebook using markdown text with images.

<a href="https://github.com/WebOrigami/japan-hike-ebook">View source</a>
