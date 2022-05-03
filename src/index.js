import { initMixin } from './init';
import { renderMixin } from './render';
import { lifeCycleMixin } from './lifeCycle';
import { initGlobalAPI } from './globalAPI/index';

function Vue(options) {
  this._init(options)
}

initMixin(Vue); // 初始化状态和模板解析
renderMixin(Vue); // 渲染函数
lifeCycleMixin(Vue); // 生命周期函数
initGlobalAPI(Vue); // 初始化全局 API

export default Vue;