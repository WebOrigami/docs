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
