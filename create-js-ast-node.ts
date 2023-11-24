// 用来创建 StringLiteral 节点
export function createStringLiteral(value: string) {
  return {
    type: 'StringLiteral',
    value,
  }
}

export type StringLiteralNode = ReturnType<typeof createStringLiteral>

// 用来创建 Identifier 节点
export function createIdentifier(name: string) {
  return {
    type: 'Identifier',
    name,
  }
}

export type IdentifierNode = ReturnType<typeof createIdentifier>

// 用来创建 ArrayExpression 节点
export function createArrayExpression(elements: JSNode[]) {
  return {
    type: 'ArrayExpression',
    elements,
  }
}

export interface ArrayExpressionNode
  extends ReturnType<typeof createArrayExpression> {}

// 用来创建 CallExpression 节点
export function createCallExpression(callee: string, args: any[]) {
  return {
    type: 'CallExpression',
    callee: createIdentifier(callee),
    arguments: args,
  }
}

export type CallExpressionNode = ReturnType<typeof createCallExpression>

export interface ReturnStatemenNode {
  type: 'ReturnStatement'
  return: JSNode
}

export interface FunctionDeclNode {
  type: 'FunctionDecl'
  id: {
    type: string
    name: string
  }
  params: any[]
  body: JSNode[]
}

export type JSNode =
  | StringLiteralNode
  | IdentifierNode
  | ArrayExpressionNode
  | CallExpressionNode
  | ReturnStatemenNode
  | FunctionDeclNode
