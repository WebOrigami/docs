// Explorable graph representation of a function and a domain
export default {
  // Iterator returns the keys (domain) in this graph.
  async *[Symbol.asyncIterator]() {},

  // Get function returns the value for a given key.
  async get(key) {},
};
