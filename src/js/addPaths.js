import {
  ExplorableGraph,
  extractFrontMatter,
  transformObject,
} from "@explorablegraph/explorable";
import YAML from "yaml";

export default function addPaths(variant) {
  const graph = ExplorableGraph.from(variant);
  const withPaths = transformObject(AddPathsTransform, graph);
  return withPaths;
}

export function AddPathsTransform(Base) {
  return class AddPaths extends Base {
    constructor(...args) {
      super(...args);
      this._path = "/";
    }

    async *[Symbol.asyncIterator]() {
      const keys = new Set();
      for await (const key of super[Symbol.asyncIterator]()) {
        keys.add(key);
        yield key;
      }
      if (!keys.has("path")) {
        yield "path";
      }
    }

    async get(key) {
      let value = await super.get(key);
      if (value === undefined && key === "path") {
        value = this._path;
      } else if (typeof value === "string" || value instanceof Buffer) {
        value = extendFrontMatter(value, this._path, key);
      } else if (typeof value === "object") {
        // If the value is an object, extend the object with the path.
        value._path = extendPath(this._path, key);
      }
      return value;
    }
  };
}

// If the value is text that contains front matter, extend the front matter data
// with the path.
function extendFrontMatter(value, pathBase, key) {
  const text = value.toString();
  const frontMatter =
    typeof text === "string" ? extractFrontMatter(text) : null;
  if (frontMatter) {
    const { bodyText, frontData } = frontMatter;
    frontData._path = extendPath(pathBase, key);
    // Hacky guess as to whether original data was JSON or YAML
    const isJson = text[4] === "{";
    const serialized = isJson
      ? JSON.stringify(frontData, null, 2) + "\n"
      : YAML.stringify(frontData);
    value = `---\n${serialized}---\n${bodyText}`;
  }
  return value;
}

function extendPath(pathBase, key) {
  let path = pathBase;
  if (!path.endsWith("/")) {
    path += "/";
  }
  return `${path}${key}`;
}
