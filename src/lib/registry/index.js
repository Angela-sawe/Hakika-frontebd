export const lookup = (hash, { mock = false } = {}) =>
  (mock ? import("./mock.js") : import("./chain.js")).then(module => module.lookup(hash));
