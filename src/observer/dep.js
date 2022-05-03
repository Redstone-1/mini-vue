let id = 0;

export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  depend () {
    // 如果直接 push，会存在一个属性多次使用生成多个 watcher 的问题
    // this.subs.push(Dep.target);

    // 需要让 watcher 记住 dep
    Dep.target.addDep(this);
  }
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
}

let stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher)
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1]
}