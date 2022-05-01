import { observe } from './observer/index';

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
  observe(data)
}

function initComputed(vm) {

}

function initWatch(vm) {

}

