---
title: ExplorableSiteTree class
subtitle: A site that exposes its keys so it can be traversed
---

## JSON Keys protocol support

If you use `ExplorableSiteTree` to wrap a site that supports the [JSON Keys protocol](jsonKeys.html), the `ExplorableSiteTree` instance will be able to programmatically return the keys at a given route. See that protocol for more details.

For example, you can use the ori [CLI](/cli) to display the keys of a given site route using the custom `explore:` protocol, which returns an `ExplorableSiteTree`.

```console
$ ori keys explore://weborigami.org/samples/greetings/
- Alice
- Bob
- Carol
```

You can also use ori to display the complete contents of all pages at a given route:

```console
$ ori explore://weborigami.org/samples/greetings/
Alice: Hello, Alice.
Bob: Hello, Bob.
Carol: Hello, Carol.
```

Above, the custom `explore:` protocol retrieves the route's keys defined in the `.keys.json`, then makes separate requests for each of those pages.

## API

${ src/templates/class.ori(api/drivers/ExplorableSiteMap.yaml/exports/0) }
