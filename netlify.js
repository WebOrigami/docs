import { AsyncMap, Tree } from "@weborigami/async-tree";

/**
 * Expose keys.json (no initial dot) for Netlify.
 *
 * Netlify won't deploy files that start with a dot like .keys.json. As a
 * workaround, we expose a `keys.json` key that contains the same content as
 * .keys.json. A separate rewrite rule in the _redirects file will redirect
 * requests for .keys.json (which won't be available) to keys.json (which will
 * be available).
 */
export default async function netlify(treelike) {
  const source = Tree.from(treelike);
  return Object.assign(new AsyncMap(), {
    async get(key) {
      if (key === "keys.json") {
        // keys.json is a synonym for .keys.json
        key = ".keys.json";
      }
      const value = await source.get(key);
      return Tree.isMap(value) ? netlify(value) : value;
    },

    async *keys() {
      for await (const key of source.keys()) {
        yield key;
        if (key === ".keys.json") {
          // Also include "keys.json" for Netlify.
          yield "keys.json";
        }
      }
    },
  });
}
