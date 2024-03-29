import YAML from "yaml";

export default async function yamlsTests(variant) {
  const tree = Tree.from(variant);

  let fixture = null;
  const tests = [];
  for (const key of await tree.keys()) {
    const value = await tree.get(key);
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
