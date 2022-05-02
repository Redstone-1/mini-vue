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

// 代理 vm._data
export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}