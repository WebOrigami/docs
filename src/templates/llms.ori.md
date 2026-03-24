# Web Origami

Web Origami is a system for creating sites that complements your understanding of HTML and CSS with the ability to concisely define the structure and content of the site you want.

Web Origami includes these tools and ideas:

- The Origami dialect of JavaScript (see below) lets you concisely define a site or other structured using formulas similar to those in a spreadsheet.
- The [ori command-line interface](/cli/) (CLI) lets you use Origami expressions in a command terminal to manipulate files or get resources out of an Origami site in the command line. The CLI is also useful as a general tool in its own right for working with JavaScript in the shell.
- The [built-in functions](/builtins/) let you perform a number of common site development tasks in the Origami language or JavaScript.
- The [async-tree library](/async-tree/) lets JavaScript programmers use core Origami features in JavaScript applications.
- The [conceptual pattern](/pattern/) at the foundation of it all lets you represent a wide variety of data types as tree structures that can be easily traversed and transformed. There's no code at this level; you can use the ideas in any project.

## Origami language documentation

${ content/language/expressions.md/_body }

## Additional language documentation

${
  Tree.filter(content/language, (_, key) => key !== "expressions.md")
    -> (filtered) => Tree.mapExtension(filtered, ".md->.html", doc => doc)
    -> (docs) => Tree.map(docs, (doc, key) => Tree.indent`
      [${ doc.title }](/language/${ key })
`)
}

## Origami built-in functions

Built-ins are grouped into namespaces that are registered as Origami/JavaScript globals. Here each built-in is listed by its name.

${ Tree.map(commands.ori, (commandHelp, commandSlash) =>
  Tree.indent`
    * [${ commandHelp.namespace }.${ Origami.slash.remove(commandSlash) }](${ commandHelp.url }) ${ commandHelp.description }
  `
 ) }

## Sample Origami site repositories

Look at the `src` folders, particularly the top-level site definitions, which are usually found in `src/site.ori`.

${ Tree.map(examples.yaml, (example) =>
  example.repo
    ? Tree.indent`
      * [${ example.name}](${ example.repo }) - ${ example.description.replaceAll("\n", " ") }
`
: ""
)}
