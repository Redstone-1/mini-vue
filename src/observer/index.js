import { isObject } from "../utils/index";

export function observe(data) {
  if (!isObject(data)) {
    return
  }

  new Observer(data);
}

class Observer {
  constructor(values) {
    this.walk(values)
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      // 定义响应式数据
      defineReactive(data, key, data[key]);
    })
  }
}

function defineReactive (data, key, value) {
  observe(value); // 如果对象属性也是对象，递归劫持
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue); // 如果用户给对象从新赋值，劫持新值
      value = newValue;
    }
  })
}