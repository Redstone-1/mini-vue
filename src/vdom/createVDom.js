import { isObject, isOriginalTag } from '../utils/index';

export function createElement(vm, tag, data, ...children) {
  data = {...data}
  let key = data.key;
  if (key) {
    delete data.key;
  }
  if (isOriginalTag(tag)) {
    // 如果是原始标签
    return vnode(vm, tag, data, key, children, undefined);
  } else {
    // 如果是组件
    let componentDefinition = vm.$options.components[tag];
    return createComponent(vm, tag, data, key, children, componentDefinition);
  }
}

function createComponent(vm, tag, data, key, children, componentDefinition) {
  if (isObject(componentDefinition)) {
    componentDefinition = vm.$options._base.extend(componentDefinition);
  }
  data.hook = {
    init(vnode) {
      let child = vnode.componentInstance = new componentDefinition({ _isComponent: true });
      console.log('child>>>>>', child);
      child.$mount();
    }
  }
  return vnode(vm, tag, data, undefined, key, undefined, { componentDefinition, children, tag })
}

export function createTextNode(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined,text)
}

function vnode(vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  }
}