import { mergeOptions } from "../utils/index";

export default function initExtend(Vue) {
  let cid = 0;
  Vue.extend = function (opt) {
    // 会产生一个子类
    const Super = this
    const Sub = function (options) {
      // 创造一个组件，就是new这个组件的类（组件初始化）
      this._init(options)
    }
    Sub.cid = cid++
    Sub.prototype = Object.create(Super.prototype) // 继承原型方法
    Sub.prototype.constructor = Sub // Object.create 会产生一个新的实例作为子类的原型，此时constructor会指向错误
    Sub.options = mergeOptions(Super.options, opt)
    return Sub
  }
} 