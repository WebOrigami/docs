---
title: Object graphs
numberHeadings: true
intro = client/samples/patternIntro:
---

If an in-memory JavaScript object might be the simplest and fastest way to define a graph of markdown content, let's start with this code:

```{{'js'}}
{{ intro/data/data.js }}
```

As noted earlier, you can consider this as a simple graph:

<figure>
  {{ svg intro/data/folder }}
  <figcaption>The markdown documents as a graph</figcaption>
</figure>

## The Explorable interface

Let's identify a minimal interface sufficient to define a wide variety of graphs, which we'll call the Explorable interface. In a moment, you'll apply that interface to the above object.

The Explorable interface has two parts:

- A method which produces the keys of the graph. In the graph above, the keys are `Alice.md`, `Bob.md`, and `Carol.md`. The keys will often be strings, but don't have to be strings.
- A method which gets the value for a given key. If we ask the above graph for `Alice.md`, we want to get back `Hello, **Alice**.` Here the value we get is text, but like the keys, the values can be of any data type.

Importantly, we want our graph abstraction to allow both these parts to be _asynchronous_. The in-memory object we're working with at this point allows synchronous access to both, but many representations we might pick will require (or work better with) asynchronous access.

We can declare our interface members to be `async`. Using `async` members will work for synchronous data representations too, albeit at a slight performance cost. The expectation is that defining a more universal `async` form will pay more dividends than designing a graph interface that only works with synchronous APIs.

With that, our Explorable interface can look like this:

```js
// An explorable graph
const graph = {
  // Iterate over this graph node's keys.
  async *[Symbol.asyncIterator]() { ... }

  // Get the value of a given key.
  async get(key) { ... }
}
```

Some notes:

- The [Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) reference is what is called a "well-known symbol" in JavaScript: a symbol that has special meaning to the JavaScript engine. In this case, the symbol lets you easily iterate over a graph node's set of keys asynchronously using a [for await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) loop.

- The asterisk (`*`) before the `Symbol.asyncIterator` indicates that the function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator): a function that can be repeatedly invoked to return the next result in a sequence. The sequence can be potentially infinite in length.

- All of the functions in the `Explorable` interface are marked with the [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) keyword, indicating that they are asynchronous functions. In practice, the functions may return immediately, but they have the potential, at least, to do work that will require a bit of time: retrieving data from the file system, accessing data from a network, or performing long calculations.

- An Explorable graph's `get` method is expected to return `undefined` if the key is not present in the graph.

- The `asyncIterator` does _not_ have to return all supported keys! There may be keys that `get` can handle that the `asyncIterator` will not include. This is actually a useful property in a number of situations.

## Apply the Explorable interface to the object

<span class="tutorialStep"></span> Wrap the in-memory object with the Explorable interface:

```{{'js'}}
{{ intro/round2complete/object.js }}
```

## Display the graph in the console

```{{'js'}}
{{ intro/round1/display.js }}
```

```{'yaml'}
{{ intro/data/data.yaml }}
```

&nbsp;

Next: [Transform the graph](intro4.html) »
