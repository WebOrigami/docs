/**
 * Auto-fit speech bubble widths based on their text content.
 */

const range = document.createRange();

function autoFitWidth(element) {
  element.style.maxWidth = ""; // reset
  // Measure the width of each child (generally paragraphs)
  const children = Array.from(element.children);
  const widths = children.map(visibleTextWidth);

  const maxWidth = Math.max(...widths);
  element.style.maxWidth = `${maxWidth + 1}px`; // +1 for luck
}

function autoFitWidths() {
  const captionsWithFaces = document.querySelectorAll(".caption:has(.face)");
  const speeches = Array.from(captionsWithFaces).map((caption) =>
    caption.querySelector(".speech")
  );
  speeches.forEach(autoFitWidth);

  const footnotes = document.querySelectorAll(".footnote");
  footnotes.forEach(autoFitWidth);
}

function visibleTextWidth(element) {
  // The range API gives us access to the bounding boxes of the rendered text
  // even when it wraps across multiple lines.
  range.selectNodeContents(element);
  const rects = Array.from(range.getClientRects());
  const minLeft = Math.min(...rects.map((r) => r.left));
  const maxRight = Math.max(...rects.map((r) => r.right));
  const visibleWidth = maxRight - minLeft;
  return visibleWidth;
}

window.addEventListener("load", async () => {
  await document.fonts.ready;
  autoFitWidths();
  new ResizeObserver(autoFitWidths).observe(document.body);
});
