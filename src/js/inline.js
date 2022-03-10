import { orit } from "@explorablegraph/explorable";

export default async function inline(buffer) {
  const result = await orit.call(this, buffer, null, true);
  return result;
}
