import YAML from "yaml";
import assert from "./assert.js";
import { default as mdYaml, mdYamlRegex } from "./mdYaml.js";

export default async function mdExamples(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const yamlBlocks = await mdYaml(markdown);
  const tests = Object.values(yamlBlocks).map((yamlBlock) =>
    YAML.parse(yamlBlock)
  );
  const asserts = await Promise.all(tests.map((test) => assert(test)));
  let count = -1;
  const result = markdown.replace(mdYamlRegex, () => {
    count++;
    const test = tests[count];
    const { description, expected } = test;
    if (expected === undefined) {
      // Not a test; reconstruct the original YAML block.
      return `\n\`\`\`\n${yamlBlocks[count + 1]}\n\`\`\`\n`;
    }

    const invocation = getTestInvocation(test);
    const expectedText = YAML.stringify(expected).trim();
    let errorMessage = "";
    if (asserts[count]) {
      // Test failed
      const { actual } = asserts[count];
      const actualText = YAML.stringify(actual).trim();
      errorMessage = `
<div class="error">
<strong>ERROR</strong> — actual result of the above example is:
<pre>
${actualText}
</pre>
</div>`;
    }

    return `${description}

\`\`\`
$ eg ${invocation}
${expectedText}
\`\`\`${errorMessage}
`;
  });
  return result;
}

// Return the key of the object that starts with "actual = "
function getTestInvocation(obj) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key.startsWith("actual = ")) {
      return key.substring(9);
    }
  }
  return null;
}
