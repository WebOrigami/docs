---
title: "@concat(...objs)"
---

Converts the indicated objects to strings, then returns the concatenated strings.

- If an object is a function, it is invoked, then these rules are applied to the result.
- If an object is a tree, this concatenates the deep values in the tree.
- If an object can be converted to a string, it is. Otherwise, the empty string is used.

To concatenate two strings:

```console
$ ori "@concat 'foo', 'bar'"
foobar
```

To concatenate the values in a tree:

```console
$ cat greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori @concat greetings.yaml
Hello, Alice.Hello, Bob.Hello, Carol.
```
