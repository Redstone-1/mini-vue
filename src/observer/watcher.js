import { pushTarget, popTarget } from './dep'

let id = 0;
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.getter = exprOrFn;
    this.callback = callback,
    this.options = options;
    this.id = id++; // 每个 watcher 的唯一 id
    this.get();
  }

  get() {
    pushTarget(this); // 每次数据变化，希望由 Vue 来通知视图更新，而不是用户手动更新，那么需要将当前的 watcher 实例存起来
    this.getter();
    popTarget(); // 移除当前的 watcher
  }

  update() {
    this.get();
  }
}

export default Watcher;