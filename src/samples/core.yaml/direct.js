// direct.js

// Define a set of greetings directly in explorable graph form.
export default {
  // Return the keys in this graph
  async *[Symbol.asyncIterator]() {
    yield* ["Alice", "Bob", "Carol"];
  },

  // Get the value of a given key
  async get(key) {
    return `Hello, ${key}.`;
  },
};
