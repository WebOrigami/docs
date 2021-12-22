import { ExplorableGraph, transformObject } from "@explorablegraph/explorable";
import YAML from "yaml";

const explicitKeysKey = "keys.yaml";

export default function explicitKeys(variant) {
  const graph = ExplorableGraph.from(variant);
  const result = transformObject(ExplicitKeysTransform, graph);
  return result;
}

function ExplicitKeysTransform(Base) {
  return class ExplicitKeys extends Base {
    async *[Symbol.asyncIterator]() {
      if (this.explicitKeys === undefined) {
        // See if we have explicit keys. REVIEW: We call super.get instead of
        // this.get here. Otherwise, we can end up in a loop: some transform may
        // want to get the keys, which will cause ExplicitKeysTransform to look
        // for an explicit keys file, which could cause another transform to look
        // for a file and (if it doesn't find one), look through its keys for a
        // wildcard -- resulting in a loop.
        const value = await super.get(explicitKeysKey);

        if (value === undefined) {
          // No explicit keys
          this.explicitKeys = [];
        } else {
          // Explicit keys.
          // const graph = ExplorableGraph.from(value);
          // this.explicitKeys = await ExplorableGraph.plain(graph);
          this.explicitKeys = YAML.parse(String(value));
        }
      }

      if (this.explicitKeys) {
        yield* this.explicitKeys;
      } else {
        yield* super[Symbol.asyncIterator]();
      }

      // // Yield the virtual keys, keeping track of what they are.
      // const set = new Set();
      // for (const key of this.explicitKeys) {
      //   set.add(key);
      //   yield key;
      // }

      // // Yield any additional keys in the graph, skipping keys that appeared in
      // // the virtual keys.
      // for await (const key of super[Symbol.asyncIterator]()) {
      //   if (!set.has(key)) {
      //     yield key;
      //   }
      // }
    }
  };
}
