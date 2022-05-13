---
title: this keyword
---

The Origami framework lets you put Origami formulas in the _key_ of a [metagraph](metagraph.html). For example, the formula might be used in the name of a file, or the key of a YAML or JSON file.

Such formula keys are often defined with no corresponding value. For example, a file may have a formula for its file name, but the file itself may be empty.

In many cases, it can be useful to store additional data the formula can use as the _value_ associated with the key. A formula can do this via the `this` keyword, which returns the value associated with the formula's key.

```yaml
message = this: Hello
```

When this formula is evaluated, the `this` reference will return the value "Hello".

```console
$ ori virtual/thisExample.yaml/message
Hello
```

The `this` keyword can appear anywhere a reference can appear, so it can be used as the argument to a function.

```yaml
index.html = mdHtml(this): |
  This is *emphasized*.
```

In the formula above, `this` evaluates to the markdown text "# Heading", which is then passed to [mdHtml](/language/builtins.html#mdHtml) to turn it into HTML.

```console
$ ori virtual/thisHtml.yaml/index.html
This is <strong>emphasized</strong>.
```

## Example: An HTML formula that references `this` for its template

Let's first look at an example of a formula that references inputs from other graph items. This graph defines an Origami [template](templates.html) and some data in YAML form.

```yaml
index.html = index.ori(index.yaml): ""
index.ori: Hello, \{{name}}.
index.yaml:
  name: Alice
```

The virtual `index.html` formula applies the template to the data.

```console
$ ori virtual/index.html
Hello, Alice.
```

Note that the value associated with the `index.html` formula key is the empty string `""`. If this were a file, it would be empty.

Since the template above is so trivial, we can inline it: define it as the value behind the formula key. If this were a file, we would put the template in the file with the formula name.

```yaml
index.html = this(index.yaml).ori: Hello, \{{name}}.
index.yaml:
  name: Alice
```

The value of the virtual `index.html` remains the same:

```console
$ ori virtual/index.html
Hello, Alice.
```

One advantage of the original example is that it defined the template in a file called `index.ori`. The `.ori` file extension is a hint to tools (and us) that the content of the file is an Origami template.

To preserve that useful feature, we can add a `.ori` file extension at the end of our formula key. The file extension is ignored when evaluating that formula; it is purely there to help identify the type of data in the value.
