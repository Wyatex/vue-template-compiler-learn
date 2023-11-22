import { expect, test } from 'vitest'
import { parseAst } from './parse-ast'

test('parseAst', () => {
  expect(parseAst('<div><p>Vue</p><p>Template</p></div>')).toEqual({
    type: 'Root',
    children: [
      {
        type: 'Element',
        tag: 'div',
        children: [
          {
            type: 'Element',
            tag: 'p',
            children: [
              {
                type: 'Text',
                content: 'Vue',
              },
            ],
          },
          {
            type: 'Element',
            tag: 'p',
            children: [
              {
                type: 'Text',
                content: 'Template',
              },
            ],
          },
        ],
      },
    ],
  })
})
