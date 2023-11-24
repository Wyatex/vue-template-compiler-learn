import {
  FunctionDeclNode,
  createArrayExpression,
  createCallExpression,
  createStringLiteral,
} from './create-js-ast-node'
import { AstNode } from './parse-ast'
import {
  ITraverseNodeContext,
  NodeTransform,
  traverseNode,
} from './traverse-node'

const transformElement: NodeTransform = (node) => {
  // 将转换代码编写在退出阶段的回调函数中，
  // 这样可以保证该标签节点的子节点全部被处理完毕
  return () => {
    // 如果被转换的节点不是元素节点，则什么都不做
    if (node.type !== 'Element') {
      return
    }
    // 1. 创建 h 函数调用语句,
    // h 函数调用的第一个参数是标签名称，因此我们以 node.tag 来创建一个
    // 字符串字面量节点作为第一个参数
    const callExp = createCallExpression('h', [createStringLiteral(node.tag!)])
    // 2. 处理 h 函数调用的参数
    node.children?.length === 1
      ? // 如果当前标签节点只有一个子节点，则直接使用子节点的 jsNode 作为参数
        callExp.arguments.push(node.children[0].jsNode)
      : // 如果当前标签节点有多个子节点，则创建一个 ArrayExpression 节点作为参数
        callExp.arguments.push(
          createArrayExpression(node.children?.map((child) => child.jsNode!)!)
        )
    // 3. 将当前标签节点对应的 JavaScript AST 添加到 jsNode 属性下
    node.jsNode = callExp
  }
}

const transformText: NodeTransform = (node, context) => {
  if (node.type === 'Text') {
    node.jsNode = createStringLiteral(node.content!)
  }
}

const transformRoot: NodeTransform = (node) => {
  return () => {
    if (node.type === 'Root') {
      // 暂时不考虑模板存在多个根节点的情况
      const vnodeAST = node.children![0].jsNode!
      // 创建 render 函数的声明语句节点，
      // 将 vnodeJSAST 作为 render 函数体的返回语句

      node.jsNode = {
        type: 'FunctionDecl',
        id: { type: 'Identifier', name: 'render' },
        params: [],
        body: [
          {
            type: 'ReturnStatement',
            return: vnodeAST,
          },
        ],
      }
    }
  }
}

export function transform(ast: AstNode) {
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
    nodeTransforms: [transformElement, transformRoot, transformText],
  }
  traverseNode(ast, context)
}
