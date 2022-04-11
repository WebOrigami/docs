export default function consoleAsserts(code) {
  code = String(code);

  let interactions = code.split("\n$ ");
  // Add back the trailing newline that was absorbed by the split, as well as
  // add a newline to the end of the last interaction.
  interactions.map((interaction) => interaction + "\n");

  const interactionRegex = /^\$ ori (?<command>.+)\n(?<result>[\s\S]+)/;
  const matches = interactions.map((interaction) =>
    interaction.match(interactionRegex)
  );

  const asserts = matches.map((match, index) => {
    const { command, result } = match.groups;
    const actual = `actual = ori '${command}'`;
    return {
      [actual]: null,
      expected: result,
    };
  });

  return asserts;
}
