---
title: "@regexMatch(text, regex)<br>@regexMatchFn(regex)"
---

Matches the given text against a regular expression containing [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group). If the expression matches, this returns the capturing groups; otherwise this returns undefined.

Example: the following Origami program uses `@regexMatch` to identify parts of a date at the beginning of a string, perhaps a blog post file name.

```ori
// parseDate.ori
${ samples.ori/help/parseDate.ori }
```

When applied to a file name that contains a date:

```console
$ ori parseDate.ori "'2026-01-01 Happy New Year.md'"
${ samples.ori/help/parseDate.ori "2026-01-01 Happy New Year.md" }
```

(This creates a date in U.S. Eastern time, although the date is displayed above in the time zone of the machine used to build this site. The date and time are still correct for Eastern time.)
