import { expect, test } from 'vitest'
import { tokenize } from './tokenize'

test('tokenize', () => {
  expect(tokenize('<div><p>Vue</p><p>Template</p></div>')).toEqual([
    {
      type: 'tag',
      name: 'div',
    },
    {
      type: 'tag',
      name: 'p',
    },
    {
      type: 'text',
      content: 'Vue',
    },
    {
      type: 'tagEnd',
      name: 'p',
    },
    {
      type: 'tag',
      name: 'p',
    },
    {
      type: 'text',
      content: 'Template',
    },
    {
      type: 'tagEnd',
      name: 'p',
    },
    {
      type: 'tagEnd',
      name: 'div',
    },
  ])
})
