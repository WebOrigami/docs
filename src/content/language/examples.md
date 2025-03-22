---
title: Example sites
subtitle: Created with the Origami language
---

${ map(examples.yaml, (example, keySlash) => `

<h2>${ example/name }</h2>
<a href="${ example/url ?? example/repo }">
  <img class="screenshot" src="${
    example/image ??
    `/assets/screenshots/${ slash/remove(keySlash) }.png`
  }" alt="Screenshot">
</a>
<p>
${ example/description }
${ example/video ? `<a href="${ example/video }">Video tour</a> &nbsp; ` : "" }
${ example/url ? `<a href="${ example/url }">Visit site</a>` : "" }
${ example/url && example/repo ? ` &nbsp; ` : "" }
${ example/repo ? `<a href="${ example/repo }">View source</a>` : "" }
</p>
`) }
