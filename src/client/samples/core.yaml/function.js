// function.js

import { FunctionGraph } from "@explorablegraph/explorable";

// Create an explorable function with a domain.
export default new FunctionGraph(
  (key) => `Hello, ${key}. [from a function]`,
  ["Alice", "Bob", "Carol"]
);
