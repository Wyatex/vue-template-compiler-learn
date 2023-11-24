import { AstNode } from './parse-ast'

export type NodeTransform = (
  node: AstNode,
  context: ITraverseNodeContext
) => (() => void) | void

export interface ITraverseNodeContext {
  currentNode: AstNode | null
  childIndex: number
  parent: AstNode | null
  replaceNode(node: AstNode): void
  removeNode(): void
  nodeTransforms: Array<NodeTransform>
}

// 接收第二个参数 context
// export function traverseNode(ast: AstNode, context: ITraverseNodeContext) {
//   context.currentNode = ast

//   // context.nodeTransforms 是一个数组，其中每一个元素都是一个函数
//   const transforms = context.nodeTransforms
//   for (let i = 0; i < transforms.length; i++) {
//     // 将当前节点 currentNode 和 context 都传递给 nodeTransforms 中注册的回调函数
//     transforms[i](context.currentNode, context)
//     // 由于任何转换函数都可能移除当前节点，因此每个转换函数执行完毕后，
//     // 都应该检查当前节点是否已经被移除，如果被移除了，直接返回即可
//     if (!context.currentNode) return
//   }

//   const children = context.currentNode.children
//   if (children) {
//     for (let i = 0; i < children.length; i++) {
//       // 递归地调用 traverseNode 转换子节点之前，将当前节点设置为父节点
//       context.parent = context.currentNode
//       // 设置位置索引
//       context.childIndex = i
//       // 递归地调用时，将 context 透传
//       traverseNode(children[i], context)
//     }
//   }
// }

export function traverseNode(ast: AstNode, context: ITraverseNodeContext) {
  context.currentNode = ast
  // 1. 增加退出阶段的回调函数数组
  const exitFns = <Array<() => void>>[]
  const transforms = context.nodeTransforms
  for (let i = 0; i < transforms.length; i++) {
    // 2. 转换函数可以返回另外一个函数，该函数即作为退出阶段的回调函数
    const onExit = transforms[i](context.currentNode, context)
    if (onExit) {
      // 将退出阶段的回调函数添加到 exitFns 数组中
      exitFns.push(onExit)
    }
    if (!context.currentNode) return
  }

  const children = context.currentNode.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      context.parent = context.currentNode
      context.childIndex = i
      traverseNode(children[i], context)
    }
  }

  // 在节点处理的最后阶段执行缓存到 exitFns 中的回调函数
  // 注意，这里我们要反序执行
  let i = exitFns.length
  while (i--) {
    exitFns[i]()
  }
}
