---
title: rss(feed, [options])
supertitle: "Origami."
---

Converts a tree of posts in [JSON Feed](https://www.jsonfeed.org/) format to [RSS](https://www.rssboard.org/rss-specification) format. The `feed` can be any [map-like object](/async-tree/maplike.html).

This transformation is performed by the small [json-feed-to-rss](https://github.com/WebOrigami/json-feed-to-rss) library. JavaScript programmers can use that library to apply the transformation in regular JavaScript projects.

Include the core post data in the `feed` argument. Use the `options` argument to specify additional options beyond what's supported in JSON Feed:

- `feed_url`: the public URL where the RSS feed lives
- `language`: a [language tag](https://en.wikipedia.org/wiki/IETF_language_tag) identifying the language of the feed content
