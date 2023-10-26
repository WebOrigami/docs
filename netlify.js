import { Tree } from "@graphorigami/origami";

/**
 * Expose keys.json (no initial dot) for Netlify.
 *
 * Netlify won't deploy files that start with a dot like .keys.json. As a
 * workaround, we expose a `keys.json` key that contains the same content as
 * .keys.json. A separate rewrite rule in the _redirects file will redirect
 * requests for .keys.json (which won't be available) to keys.json (which will
 * be available).
 */
export default async function netlify(variant) {
  const graph = Tree.from(variant);
  return {
    async get(key) {
      if (key === "keys.json") {
        // keys.json is a synonym for .keys.json
        return await this.get(".keys.json");
      }
      const value = await graph.get(key);
      return Tree.isAsyncTree(value) ? netlify(value) : value;
    },

    async keys() {
      const keys = Array.from(await graph.keys());
      if (keys.includes(".keys.json")) {
        // Also include "keys.json" for Netlify.
        keys.push("keys.json");
      }
      return keys;
    },
  };
}
