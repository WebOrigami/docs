---
hello = ..%samples%egret.yaml%hello:
frontMatter: |
  title: test3.md
hyphens: ---
---

{{{frontMatter}}}

Here is some **text**.

```js
{{{hello.[greet.js]}}}
```

```yaml
{{{hello.[team.yaml]}}}
```
