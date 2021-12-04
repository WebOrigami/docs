# `this` in formulas

In an explorable application, an eg formula is defined in the _key_ in a [metagraph](metagraph.html). For example, the formula might be used in the name of a file inside a folder that will be interpreted as a metagraph.

Such formula keys may be defined with no value. That is, a file may have a formula for its file name, but the file itself may be empty.

In many cases, it can be useful to store additional data the formula can use as the _value_ associated with the key. Using a spreadsheet as an analogy, a spreadsheet cell may have a comment attached to itself. For convenience, the cell's formula may wish to retrieve data from that attached comment.

A formula can retrieve data with its own key using the reserved word `this`. The value of `this` will be _value_ associated with the formula key.

## Example: An HTML formula with separate template and data

Let's first look at an example of a formula that references inputs from other graph items. This graph defines a Handlebars `.hbs` template and some `.yaml` data. It also includes a formula key that will use those two items to construct an HTML page called `index.html`.

```yaml
fixture:
  index.html = hbs(index.hbs, index.yaml): ""
  index.hbs: Hello, {{name}}.
  index.yaml:
    name: Alice
```

Note that the _value_ associated with the `index.html` formula key is the empty string `""`. If this were a file, it would be empty.

```yaml
description: |
  The formula for `index.html` references the separate template and data values as input, and combines those to create the final HTML.
actual = fixture/index.html: ""
expected: Hello, Alice.
```

## Example: An HTML formula that references `this` for its template

Since the Handlebars template above is so trivial, we can essentially inline it: we define it as the value behind the formula key (instead of the empty string shown above). If this were a file, we would put the template in the file.

```yaml
fixture:
  index.html = hbs(this, index.yaml): Hello, {{name}}.
  index.yaml:
    name: Alice
```

```yaml
description: |
  The formula for `index.html` references the separate `.hbs` Handlebars template, but here the data will come from the value stored behind that formula.
actual = fixture/index.html: ""
expected: Hello, Alice.
```

## Example: Using a file extension with `this`

One advantage of the original example is that it defined the template in a file called `index.hbs`. The `.hbs` file extension is a hint to tools that the content of the file is a Handlebars template. Among other things, tools like code editors use that hint to apply syntax highlighting appropriate for a Handlebars template.

To preserve that useful feature, we can add a `.hbs` file extension at the end of our formula key.

```yaml
fixture:
  index.html = hbs(this, index.yaml).hbs: Hello, {{name}}.
  index.yaml:
    name: Alice
```

The `.hbs` file extension serves as a hint to tools — and ourselves — that the content of that file is a Handlebars template.

```yaml
description: |
  The file extension will be ignored for purposes of evaluating the formula, so this produces the same result as before:
actual = fixture/index.html: ""
expected: Hello, Alice.
```
