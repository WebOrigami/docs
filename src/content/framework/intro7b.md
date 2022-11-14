---
title: Map images
step1 = merge(framework-intro/src/public, this):
  title: Our Amazing Team
  index.html = framework-intro/assets/index.ori():
  thumbnails = map(framework-intro/src/public/photos, =image/resize(@value, width=200)):
---

## Transform a graph of images

Until now, the graph transformations we've looked at deal with graphs of text, but graphs can contain values of any type. We want to have a `thumbnails` folder that's based on the `photos` folder, but scales the images to a smaller size.

<span class="tutorialStep"></span> Add a new formula to `+stuff.yaml`:

```yaml
title: Our Amazing Team
index.html = index.ori():
thumbnails = map(photos, =image/resize(@value, width=200)):
```

This formula transforms the `photos` graph. For each image in that folder, the formula invokes the built-in `image/resize` function. The `map()` function extends the scope with a `@value` entry that provides access to the value being mapped — that is, the original image data. This will be passed to `image/resize`, along with an instruction to resize the image value to 200 pixels in width.

<span class="tutorialStep"></span> Navigate to `/public/.svg` to see the current state of the site as a graph. In addition to the real `photos` folder, you can now see a virtual `thumbnails` folder. Click the little dot representing that virtual folder to browse into it.

<figure>
{{ svg step1 }}
</figure>

You will see a listing of the virtual image files in the `thumbnails` folder. _These images do not exist._ Or, rather, they don't exist in any persistent form; they are created on demand when you ask for them.

<span class="tutorialStep"></span> Open one of the virtual thumbnail images to see one of the original images at a smaller size.

As mentioned earlier, explorable graphs are lazy. When you write a formula to define a virtual `thumbnails` folder, no real work happens. It's only when someone asks the server for a thumbnail like `/public/thumbnails/image1.jpg` that things happen:

1. The server asks the `public` folder for the `thumbnails` subfolder.
1. The formula for `thumbnails` invokes the `map()` function, which doesn't do any real work yet, but returns an explorable graph representing a virtual folder of potential, not-yet-created thumbnails.
1. The server asks the virtual `thumbnails` folder for `image1.jpg`.
1. The `map()` function asks the real `photos` folder for the real `image1.jpg` data.
1. The `map()` function takes the image data it receives and invokes the expression `=image/resize(@value, width=200)`.
1. The built-in `image/resize` function consumes the original image and returns the data for a thumbnail image.
1. The server responds to the browser with the thumbnail image, which you see in your browser.

<span class="tutorialStep"></span> Navigate to the `public` folder to see the team index page, now complete with thumbnail images.

&nbsp;

Next: [Map data to full HTML pages](intro7c.html) »
