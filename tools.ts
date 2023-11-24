import { AstNode } from './parse-ast'

export function dump(node: AstNode, indent = 0) {
  const { type, tag, content } = node
  const desc = type === 'Root' ? '' : type === 'Element' ? tag : content

  console.log(`${'-'.repeat(indent)}${type}: ${desc}`)
  if (node.children?.length) {
    node.children.forEach((child) => dump(child, indent + 2))
  }
}
