import { ASSETS_TYPE } from "./constants";

export default function initAssetsRegister(Vue) {
  ASSETS_TYPE.forEach(type => {
    Vue[type] = function(id, definition) {
      if (type === 'component') {
        // 注册全局组件，使用 extend 方法将对象变成构造函数
        definition = this.options._base.extend(definition);
      } else if (type === 'filter') {

      } else if (type === 'directive') {

      }

      this.options[type + 's'][id] = definition
    }
  })
}