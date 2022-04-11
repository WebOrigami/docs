---
names:
  - Alice
  - Bob
  - Carol
---

# Sample page

Here's a sample page with some code.

This shouldn't assert:

```console
$ ori blah blah blah
```

This should assert:

```console assert
$ ori names
- Alice
- Bob
- Carol
```

Here's some more text.

```console assert
$ ori keys names
- 0
- 1
- 2
```
