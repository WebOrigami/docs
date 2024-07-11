## Formulas can reference real or virtual files

You can pass a real or virtual file to a function by name.

**Example:** The following defines a virtual file called `doubled`, whose content will be the `word` file content repeated twice.

```
word = "beep"
doubled = @repeat(2, word)
```

This calls a built-in [@repeat](/builtins/@repeat.html) function. (All built-in functions start with an `@` sign.) The value of `doubled` will be "beepbeep".

The order of the above definitions doesn't matter; `word` could just as well come after `doubled`.

<span class="tutorialStep"></span> **Try it:** In `site.ori`, define a new virtual file called `title` (no extension is required) to hold the title of your site (say, "Our Amazing Team").

<span class="tutorialStep"></span> Then update the formula for `index.html` to pass the `title` to `greet`.

<reveal-solution>

```ori
{
  public = {
    index.html = greet.js(title)
    title = "Our Amazing Team"
  }
}
```

</reveal-solution>

Since the order doesn't matter, you could also define `title` before `index.html`.

The preview now shows: Hello, **Our Amazing Team**!
