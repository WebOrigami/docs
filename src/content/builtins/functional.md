---
title: Functional forms
---

| Standard form                 | &nbsp; | Functional form          |
| ----------------------------- | ------ | ------------------------ |
| @image/format(image, format)  |        | @image/formatFn(format)  |
| @image/resize(image, options) |        | @image/resizeFn(options) |
| @group(treelike, fn)          |        | @groupFn(fn)             |
| @regexParse(text, regex)      |        | @regexParseFn(regex)     |
| @map(treelike, options)       |        | @mapFn(options)          |
| @deepMap(treelike, options)   |        | @deepMapFn(options)      |
| @paginate(treelike, count)    |        | @paginateFn(count)       |
| @sort(treelike, options)      |        | @sortFn(options)         |
| @take(treelike, count)        |        | @takeFn(count)           |
| @deepTake(treelike, count)    |        | @deepTakeFn(count)       |
