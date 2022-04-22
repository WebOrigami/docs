import { ExplorableGraph } from "@explorablegraph/explorable";

export default function mock(...keys) {
  // const scope = this;
  // return {
  //   async *[Symbol.asyncIterator]() {
  //     yield* scope;
  //   },

  //   async get(key) {
  //     return scope[key];
  //   },
  // };
  return ExplorableGraph.traverse(this, ...keys);
}
