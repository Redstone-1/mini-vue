let oldArrayMethods = Array.prototype;
export const arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayMethods[method].apply(this, args);
    let inserted;
    let ob = this.__ob__;

    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'spilice':
        inserted = args.slice(2)
        break;
      default:
        break;
    }

    if (inserted) {
      ob.observerArray(inserted);
    }

    ob.dep.notify(); // 如果用户调用了上述方法，就会触发 dep 中的 notify 方法
    
    return result;
  }
})