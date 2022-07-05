export function patch(oldVNode, vnode) {
  if (!oldVNode) {
    // 说明是组件挂载
    return createEl(vnode);
  }
  // 第一步，判断渲染还是更新
  const isRealElement = oldVNode.nodeType; // 如果是第一次那么 oldVNode 就是一个真实节点 el
  if (isRealElement) {
    const oldEl = oldVNode; // div id="app"
    const parentEl = oldVNode.parentNode; // body
    let el = createEl(vnode); 

    parentEl.insertBefore(el, oldEl.nextSibling); // 向 body 注入新的 div
    parentEl.removeChild(oldEl); // 移除原来的 div
    return el; // 将更新好的 el 返回，不然还是旧的 dom
  }
} 

function isComponent(vnode) {
  let i = vnode.data;
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  if (vnode.componentInstance) {
    
    return true;
  }
}

function createEl(vnode) {
  let { tag, children, text } = vnode;
  if (typeof tag === 'string') {
    if (isComponent(vnode)) {
      return vnode.componentInstance.$el;
    }
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    Object.prototype.toString.call(children) === '[object Array]' && children.forEach(child => {
      return vnode.el.appendChild(createEl(child));
    })
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}