import { initState } from "./state";
import { compilerToFunction } from './compiler/index';

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm)
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
        console.log('template>>>>>', template);
        const render = compilerToFunction(template);
        options.render = render;
      }
    }
  }
}