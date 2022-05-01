import { parseHTML } from "./parseHTML";
import { generateCode } from './generate';

export function compilerToFunction (template) {
  // 将 HTML 字符串转换为 AST 语法树
  let root = parseHTML(template);
  let code = generateCode(root);
  const renderFn = new Function(`with(this){ return ${code} }`);
  return renderFn;
}