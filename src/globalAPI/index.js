import initMixin from './mixin';
import { ASSETS_TYPE } from './constants';
import initExtend from './extend';
import initAssetsRegister from './assetsRegister';

export function initGlobalAPI(Vue) {
  Vue.options = {};
  initMixin(Vue);
  ASSETS_TYPE.forEach(type => {
    Vue.options[type + 's'] = {};
  })

  Vue.options._base = Vue;

  initExtend(Vue);
  initAssetsRegister(Vue);
}