---
title: Display a map
---

Now that we've applied the `Map` interface to an object, let's write a simple tool that will display the contents of that `Map` in the console.

To stay as close to the platform as possible, we'll render the map in JSON format. JSON isn't particularly friendly to write or read, but it's built into the platform and supports hierarchical structures.

## Convert a `Map` to a plain object

Our first job is to convert the `Map` to a plain object so that we can pass it to the standard [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify):

```${'js'}
${ src/js/codeFunctions.js(pattern/map/json.js).plain }
```

It may feel counter-productive to do work to wrap an object with a `Map` — and then immediately convert it back to an object!

But we'll soon be working with other kinds of maps, so it's worth tackling the general case now. We've still made an important step to separate the underlying representation of some hierarchical data with a tool to display such data.

## Dynamically import a JavaScript module

We could write a tool to statically import a specific map we want to display, but our goal is a utility that can quickly display any map. So let's have the tool parse a command line argument specifying the file name of a JavaScript module that exports a map.

```${'js'}
/* src/map/json.js */

${ src/js/codeFunctions.js(pattern/map/json.js)["@prologue"] }

async function plain(map) { /* See above */ }

${ src/js/codeFunctions.js(pattern/map/json.js)["@epilogue"] }
```

The tool dynamically imports the indicated JavaScript file and gets its default export, which is expected to be a map. We then use the `plain` function above to convert the map to an object, then render the JSON for that object to the console.

## Display the map in the console

<span class="tutorialStep"></span> Use this `json` utility from inside the `src/map` directory to display the `object.js` map we created in the previous step.

```console
$ node json object.js
${ Tree.json(pattern/map/object.js/) + "\n" }
```

&nbsp;

Next: [Transform a map](transform.html) »
