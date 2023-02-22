import { svg } from "@graphorigami/origami";

export default async function svgWithoutLinks(
  variant,
  options = { createLinks: false }
) {
  return svg.call(this, variant, options);
}
