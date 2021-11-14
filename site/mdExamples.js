import YAML from "yaml";
import assert from "./assert.js";
import { default as mdYamls, mdYamlRegex } from "./mdYamls.js";
import yamlsTests from "./yamlsTests.js";

export default async function mdExamples(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const yamls = await mdYamls(markdown);
  const tests = await yamlsTests(yamls);
  const asserts = await Promise.all(
    tests.map((test) => (test ? assert(test) : undefined))
  );

  let count = -1;
  const result = markdown.replace(mdYamlRegex, () => {
    count++;
    const test = tests[count];
    if (!test) {
      // Not a test; reconstruct the original YAML block.
      return `\n\`\`\`yaml\n${yamls[count]}\n\`\`\`\n`;
    }

    const { description, expected } = test;
    const invocation = getTestInvocation(test);
    const expectedText = YAML.stringify(expected).trim();
    let errorMessage = "";
    if (asserts[count]) {
      // Test failed
      const { actual } = asserts[count];
      const actualText = YAML.stringify(actual)?.trim();
      errorMessage = `
<div class="error">
<strong>ERROR</strong> — actual result of the above example is:
<pre>
${actualText}
</pre>
</div>`;
    }

    return `${description}

\`\`\`yaml
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
