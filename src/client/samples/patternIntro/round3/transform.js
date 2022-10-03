import { MapExtensionsGraph } from "@graphorigami/origami";
import { marked } from "marked";

export default function transformMarkdownToHtml(graph) {
  return new MapExtensionsGraph(graph, (input) => marked(String(input)), {
    innerExtension: ".md",
    outerExtension: ".html",
  });
}