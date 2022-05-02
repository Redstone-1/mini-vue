import { initMixin } from './init';
import { renderMixin } from './render';
import { lifeCycleMixin } from './lifeCycle';

function Vue(options) {
  this._init(options)
}

initMixin(Vue); // 初始化状态和模板解析
renderMixin(Vue); // 渲染函数
lifeCycleMixin(Vue); // 生命周期函数

export default Vue;