export default function bind(fn, ...args) {
  return fn.bind(this, ...args);
}
