export default async function defineds(variant) {
  variant = variant ?? (await this.get("@defaultTree"));
  if (variant === undefined) {
    return undefined;
  }
  return Tree.mapReduce(variant, null, (values, keys) => {
    const result = {};
    let someValuesExist = false;
    for (let i = 0; i < keys.length; i++) {
      const value = values[i];
      if (value != null) {
        someValuesExist = true;
        result[keys[i]] = values[i];
      }
    }
    return someValuesExist ? result : null;
  });
}
