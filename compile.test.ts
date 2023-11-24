import { expect, test } from 'vitest'
import { compile } from './compile'

test('parseAst', () => {
  expect(
    compile('<div><p>Vue</p><p>Template</p></div>')
  ).toMatchInlineSnapshot(`
    "function render () {
      return h('div', [h('p', 'Vue'), h('p', 'Template')])
    }"
  `)
})
