export default function transform(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const markdownKey of graph) {
        const htmlKey = markdownKey.replace(/\.md$/, ".html");
        yield htmlKey;
      }
    },

    async get(key) {},
  };
}
