import { hbs } from "@explorablegraph/explorable";

export default async function pageHtml(pageJson) {
  const template = await this.graph.get("page.hbs");
  const html = await hbs(String(template), pageJson);
  return html;
}
