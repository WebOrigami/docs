---
title: Origami built-in functions
---

${ templates/blocks.jse(areaLinks) }

The Origami language includes a number of functions that you can call from Origami site definitions, Origami [templates](/language/templates.html), and [command-line interface](/cli/) commands.

## Namespaces and protocols

<ul>
${ Tree.map(node_modules/@weborigami/origami/src/dev/help.yaml, (help, namespaceSlash) => Tree.indent`
  <li>
    <a href="${ namespaceSlash }">${ Origami.slash.remove(namespaceSlash) }:</a>
    ${ help.description }
  </li>
`) }
</ul>

## Functions and objects by name

${ commandList.jse("") }
