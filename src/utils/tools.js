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

// 判断是不是原生节点
export function isOriginalTag(tag) {
  const tagList = `div,span,p,h1`;
  return tagList.includes(tag);
}