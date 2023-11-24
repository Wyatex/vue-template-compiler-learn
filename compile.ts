import { generate } from './generate'
import { parseAst } from './parse-ast'
import { transform } from './transform'

/**
 * 注入灵魂！！！
 * @param {string} template 模板
 * @returns {string}
 */
export function compile(template: string) {
  // 模板 AST
  const ast = parseAst(template)
  // 将模板 AST 转换为 JavaScript AST
  transform(ast)
  // 代码生成
  const code = generate(ast.jsNode!)

  return code
}
