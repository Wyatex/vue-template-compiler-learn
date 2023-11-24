import { expect, test } from 'vitest'
import { tokenize } from './tokenize'

test('tokenize', () => {
  expect(
    tokenize('<div><p>Vue</p><p>Template</p></div>')
  ).toMatchInlineSnapshot(`
    [
      {
        "name": "div",
        "type": "tag",
      },
      {
        "name": "p",
        "type": "tag",
      },
      {
        "content": "Vue",
        "type": "text",
      },
      {
        "name": "p",
        "type": "tagEnd",
      },
      {
        "name": "p",
        "type": "tag",
      },
      {
        "content": "Template",
        "type": "text",
      },
      {
        "name": "p",
        "type": "tagEnd",
      },
      {
        "name": "div",
        "type": "tagEnd",
      },
    ]
  `)
})
