const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// 拿到 AST 对象开始生成字符串 js 代码
export function generateCode(el) {
  const children = genChildren(el);
  /**
   * remark: 生成一个字符串的 js 代码，使用 with 函数执行
   * _c: 是一个编译函数
   * params: 1.标签名 2.属性
   */
  let code = `
    _c('${el.tag}',${el.attrs.length ? genProps(el.attrs) : 'undefined'}${children ? `,${children}` : ''})
  `
  return code
}

function genProps(attrs) {
  let str = '';

  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, value] = item.split(':');
        obj[key] = value;
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`;
}

function genChildren(el) {
  let children = el.children;
  if (children && children.length > 0) {
    return `${children.map(item => genChild(item)).join(',')}`
  } else {
    return false;
  }
}

function genChild(child) {
  if (child.type === 1) {
    return generateCode(child);
  } else {
    let text = child.text;
    let tokens = []; // 要捕获的响应式数据，即 {{ }} 里的数据
    let match, index;
    let lastIndex = defaultTagRE.lastIndex = 0 // 正则特性，也是坑点，设置当前匹配到的字符串位置
    while (match = defaultTagRE.exec(text)) { // 展开匹配、捕获
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}