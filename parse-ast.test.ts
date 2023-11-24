import { expect, test } from 'vitest'
import { parseAst } from './parse-ast'

test('parseAst', () => {
  expect(
    parseAst('<div><p>Vue</p><p>Template</p></div>')
  ).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "children": [
                {
                  "content": "Vue",
                  "type": "Text",
                },
              ],
              "tag": "p",
              "type": "Element",
            },
            {
              "children": [
                {
                  "content": "Template",
                  "type": "Text",
                },
              ],
              "tag": "p",
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
