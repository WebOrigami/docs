import {
  DocExcerpt,
  DocParamBlock,
  DocSection,
  TSDocParser,
} from "@microsoft/tsdoc";

export default async function tsdoc(buffer) {
  const source = buffer.toString();
  const parser = new TSDocParser();
  const parserContext = parser.parseString(source);
  const result = docNodeObject(parserContext.docComment);
  return result;
}

function docNodeObject(docNode) {
  if (!docNode) {
    return null;
  }
  const result = {
    type: docNode.constructor.name,
  };
  if (docNode instanceof DocSection || docNode instanceof DocParamBlock) {
    result.content = formatDocNode(docNode);
  } else {
    const childNodes = docNode.getChildNodes();
    if (childNodes.length > 0) {
      result.children = childNodes.map(docNodeObject);
    }
  }
  return result;
}

function formatDocNode(docNode) {
  let result = "";
  if (docNode) {
    if (docNode instanceof DocExcerpt) {
      result += docNode.content.toString();
    }
    for (const childNode of docNode.getChildNodes()) {
      result += formatDocNode(childNode);
    }
  }
  return result;
}

function formatDocNodes(docNodes) {
  let result = "";
  for (const docNode of docNodes) {
    result += renderDocNode(docNode);
  }
  return result;
}
