import { isObject, def } from "../utils/index";
import { arrayMethods } from "./array";
import Dep from './dep';

export function observe(data) {
  if (!isObject(data)) {
    return
  }

  return new Observer(data);
}

export function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend();
    if (Array.isArray(current)) {
      dependArray(current);
    }
  }
}
class Observer {
  constructor(values) {
    // 因为数组侦听不能使用 defineReactive 里的 dep，这里需要再为数组新建 dep
    this.dep = new Dep();

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
  // 递归劫持
  let childOB = observe(value); // value 可能是对象，也有可能数组，返回的结果都是 Observer 的实例

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      if (Dep.target) {
        dep.depend(); // 将 watcher 存起来
        // 虽然 chillOB 也有可能是对象，但是它的 dep 因为前面已经添加会被忽略，所以下面的代码等同于只给数组添加 dep
        if (childOB) {
          childOB.dep.depend();
          // 如果数组中还有数组
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
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
