import { pushTarget, popTarget } from './dep';
import { queueWatcher } from './schedular';

let id = 0;
export default class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.getter = exprOrFn;
    this.callback = callback,
    this.options = options;
    this.id = id++; // 每个 watcher 的唯一 id
    this.depsId = new Set();
    this.deps = [];
    this.get();
  }

  get() {
    pushTarget(this); // 每次数据变化，希望由 Vue 来通知视图更新，而不是用户手动更新，那么需要将当前的 watcher 实例存起来
    this.getter();
    popTarget(); // 移除当前的 watcher
  }

  update() {
    // this.get(); // 如果直接调用则会触发频繁更新，为了多次更新合为一次，需要缓存变更
    queueWatcher(this); // 队列更新
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  run() {
    this.get();
  }
}