import { createStringLiteral } from './create-js-ast-node'
import { parseAst } from './parse-ast'
import { ITraverseNodeContext, traverseNode } from './traverse-node'
import { expect, test } from 'vitest'

test('traverseNode', () => {
  const context: ITraverseNodeContext = {
    currentNode: null,
    childIndex: 0,
    parent: null,
    replaceNode(node) {
      // 为了替换节点，我们需要修改 AST
      // 找到当前节点在父节点的 children 中的位置：context.childIndex
      // 然后使用新节点替换即可
      if (context.parent?.children) {
        context.parent.children[context.childIndex] = node
      }
      // 由于当前节点已经被新节点替换掉了，因此我们需要将 currentNode 更新为新节点
      context.currentNode = node
    },
    removeNode() {
      if (context.parent?.children) {
        // 调用数组的 splice 方法，根据当前节点的索引删除当前节点
        context.parent.children.splice(context.childIndex, 1)
        // 将 context.currentNode 置空
        context.currentNode = null
      }
    },
    nodeTransforms: [
      (node, context) => {
        if (node.type === 'Text') {
          node.content = '321'
        }
      },
      (node, context) => {
        return () => {
          if (node.type === 'Element' && node.tag === 'p') {
            node.tag = 'h1'
          }
        }
      },
    ],
  }
  const ast = parseAst('<div><p>123</p></div>')
  traverseNode(ast, context)
  expect(ast).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "children": [],
              "tag": "h1",
              "type": "Element",
            },
          ],
          "tag": "div",
          "type": "Element",
        },
      ],
      "type": "Root",
    }
  `)
})
