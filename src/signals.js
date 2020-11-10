// Keep hashmap of props we want to be notified for, when they change
let signals = {};

export function observe(property, signalHandler) {
  if (!signals[property]) {
    signals[property] = [];
  }

  signals[property].push(signalHandler);
}

export function notify(signal, payload = {}) {
  if (!signals[signal] || signals[signal].length < 1) return;

  // Call all listeners that are interested in this prop change
  signals[signal].forEach((signalHandler) => signalHandler(payload));
}
