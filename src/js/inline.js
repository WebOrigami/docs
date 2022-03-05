import { pkt } from "@explorablegraph/explorable";

export default async function inline(buffer) {
  const result = await pkt.call(this, buffer, null, true);
  return result;
}
