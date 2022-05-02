import { parseHTML } from "./parseHTML";
import { generateCode } from './generate';

export function compilerToFunction (template) {
  // 将 HTML 字符串转换为 AST 语法树
  let root = parseHTML(template);
  // 创建可以被执行的 js 字符串代码，利用 with 函数执行
  let code = generateCode(root);

  return new Function(`with(this){ return ${code} }`);
}