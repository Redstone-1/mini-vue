class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    this.vm = vm;
    this.getter = exprOrFn;
    this.callback = callback,
    this.options = options;

    this.get();
  }

  get() {
    this.getter();
  }
}

export default Watcher;