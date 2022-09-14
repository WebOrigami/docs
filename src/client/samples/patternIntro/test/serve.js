import http from "node:http";
import siteGraph from "./siteGraph.js";

const port = 5000;

// Convert a path-separated URL into an array of keys.
function keysFromUrl(url) {
  const keys = url.split("/");
  if (keys[0] === "") {
    // The path begins with a slash; drop that part.
    keys.shift();
  }
  if (keys[keys.length - 1] === "") {
    // The path ends with a slash; replace that with index.html as the default key.
    keys[keys.length - 1] = "index.html";
  }
  return keys;
}

// Given a graph, return a listener function that serves the graph.
function requestListener(graph) {
  return async function (request, response) {
    console.log(request.url);
    const keys = keysFromUrl(request.url);
    let data;
    try {
      data = await traverse(graph, ...keys);
    } catch (error) {
      console.log(error.message);
    }
    if (data !== undefined) {
      response.writeHead(200, "Content-Type: text/html");
      response.end(data);
    } else {
      response.writeHead(404, "Content-Type: text/html");
      response.end(`Not found`, "utf-8");
    }
  };
}

// Traverse a path of keys through a graph.
async function traverse(graph, ...keys) {
  let value = graph;
  for (const key of keys) {
    value = await value.get(key);
    if (value === undefined) {
      // Can't go any further
      return undefined;
    }
  }
  return value;
}

// Start the server.
const server = http.createServer(requestListener(siteGraph));
server.listen(port, undefined, () => {
  console.log(
    `Server running at http://localhost:${port}. Press Ctrl+C to stop.`
  );
});
