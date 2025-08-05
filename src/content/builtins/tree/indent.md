---
title: indent(strings, ...values)
supertitle: "Tree."
---

The `indent` function normalizes indentation in template output.

It's helpful to indent text in HTML and other formats so can more easily perceive their structure. When using a template to generate such text, you may want to indent HTML inside Origami code or vice versa. Origami's goal is that both the template and its output can be indented for high legibility.

You can tag a backtick-delimited template with this builtin -- put `inline` immediately before the first backtick -- to normalize the indentation in a template's output.

It is unlikely you will want to call this function directly. (The function's call signature directly matches that of a JavaScript [tagged template functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)).

## Default template whitespace behavior

To look at an example, let's imagine a small set of text files that each a bit of multi-line text:

```
${ samples.jse/help/pond.txt }
```

You want to format each file as a set of pre-formatted quotes. You write some interwoven Origami and HTML, using newlines and indentation to clarify the nesting:

```ori
// quote.ori

${ samples.jse/help/quote.jse }
```

This indentation lets you see that the outer code is Origami with nested layers inside it: an HTML `<section>`, a nested Origami `map` inside that, and finally Origami to inline the text file's contents.

By default Origami includes all template whitespace as is, so the above outputs:

```${"html"}
${ samples.jse/help/quote.jse/ }
```

The above is syntactically valid HTML but includes some undesired newlines, more indentation than is wanted, and some lines of text are _not_ indented when we want them to be.

It can be difficult to scan such output and confirm that it's correct. The formatting in this example also has a bad side-effect: the `<pre>` [pre-formatted text element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) carefully preserves the unintended whitespace, displaying a visually cluttered result to the end user:

```
        An ancient pond
A frog jumps in
The splash of water


        Ah, tranquility!
Penetrating the very rock,
A cicada’s voice.


```

## Normalizing indentation

If you prefer to adjust the whitespace included in a template to improve legibility, you can invoke the `indent` builtin immediately before the outer and inner templates:

```ori
${ samples.jse/help/quoteIndent.jse }
```

Note that `indent` appears immediately before the opening backticks: although this is calling a function, there are no parentheses like in a typical function call.

The output of this is:

```${"html"}
${ samples.jse/help/quoteIndent.jse/ }
```

This is both easier to read and more correct in its end-user visible result:

```
    An ancient pond
    A frog jumps in
    The splash of water

    Ah, tranquility!
    Penetrating the very rock,
    A cicada’s voice.

```

## How normalizing indentation works

Let's step through how `indent` processes templates. To focus on the HTML output we'll look at just the templates and drop the spaces in the Origami code. To make the remaining whitespace visible, we'll use · dot characters for spaces and ↵ characters for newlines:

```
Tree.indent`↵
··<section>↵
····\${·Tree.map(files,(file)=>Tree.indent`↵
······<pre>↵
········\${file}↵
······</pre>↵
····`)·}↵
··</section>↵
`
```

The `indent` calls proceed as follows:

**Step 1:** Remove the leading newline from the outer and inner templates:

```
Tree.indent`··<section>↵
····\${·Tree.map(files,(file)=>Tree.indent`······<pre>↵
········\${file}↵
······</pre>↵
····`)·}↵
··</section>↵
`
```

**Step 2:** Identify the _base indentation_ for each template by looking at the whitespace at the start of the first line. In this example, the first line of the outer template is `··<section>↵` which starts with two spaces, so the base indentation for this template will be two spaces.

**Step 3:** Remove the base indentation from all lines of the template. Here this shifts the entire block of text in the outer template left by two spaces. The inner `<pre>` template now has a base indentation of four spaces, so those lines will be shifted left by a total of four spaces.

```
Tree.indent`<section>↵
··\${·Tree.map(files,(file)=>Tree.indent`··<pre>↵
····\${file}↵
··</pre>↵
··`)·}↵
</section>↵
`
```

**Step 4:** Identify any _block placeholders_, where the opening `\${` is the first substantive text on its line and the closing `}` is the last substantive text on its line. This example contains two block placeholders: one for `map` and another for `file`.

**Step 5:** For each block placeholder, identify the _block indentation_: the whitespace at the start of the first line inside the template. At this point, the `map` block has an indentation of 2 spaces, and the `<pre>` block has an indentation of 4 spaces.

**Step 5:** Now that the desired block indentation is known, remove it from each line inside the block placeholder. Also remove the whitespace before each block placeholder and the newline immediately following each block placeholder.

```
Tree.indent`<section>↵
\${Tree.map(files,(file)=>Tree.indent`<pre>↵
\${file}</pre>↵`)}</section>↵
`
```

At this point, all superfluous newlines and whitespace has been removed.

**Step 6:** Insert the values of all the substitutions (here, the contents of the text files). When inserting a value into a block placeholder, apply the desired block indentation to all individual lines in the substitution value. In this case, the outer `map` block inserts 2 spaces at the start of each line; the inner `file` block adds an additional 2 spaces at the start of each line.

The result is:

```
<section>↵
··<pre>↵
····An ancient pond↵
····A frog jumps in↵
····The splash of water↵
··</pre>↵
··<pre>↵
····Ah, tranquility!↵
····Penetrating the very rock,↵
····A cicada’s voice.↵
··</pre>↵
</section>↵
```

This produces the result shown earlier.

**Caution:** The lines inside these `<pre>` tags end up with leading spaces. Because `<pre>` elements preserve whitespace, the text is displayed with spaces on the left side. That's of no real consequence here, but in other cases like displaying blocks of code, whitespace can be significant. Take care when using `indent` in conjunction with the rare HTML elements that preserve whitespace (like `<pre>` or `<textarea>`) or CSS rules (like `white-space: pre;`) that work similarly.
