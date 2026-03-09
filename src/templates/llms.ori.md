# Web Origami

## Origami language documentation

The core language definition is in [Origami expressions](/language/expressions.html).

${
Tree.mapExtension(content/language, ".md->.html", doc => doc)
-> (docs) => Tree.map(docs, (doc, key) => Tree.indent`
  [${ doc.title }](/language/${ key })
`) }

## Examples

${ Tree.map(examples.yaml, (example) =>
  example.repo
    ? Tree.indent`
      [${ example.name}](${ example.repo }) - ${ example.description.replaceAll("\n", " ") }
`
: ""
)}
