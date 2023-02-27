import { ExplorableGraph } from "@graphorigami/origami";

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
  const graph = ExplorableGraph.from(variant);
  return {
    async *[Symbol.asyncIterator]() {
      for await (const key of graph) {
        yield key;
        if (key === ".keys.json") {
          // Also yield "keys.json" for Netlify.
          yield "keys.json";
        }
      }
    },

    async get(key) {
      if (key === "keys.json") {
        // keys.json is a synonym for .keys.json
        return await this.get(".keys.json");
      }
      const value = await graph.get(key);
      return ExplorableGraph.isExplorable(value) ? netlify(value) : value;
    },
  };
}
