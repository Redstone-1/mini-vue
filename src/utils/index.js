export function isObject (target) {
  return typeof target === 'object' && target !== null;
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    value: value,
    enumerable: false,
    configurable: false,
  })
}