export default function consoleAsserts(codeData) {
  const code = String(codeData.code);
  const path = codeData.path;

  let interactions = code.split(/^\$ /m);

  const interactionRegex = /^ori (?<command>.+)\n(?<result>[\s\S]+)/m;
  const matches = interactions
    .map((interaction) => interaction.match(interactionRegex))
    .filter((match) => match !== null);

  const asserts = matches.map((match, index) => {
    const { command, result } = match.groups;

    // HACK: The documentation process will end up parsing markdown as a
    // template document, which means that sample output that includes curly
    // braces will need to be escaped with backslashes. Those backslashes won't
    // appear in the final output. In order to match the actual result with the
    // expected result, we process the backslashes in the `result` string. This
    // feels hacky.
    const escapeRegex = /\\([^\\])/g;
    const expected = result.replaceAll(escapeRegex, "$1");

    let actual = `actual = ori '${command}'`;
    if (path) {
      actual += `, '${path}'`;
    }
    return {
      description: `ori ${command}`,
      [actual]: null,
      expected,
    };
  });

  return asserts;
}
