import { appOf, ExplorableFiles } from "@explorablegraph/explorable";
import path from "path";
import { fileURLToPath } from "url";
import addGraphToIndex from "./addGraphToIndex.js";

export default async function indexDocs() {
  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const appDir = path.resolve(thisDir, "..");
  const files = new ExplorableFiles(appDir);
  const app = await appOf(files);
  const bodies = await app.get("bodies");
  await addGraphToIndex(bodies, "docs");
  console.log("Indexed docs");
}
