import { isObject, def } from "../utils/index";
import { arrayMethods } from "./array";
import Dep from './dep';

export function observe(data) {
  if (!isObject(data)) {
    return
  }

  new Observer(data);
}

class Observer {
  constructor(values) {
    def(values, '__ob__', this);
    
    if (Array.isArray(values)) {
      values.__proto__ = arrayMethods;
      this.observerArray(values);
    } else {
      this.walk(values);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      // 定义响应式数据
      defineReactive(data, key, data[key]);
    })
  }

  observerArray(data) {
    for (let i = 0; i < data.length; i++) {
      observe(data[i]);
    }
  }
}

function defineReactive (data, key, value) {
  let dep = new Dep(); // 依赖收集
  observe(value); // 如果对象属性也是对象，递归劫持
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      if (Dep.target) {
        dep.depend(); // 将 watcher 存起来
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue); // 如果用户给对象从新赋值，劫持新值
      value = newValue;

      dep.notify(); // 通知依赖的 watcher 进行更新
    }
  })
}