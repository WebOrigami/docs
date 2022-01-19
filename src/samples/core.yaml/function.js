// function.js

import { ExplorableFunction } from "@explorablegraph/explorable";

// Create an explorable function with a domain.
export default new ExplorableFunction(
  (key) => `Hello, ${key}. [from a function]`,
  ["Alice", "Bob", "Carol"]
);
