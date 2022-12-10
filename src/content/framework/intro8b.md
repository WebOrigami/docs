---
title: Transform images with a map
step1:
  images = framework-intro/src/static/images:
  index.html = framework-intro/assets/index.ori():
  personIcon.svg = framework-intro/src/static/personIcon.svg:
  styles.css = framework-intro/src/static/styles.css:
  thumbnails = images:
---

The graph transformations we've looked so far have dealt with graphs of text, but graphs can contain values of any type.

Your site needs a `thumbnails` folder that contains all the same pictures in the `images` folder, but with each picture scaled to a smaller size. You can fulfill this requirement by creating a virtual `thumbnails` folder with a map.

<span class="tutorialStep"></span> Add a new `thumbnails` formula to `+.yaml`:

```yaml
# Site title (hidden)
(title): Our Amazing Team

# Index page obtained by invoking the index.ori template
index.html = index.ori():

# Thumbnails for all the images, at 200 pixels width
thumbnails = map(images, =image/resize(@value, width=200)):
```

The `thumbnails` formula is long, so let's break it down.

- The formula's reference to `images` will find the `images` folder in scope.
- For each image in the `images` folder, the `map()` invokes the built-in `image/resize` function.
- Behind the scenes, the `map()` function extends the scope with a `@value` entry that provides access to the value being mapped — in this case, a file buffer containing the original image data.
- The extended scope will be passed to `image/resize`, along with an instruction to resize the image value to 200 pixels in width. The result will be a new file buffer containing the resized image.

<span class="tutorialStep"></span> Navigate to `.svg` to see the current state of the site as a graph. In addition to the real `images` folder, you can now see a virtual `thumbnails` folder. In that browser preview, click the little dot representing that virtual folder to browse into it.

<figure>
{{ svg step1 }}
</figure>

You will see a listing of virtual image files in the `thumbnails` folder. _Those images do not exist._ Or rather they don't exist in persistent form; they are only created when you ask for them. They are potential images.

<span class="tutorialStep"></span> Open one of the virtual thumbnail images to see one of the original images at a smaller size.

As mentioned earlier, explorable graphs are lazy. When you wrote the formula to define a virtual `thumbnails` folder, no real work happened. When someone asks the server for a thumbnail like `/thumbnails/image1.jpg`, however, things kick into action:

1. The server asks the `src/public` folder for the `thumbnails` subfolder.
1. The `public` folder graph sees that it doesn't have a real subfolder called `thumbnails`, but _does_ have a formula for `thumbnails`, so it evaluates that formula.
1. The formula for `thumbnails` invokes the `map()` function, which doesn't do any real work yet, but returns an explorable graph representing a virtual folder of potential, not-yet-created thumbnails.
1. This virtual `thumbnails` folder is handed back to the server so that it can traverse further into the graph.
1. The server asks the virtual `thumbnails` graph for `image1.jpg`.
1. The virtual `thumbnails` graph created by `map()` asks the real `images` folder for the real, full-size `image1.jpg` data.
1. The virtual `thumbnails` graph takes the image data it receives and invokes the expression `=image/resize(@value, width=200)`.
1. The built-in `image/resize` function consumes the original, full-size image and returns the data for a smaller thumbnail image.
1. The server responds to the browser with the thumbnail image, which you see in your browser.

<span class="tutorialStep"></span> Navigate to `index.html`, now complete with thumbnail images.

Note: on "retina" displays with high pixel densities, the thumbnails will look blurry. You can double the resolution of the thumbnails by doubling the thumbnail width to `width=400`. It's beyond the scope of this tutorial, but you could use the techniques described here to create [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), with multiple formulas formatting or scaling images to target displays with specific pixel densities.

&nbsp;

Next: [Map data to full HTML pages](intro8c.html) »
