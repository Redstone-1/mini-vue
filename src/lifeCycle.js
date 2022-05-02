import Watcher from "./observer/watcher";

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    console.log('vnode>>>>>', vnode);
  }
}
 
export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;
  // 渲染页面，不论渲染还是更新都会调用这个函数
  let updateComponent = () => {
    // 返回的是虚拟 dom
    vm._update(vm._render());
  }

  // 渲染 watcher，每个组件都有一个 watcher
  new Watcher(vm, updateComponent, () => {}, true); // true 表示这个是一个渲染 watcher
}