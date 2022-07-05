// 合并 mixin 

const LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];

let strategies = {};

LIFECYCLE_HOOKS.forEach((hook) => {
  strategies[hook] = function (parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        // 父子都有值 ，用父和子拼接在一起 ， 父有值就一直是数组
        return parentVal.concat(childVal)
      } else {
        // 儿子有值，父没有值
        if (Array.isArray(childVal)) {
          return childVal
        } else {
          return [childVal] // 如果没值就变成数组
        }
      }
    } else {
      return parentVal
    }
  };
})

// 合并全局 API，比如 components，filter，directive
strategies.components = function (parentVal, childVal) {
  console.log('parentVal>>>>>', parentVal);
  console.log('childVal>>>>>', childVal);
  const res = Object.create(parentVal);
  if (childVal) {
    for (let key in childVal) {
      res[key] = childVal[key];
    }
  }
  return res;
};

// 合并父子 options，即混入 mixin
export function mergeOptions(parentOptions, childOptions) {
  const options = {};
  for (let key in parentOptions) {
    mergeField(key);
  }

  for (let key in childOptions) {
    if (!parentOptions.hasOwnProperty(key)) { // 如果已经合并过了则不用再合并
      mergeField(key);
    }
  }

  function mergeField(key) {
    // 因为生命周期是函数，合并策略需要单拎出来，如果 strategies 有值，说明用户写了生命周期 mixin，走生命周期的合并策略
    if (strategies[key]) {
      return options[key] = strategies[key](parentOptions[key], childOptions[key]);
    }
    // 下面就是普通属性的合并
    if (typeof parentOptions[key] === 'object' && typeof childOptions[key] === 'object') {
      options[key] = {
        ...parentOptions[key],
        ...childOptions[key],
      }
    } else if (childOptions[key] === null || childOptions[key] === undefined) {
      options[key] = parentOptions[key];
    } else {
      options[key] = childOptions[key];
    }
  }

  return options;
}