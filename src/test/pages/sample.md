---
names:
  - Alice
  - Bob
  - Carol
folder:
  message: Hello
---

# Sample page

Here's a sample page with some code.

This shouldn't assert:

```console
$ ori blah blah blah
```

This should assert:

```console assert: true
$ ori names
- Alice
- Bob
- Carol
```

Here's some more text.

```console assert: true
$ ori @keys names
- "0"
- "1"
- "2"
```

Assertion with context

```console assert: true, path: folder
$ ori message
Hello
```
