const ncname = `[a-zA-z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则，捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>']+)))?/ // 属性匹配
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的

let root = null; // ast 语法树树根
let currentParent; // 当前父节点
let stack = [];

const ELEMENT_TYPE = 1; // 元素节点类型
const TEXT_TYPE = 3; // 文本节点类型

// 创建 AST 对象
function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null,
  }
}

// 遇到开始标签，创建一个 AST 对象
function start(tagName, attrs) {
  let element = createASTElement(tagName, attrs);
  if (!root) {
    root = element;
  }
  currentParent = element;
  stack.push(element);
}

// 遇到文本标签就将它添加为 children
function chars(text) {
  text = text.replace(/\s/g, '');
  if (text) {
    currentParent.children.push({
      text,
      type: TEXT_TYPE,
    })
  }
}

// 遇到闭合标签
function end(tagName) {
  // 取出栈中最后一个开始标签
  let element = stack.pop();
  if (element.tag === tagName) {
    // 获取该标签的父节点
    currentParent = stack[stack.length - 1];
    // 如果父节点存在
    if (currentParent) {
      element.parent = currentParent.tag;
      currentParent.children.push(element);
    }
  }
}

// 转换 HTML
export function parseHTML (html) {
  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      let startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }

    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  // 转换开始标签
  function parseStartTag () {
    const start = html.match(startTagOpen);
    if (start) {
      let end;
      let attr;
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
      }

      // 去掉开始标签的 >
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  // 匹配成功并删除匹配的内容，截取后面部分
  function advance (n) {
    html = html.substring(n)
  }

  return root;
}