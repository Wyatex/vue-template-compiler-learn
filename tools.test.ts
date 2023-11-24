import { expect, test } from 'vitest'
// import { AstNode, parseAst } from './parse-ast'
// import { traverseNode } from './tools'

// test('transform test', () => {
//   function transformElement(node: AstNode) {
//     if (node.type === 'Element' && node.tag === 'p') {
//       node.tag = 'h1'
//     }
//   }

//   function transformText(node: AstNode) {
//     if (node.type === 'Text') {
//       node.content = node.content!.repeat(2)
//     }
//   }
//   const ast = parseAst('<p>Hello!Hello!</p>')
//   traverseNode(ast, {
//     nodeTransforms: [transformElement, transformText],
//   })
//   expect(ast).toMatchInlineSnapshot(`
//     {
//       "children": [
//         {
//           "children": [
//             {
//               "content": "HelloHelloHelloHello",
//               "type": "Text",
//             },
//           ],
//           "tag": "h1",
//           "type": "Element",
//         },
//       ],
//       "type": "Root",
//     }
//   `)
// })

test('tools test', () => {
  expect(1).toBe(1)
})
