export default function functionSource(source, name) {
  const functionRegex =
    /\/\/[\s\S]+?\n(async )?function (?<name>.+)\([\s\S]+?\n\}\n/g;
  for (const match of source.matchAll(functionRegex)) {
    if (match.groups.name === name) {
      return match[0];
    }
  }
}
