import { appOf, ExplorableFiles } from "@explorablegraph/explorable";
import path from "path";
import process from "process";
import addGraphToIndex from "./addGraphToIndex.js";

export default async function indexDocs() {
  const dirname = path.resolve(process.cwd(), "..");
  const files = new ExplorableFiles(dirname);
  const app = await appOf(files);
  const docs = await app.get("docs");
  await addGraphToIndex(docs, "docs");
}
