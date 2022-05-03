import Watcher from "./observer/watcher";
import { patch } from './vdom/patch';

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}
 
export function mountComponent(vm, el) {
  // const options = vm.$options;
  vm.$el = el;
  // 在渲染之前传递过来生命周期钩子，依次(可能会有 mixin，所以是依次)调用
  callHook(vm, 'beforeMount'); // 此时 $el 还是带有 {{}} 的旧 dom
  // 渲染页面，不论渲染还是更新都会调用这个函数
  let updateComponent = () => {
    // 返回的是虚拟 dom
    vm._update(vm._render());
  }

  // 渲染 watcher，每个组件都有一个 watcher
  new Watcher(vm, updateComponent, () => {}, true); // true 表示这个是一个渲染 watcher
  
  callHook(vm, 'mounted'); // 此时 $el 已经被替换为真实 dom
}

// 调用生命周期函数
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}