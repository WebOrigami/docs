---
title: "image"
supertitle: "Origami."
---

A collection of functions for working with images. Internally, these make use of the [sharp](https://sharp.pixelplumbing.com/) image library.

## Origami.image.format(buffer, format, [options])

Returns the image represented by `buffer` in a new image format. The `format` must be one of the following strings:

- `avif`
- `gif`
- `heif`
- `jp2`
- `jpeg`
- `jxl`
- `png`
- `raw`
- `tiff`
- `tile`
- `webp`

The [options](https://sharp.pixelplumbing.com/api-output#toformat) dictionary is passed to sharp's `toFormat()` function.

## Origami.image.resize(buffer, options)

Returns a new image, resizing the image represented by `buffer`. The [options](https://sharp.pixelplumbing.com/api-resize) should include a `height` and/or `width` property.
