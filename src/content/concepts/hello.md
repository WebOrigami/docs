---
title: Hello, world
subtitle: Everything is trees, actually
---

If you're a designer or developer, a common task may be automating the conversion of piles of one kind of content (text, images, etc.) into new piles of other content. Those piles are often organized into hierarchical structures like file system folders. But it turns out to be surprisingly productive to work at a more abstract level and think of such structures as _trees_.

Here is a tree with just one branch:

<figure>
{{
  @svg {
    index.html: "Hello"
  }
}}
</figure>

The _root_ of this tree is the circle on the left. The branch has a label or name, which we'll call a _key_, and that leads to a node or _value_. In many cases the key is a text string like "index.html", but keys could be numbers or other things. The value here also happens to be a text string ("Hello"), but values can be anything: an image, a data file, etc.

Web Origami is a conceptual framework for transforming trees. Most of time you're making stuff from other stuff, you can think about the starting point as a tree -- and often the ending point is a tree as well. Most of them it won't matter exactly how or where the original content is stored. Often all that matters are those keys and values.

<figure>
{{
  @svg {
    name: "world"
  }
}}
</figure>

```
{
  name = "world"
  index.html = `Hello, \{\{ name }}!`
}
```

<figure>
{{
  @svg {
    name: "world"
    index.html: "Hello, world!"
  }
}}
</figure>

or just a little text file

```
world
```

```
{
  index.html = `Hello, \{\{ name }}!`
}
```

<figure>
{{
  @svg {
    name: "world"
    greeting.ori: "{ index.html = `Hello, \{\{ name }}!` }"
  }
}}
</figure>

<figure>
{{
  @svg {
    index.html: "Hello, world!"
  }
}}
</figure>

<figure>
{{
  @svg {
    name: "world"
    why: {
      index.html: "Hello, world!"
    }
  }
}}
</figure>

```json
{
  "name": "world"
}
```

```
{
  index.html = `Hello, \{\{ data.json/name }}!`
}
```

<figure>
{{
  @svg {
    images: {
      image1.jpg: "[full image]"
      image2.jpg: "[full image]"
      image3.jpg: "[full image]"
    }
  }
}}
</figure>

<figure>
{{
  @svg {
    images: {
      image1.jpg: "[full image]"
      image2.jpg: "[full image]"
      image3.jpg: "[full image]"
    }
    thumbnails: {
      image1.jpg: "[small image]"
      image2.jpg: "[small image]"
      image3.jpg: "[small image]"
    }
  }
}}
</figure>

```
{
  images
  thumbnails = @tree/map(images, @image/resize({ width: 200 }))
}
```

```js
import { map, Tree } from "@graphorigami/async-tree";
import sharp from "sharp";

export default async function () {
  const images = await this.get("images");
  const thumbnail = (image) => sharp(image).resize({ width: 200 }).toBuffer();
  return Tree.from({
    images,
    thumbnails: map(thumbnail)(images),
  });
}
```
