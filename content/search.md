---
title: Search docs
icon: fox.svg
area: ""
fileName: search.html
---

<!-- Boilerplate UI from https://pagefind.app/docs/ui-usage/ -->
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>
<script>
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({
      element: "#search",
      pageSize: 10,
      showImages: false,
      showSubResults: true,
    });
  });
</script>
