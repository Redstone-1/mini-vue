let callbacks = []
let waiting = false;

export function nextTick(callback) {
  callback.name === '$$flushQueue' ? callbacks.unshift(callback) : callbacks.push(callback);
  if (!waiting) {
    setTimeout(() => {
      callbacks.forEach(callback => callback());
      callbacks = [];
      waiting = false
    }, 0);
    waiting = true;
  }
}
