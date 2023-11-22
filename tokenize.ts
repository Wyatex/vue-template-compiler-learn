/**
 * 使用有限状态机将字符串解析成token
 */

const State = {
  initial: 1,
  tagOpen: 2,
  tagName: 3,
  text: 4,
  tagEnd: 5,
  tagEndName: 6,
}

function isAlpha(ch: string) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
}

export type Token =
  | {
      type: 'tag' | 'tagEnd'
      name: string
    }
  | {
      type: 'text'
      content: string
    }

export function tokenize(str: string) {
  let currentState = State.initial
  const chars = <string[]>[]
  const tokens = <Token[]>[]
  while (str) {
    const char = str[0]
    switch (currentState) {
      case State.initial:
        if (char === '<') {
          currentState = State.tagOpen
        } else if (isAlpha(char)) {
          currentState = State.text
          chars.push(char)
        }
        str = str.slice(1)
        break
      case State.tagOpen:
        if (isAlpha(char)) {
          currentState = State.tagName
          chars.push(char)
        } else if (char === '/') {
          currentState = State.tagEnd
        }
        str = str.slice(1)
        break
      case State.tagName:
        if (isAlpha(char)) {
          chars.push(char)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tag',
            name: chars.join(''),
          })
          chars.length = 0
        }
        str = str.slice(1)
        break
      case State.text:
        if (isAlpha(char)) {
          chars.push(char)
        } else if (char === '<') {
          currentState = State.tagOpen
          tokens.push({
            type: 'text',
            content: chars.join(''),
          })
          chars.length = 0
        }
        str = str.slice(1)
        break
      case State.tagEnd:
        if (isAlpha(char)) {
          currentState = State.tagEndName
          chars.push(char)
        }
        str = str.slice(1)
        break
      case State.tagEndName:
        if (isAlpha(char)) {
          chars.push(char)
        } else if (char === '>') {
          currentState = State.initial
          tokens.push({
            type: 'tagEnd',
            name: chars.join(''),
          })
          chars.length = 0
        }
        str = str.slice(1)
        break
    }
  }
  return tokens
}
