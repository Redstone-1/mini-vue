const ncname = `[a-zA-z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 标签开头的正则，捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配标签结尾的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>']+)))?/ // 属性匹配
const startTagClose = /^\s*(\/?)>/ // 匹配标签结束的
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function parseHTML (html) {
  let i = 0
  while (html && i < 50) {
    i++
    let textEnd = html.indexOf('<');
    console.log('textEnd>>>>>', textEnd);
    if (textEnd === 0) {
      let startTagMatch = parseStartTag()
    }
  }

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
      console.log('match>>>>>', match);
    }
  }

  function advance (n) {
    html = html.substring(n)
  }
}

export function compilerToFunction (template) {
  let root = parseHTML(template);
  return function render () {

  }
}