---
title: cache(tree, [cache])
supertitle: "Tree."
---

Caches values retrieved from a (presumably slow) [map-based](/async-tree/mapBasedTree.html) source tree, saving these in a second (presumably fast) tree.

If a `cache` tree is provided, the cached values will be stored in that tree; if no `cache` is provided, the values will be stored in an in-memory tree.

## Example: caching generated images

Suppose you have a set of documents or objects that are associated with a longitude and latitude, and you'd like each page to include a map image. For efficiency, you can use `Tree.cache` to generate these images and save them as local files.

For simplicity, let's use a small data set of cities:

```yaml
${ samples/help/maps/cities.yaml }
```

You might generate maps for these locations via an API like the [MapBox Static Images API](https://docs.mapbox.com/api/maps/static-images/), which can generate a map centered on a given location. You can wrap that API call in an Origami function `map.ori`:

```ori
// map.ori

${ samples/help/maps/map.ori }
```

And then you can use [`Tree.map`](map.html) to map the cities to map images:

```ori
// cityMaps.ori
${ samples/help/maps/cityMaps.ori }
```

This sample file can now supply `.png` images for each city:

```console
$ ori keys cityMaps.ori
${ Origami.yaml(Tree.keys(samples/help/maps/cityMaps.ori)) }
```

Since this city data probably doesn't change often, you don't want to call the API every time you build your site. Instead, it's better to cache the images and only make an API call when a new image is needed.

You can create a `cachedMaps.ori` file that calls `Tree.cache`:

```ori
// cachedMaps.ori
${ samples/help/maps/cachedMaps.ori }
```

This will fetch images on demand from the slow API-based `cityMaps.ori` tree, saving them in the fast file-based tree. In this case, the files will be saved in a folder called `mapImages`.

To retrieve all the maps at once, you can use the [`Tree.visit`](visit.html) builtin, which will get all the values (images) in this collection.

```
$ ori Tree.visit cachedMaps.ori
$ ls mapImages
bogotá.png      lima.png        sãoPaulo.png
```

Opening an image like `lima.png` shows the result:

<figure class="constrain">
  <img src="/samples/help/maps/mapImages/lima.png">
</figure>

To generate map images on demand, you could incorporate these map images into your site with a site definition like:

```ori
// site.ori
${ samples/help/maps/site.ori }
```

Now the Lima city map will be available at `/assets/maps/lima.png`. Your page template for a city can then reference the appropriate image. When you visit that page, the appropriate map image will be displayed: if a local copy of the map has already been cached, the image will appear immediately, otherwise the map will be generated via an API call and the image cached for future use.

If you later edit a city's location, delete the cached `.png` image for that city so that it will be regenerated the next time it's requested.
