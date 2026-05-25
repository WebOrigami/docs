---
title: shuffle(map, [options])
supertitle: "Tree."
---

Reads the keys of a [map-like](/async-tree/maplike.html) object and returns a new map with the original keys randomly shuffled.

```console
$ ori greetings.yaml
${ samples/cli/greetings.yaml }
$ ori Tree.shuffle greetings.yaml
${ Origami.yaml(
  Tree.shuffle(samples/cli/greetings.yaml, { randoms: Origami.randomsFrom("hello") })
) }
$ ori Tree.shuffle greetings.yaml
${ Origami.yaml(
  Tree.shuffle(samples/cli/greetings.yaml, { randoms: Origami.randomsFrom("goodbye") })
) }
```

## Producing a random but stable shuffle

You can call `Tree.shuffle` with an optional `options` argument that has a `randoms` property. This property should be a function that returns either:

- Floating-point numbers between 0 and 1 (like [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) does)
- Integers (like [`Origami.randomsFrom`](/builtins/origami/randomsfrom.html) does)

As discussed in [`Origami.randomFrom`](/builtins/origami/randomFrom.html), it can be desirable to incorporate some randomness into your site's output for variety, while doing so in a way that's always the same for a given state of your site.

You can apply this idea to a shuffle by telling `Tree.shuffle` to use the sequence of random numbers produced by `Origami.randomsFrom`. As long as the input data to `randomsFrom` in consistent, the shuffled output will be stable.

```console
$ ori Tree.shuffle greetings.yaml, { randoms: Origami.randomsFrom/hello }
${ Origami.yaml(
  Tree.shuffle(samples/cli/greetings.yaml, { randoms: Origami.randomsFrom("hello") })
) }
$ ori Tree.shuffle greetings.yaml, { randoms: Origami.randomsFrom/hello }
${ Origami.yaml(
  Tree.shuffle(samples/cli/greetings.yaml, { randoms: Origami.randomsFrom("hello") })
) }
```
