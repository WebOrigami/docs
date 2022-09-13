import { marked } from "marked";

export default function transform(graph) {
  return {
    async *[Symbol.asyncIterator]() {
      for await (const markdownKey of graph) {
        const htmlKey = markdownKey.replace(/\.md$/, ".html");
        yield htmlKey;
      }
    },

    async get(htmlKey) {
      const markdownKey = htmlKey.replace(/\.html$/, ".md");
      const markdown = await graph.get(markdownKey);
      if (markdown) {
        return marked(markdown.toString());
      }
    },
  };
}
