This folder contains the source to produce the Origami comics.

The goal of the comics is to introduce new people to Origami concepts and the ways in which it makes it easy to create software artifacts like sites.

## Requirements

1. Writing a new comic should be fairly quick, perhaps a couple of hours to rough out the little story, come up with code examples and ensure they work, then revise as necessary.
2. The comics should compile to HTML so they render on the site in high fidelity, are responsive, and are reasonably accessible.
3. To ensure the comics reflect the latest release of Origami, where possible Origami source code examples in the comics should have their live, interpreted results inlined directly into the comic. This lets Origami's `Dev.changes` builtin [test the site](https://weborigami.org/builtins/dev/changes.html#using-changes-for-testing-static-sites) to detect if an upcoming Origami release will cause the sample output to change.
4. To increase awareness of Origami via social media, it must be possible to capture the rendered HTML as a set of images that can be attached to a post.

## Basic pipeline

- The root `/comics` folder contains a set of subfolders, each representing a single comic. The subfolders have names like `001 Full-text search` that encode a comic index for sorting purposes and a text fragment that can be converted to a slug like `full-text-search`.
- Each comic folder contains a `comic.yaml` file defining the sequence of 4 panels. Each panel can include text, a face to speak the text, a footnote, and a definition of a main scene.
- Each panel has a main scene: the overall presentation of the panel content. A scene might depict a browser session, terminal session, editor session, etc.
- The type of scene for each panel is indicated with the name of an Origami template that will render the scene data as HTML.
- The `/comics` route of the documentation site is defined in the Origami source file `/src/comics/comics.ori`.

## Screenshots

The comics portion of the site uses the Origami [screenshot extension](https://github.com/WebOrigami/extensions/tree/main/screenshot) in two ways.

First, panels that simulate a browser session may want to show a publicly-visible URL. A browser scene can indicate that it wants to capture that public URL as an image that will be checked into source control. Those screenshots are captured with the `comic-screenshots` npm script. This ensures that the simulated browser session: looks consistent from build to build; works even if the target site happens to be down when someone visits the Origami documentation; and avoids the security implications of inlining HTML from an external source.

Second, the final rendered HTML for each panel can be captured to create images for sharing on social media.

## Running Origami code
