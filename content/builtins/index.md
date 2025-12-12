---
title: Origami built-in functions
---

${ src/templates/blocks.ori(areaLinks) }

Web Origami includes builtin functions that you can call from:

- Origami [site definitions](/language/sites.html)
- Origami [templates](/language/templates.html)
- [command-line interface](/cli/) commands
- JavaScript programs

## Namespaces

Origami builtin functions are organized into JavaScript-style top-level globals:

${ Tree.map(node_modules/@weborigami/origami/src/dev/help.yaml, (help, namespaceSlash) => Tree.indent`

  <div>
    <a href="${ namespaceSlash }">${ Origami.slash.remove(namespaceSlash) }</a>
    — ${ help.description }
  </div>
`)
}

## Functions and objects by name

${ src/templates/commandList.ori("") }
