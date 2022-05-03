import { nextTick } from '../utils/index';

let queue = [];
let has = {};

export function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;

    // vue 中 nextTick 有几个实现方式，根据浏览器支持情况使用了 promise / mutationObserver / setImmediate / setTimeout 等优雅降级的处理方式
    nextTick($$flushQueue);
  }
}

function $$flushQueue() {
  queue.forEach(watcher => {
    watcher.run();
  })
  queue = [];
  has = {};
}