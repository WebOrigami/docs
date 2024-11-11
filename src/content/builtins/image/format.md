---
title: format(buffer, format, [options])
supertitle: "image:"
---

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
