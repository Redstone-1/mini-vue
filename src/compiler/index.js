import { parseHTML } from "./parseHTML";

export function compilerToFunction (template) {
  // 将 HTML 字符串转换为 AST 语法树
  let root = parseHTML(template);
  console.log('root>>>>>', root);
  return function render () {

  }
}