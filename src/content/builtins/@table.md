---
title: "@table(treelike)"
---

Returns a basic tabular representation of the keys and values in the indicated `tree`.

If the tree is flat — that is, has only a single level of keys and values — the table will have two columns listing those.

```console
$ ori greetings.yaml
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
$ ori table greetings.yaml
Key     Value
Alice   Hello, Alice.
Bob     Hello, Bob.
Carol   Hello, Carol.
```

If the tree has two levels, the row headings will contain the top-level keys, and the column headings will be the second-level keys. (The first subtree in the tree will be taken as representative of the remaining subtrees.)

```console
$ ori languages.json
{
  "english": {
    "a": "Hello, a.",
    "b": "Hello, b.",
    "c": "Hello, c."
  },
  "french": {
    "a": "Bonjour, a.",
    "b": "Bonjour, b.",
    "c": "Bonjour, c."
  },
  "spanish": {
    "a": "Hola, a.",
    "b": "Hola, b.",
    "c": "Hola, c."
  }
}
$ ori @table languages.json | column -t -s$'\\\t'
         a            b            c
english  Hello, a.    Hello, b.    Hello, c.
french   Bonjour, a.  Bonjour, b.  Bonjour, c.
spanish  Hola, a.     Hola, b.     Hola, c.
```

`table` separates columns with TAB characters. To ensure visual column alignment requires using other shell tools (such as [column](https://www.man7.org/linux/man-pages/man1/column.1.html), above).
