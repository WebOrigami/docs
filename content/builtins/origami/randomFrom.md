---
title: randomFrom(data)
supertitle: "Origami."
---

This returns a random number (technically, a pseudo-random number) based on the given data.

This number will be a 32-bit integer that will always be the same for a given input:

```console
$ ori "Origami.randomFrom('Hello')"
${ Origami.randomFrom("Hello") }

$ ori "Origami.randomFrom('Goodbye')"
${ Origami.randomFrom("Goodbye") }

$ ori "Origami.randomFrom('Hello')"
${ Origami.randomFrom("Hello") }

```

This function generates a single value. To generate a sequence of random numbers based on the input data, use [`Origami.randomsFrom`](randomsFrom.html).

## Incorporating random content into a site

You can liven up a site by introducing variety into content that might otherwise be uniform. You can introduce that variety by hand, or programmatically generate some variety with an expression that includes a random number. For example, this Web Origami documentation site includes a randomly-selected origami animal graphic on each page to add playfulness and visual interest.

At the same time, it's often useful for a build of a given state of a site to always produce exactly the same output. Among other things, this lets you use the [`Dev.changes`](/builtins/dev/changes.html) tool to detect whether anything unexpected has changed in a site. If you select something random uses a function like JavaScript's [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random), then each time you build your site, the site will be changing, even if the substantive part of the site is still the same.

The `randomFrom` builtin lets you introduce random values that will be the same for each build of the site. This is done by identifying some reference data that reflects the state of your site, then passing that to `randomFrom`.

For example, in a template that renders a blog post, you could use the post's `_body` property as the input:

```ori
Origami.randomFrom(post._body)
```

As long as the post body content stays the same, the returned random number will stay the same. You could then use this number to, for example, select one of a collection of images in an `images` folder:

```ori
Tree.keys(images)[Origami.randomFrom(post._body) % Tree.keys(images).length]
```

This calls `randomFrom` to get a random number from the post body, then uses the `%` [remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) to pick a number from 0 to the number of files minus 1. The file name with that number is then returned.
