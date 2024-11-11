## Use a tree as a map

Above it was noted that the second argument passed to `map` can actually be any tree, not just a mapping function. This lets you use data to transform other data.

Suppose that you have base data, like an array of people:

```console
$ ori people.yaml
- Alice
- Carol
```

And some other data that associates a person's name with a greeting:

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

<span class="tutorialStep"></span> You can then treat both the base data and the greetings data as trees, and pass those to `map`, to turn the list of specific people into a list of greetings:

```console
$ ori map people.yaml, greetings.yaml
- Hello, Alice.
- Hello, Carol.
```

<div class="sideBySide">
  <figure>
    ${ svg.js samples.ori/cli/people.yaml }
  </figure>
  <figure>
    ${ svg.js samples.ori/cli/greetings.yaml }
  </figure>
  <figure>
    ${ svg.js map(samples.ori/cli/people.yaml, samples.ori/cli/greetings.yaml) }
  </figure>
  <figcaption>List of people</figcaption>
  <figcaption>Greetings for everyone</figcaption>
  <figcaption>Map to create list of greetings</figcaption>
</div>

Here the second `greetings.yaml` tree is used as a function to transform the specific names coming from `people.yaml` into greetings.
