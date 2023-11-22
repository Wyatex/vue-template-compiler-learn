import type { Token } from './tokenize'
import { tokenize } from './tokenize'

/**
 * 使用堆栈将token解析成树
 */

export type AstNodeType = 'Root' | 'Text' | 'Element'

export type AstNode = {
  type: AstNodeType
  children?: AstNode[]
  content?: string
  tag?: string
}

export function parseAst(str: string): AstNode {
  const tokens = tokenize(str)
  const root: AstNode = {
    type: 'Root',
    children: [],
  }
  const elementStack = [root]
  while (tokens.length) {
    const parent = elementStack[elementStack.length - 1]
    const t = tokens[0]
    switch (t.type) {
      case 'tag':
        // 如果当前 Token 是开始标签，则创建 Element 类型的 AST 节点
        const elementNode: AstNode = {
          type: 'Element',
          tag: t.name,
          children: [],
        }
        parent.children!.push(elementNode)
        elementStack.push(elementNode)
        break
      case 'text':
        // 如果当前 Token 是文本，则创建 Text 类型的 AST 节点
        parent.children!.push({
          type: 'Text',
          content: t.content,
        })
        break
      case 'tagEnd':
        // 如果当前 Token 是结束标签，则从堆栈中弹出
        elementStack.pop()
        break
    }
    tokens.shift()
  }
  return root
}