import YAML from "yaml";
import assert from "./assert.js";
import { default as mdYaml, mdYamlRegex } from "./mdYaml.js";

export default async function mdExamples(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const yamlBlocks = await mdYaml(markdown);
  const codes = Object.values(yamlBlocks).map((yamlBlock) =>
    YAML.parse(yamlBlock)
  );

  let fixture = null;
  const tests = codes.map((code) => {
    if (code.fixture) {
      // Fixture
      fixture = code.fixture;
      return undefined;
    } else if (code.expected) {
      // Test
      const test = Object.assign(
        {
          fixture,
        },
        code
      );
      return test;
    } else {
      // Neither fixture nor test -- some other YAML block.
      return undefined;
    }
  });

  const asserts = await Promise.all(
    tests.map((test) => (test ? assert(test) : undefined))
  );

  let count = -1;
  const result = markdown.replace(mdYamlRegex, () => {
    count++;
    const test = tests[count];
    if (test === undefined) {
      // Not a test; reconstruct the original YAML block.
      return `\n\`\`\`\n${yamlBlocks[count + 1]}\n\`\`\`\n`;
    }

    const { description, expected } = test;
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
