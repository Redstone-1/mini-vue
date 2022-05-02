import { observe } from './observer/index';
import { proxy } from './utils/index';

export function initState (vm) {
  const options = vm.$options;
  if (options.props) {
    initProps(vm);
  }
  if (options.methods) {
    initMethods(vm);
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch(vm);
  }
}

function initProps(vm) {
  
}

function initMethods(vm) {

}

function initData(vm) {
  const { $options } = vm;
  let data = $options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  // 数据劫持
  // 同时，为了方便用户可以直接通过 vm 去取值，这里还要做一层代理，令 vm.xxxxx = vm._data.xxxxx
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  observe(data)
}

function initComputed(vm) {

}

function initWatch(vm) {

}


