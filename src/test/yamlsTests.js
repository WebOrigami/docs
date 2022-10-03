import { ExplorableGraph } from "@graphorigami/origami";
import YAML from "yaml";

export default async function yamlsTests(variant) {
  const graph = ExplorableGraph.from(variant);

  let fixture = null;
  const tests = [];
  for await (const key of graph) {
    const value = await graph.get(key);
    const obj = YAML.parse(value);
    if (obj.fixture) {
      // Fixture
      fixture = obj.fixture;
      tests.push(null);
    } else if (obj.expected) {
      // Test
      const test = Object.assign(
        {
          fixture,
        },
        obj
      );
      tests.push(test);
    } else {
      // Neither fixture nor test -- some other YAML block.
      tests.push(null);
    }
  }

  return tests;
}
