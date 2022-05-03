import { initState } from "./state";
import { compilerToFunction } from './compiler/index';
import { mountComponent, callHook } from './lifeCycle';
import { mergeOptions } from './utils/index';

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    // 将 组件实例的 options 与 mixin 的 options 合并
    // 生命周期钩子也是通过这里被合并且调用的
    // vm.constructor.options，之所以用这个，虽然 vm.$options 也可以，但是不一定是 Vue 实例，也有可能是 Vue 子类创建的实例
    vm.$options =  mergeOptions(vm.constructor.options, options);
    // 初始化状态前，调用 beforeCreate 生命周期钩子
    callHook(vm, 'beforeCreate');
    // 初始化状态
    initState(vm)
    callHook(vm, 'created');
    // 挂载模板
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el);

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
        const render = compilerToFunction(template);
        options.render = render;
      }
    }
    // 渲染当前组件
    mountComponent(vm, el);
  }
}