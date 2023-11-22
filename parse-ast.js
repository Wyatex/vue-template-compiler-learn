"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAst = void 0;
var tokenize_1 = require("./tokenize");
function parseAst(str) {
    var tokens = (0, tokenize_1.tokenize)(str);
    var root = {
        type: 'Root',
        children: [],
    };
    var elementStack = [root];
    while (tokens.length) {
        var parent_1 = elementStack[elementStack.length - 1];
        var t = tokens[0];
        switch (t.type) {
            case 'tag':
                // 如果当前 Token 是开始标签，则创建 Element 类型的 AST 节点
                var elementNode = {
                    type: 'Element',
                    tag: t.name,
                    children: [],
                };
                parent_1.children.push(elementNode);
                elementStack.push(elementNode);
                break;
            case 'text':
                // 如果当前 Token 是文本，则创建 Text 类型的 AST 节点
                parent_1.children.push({
                    type: 'Text',
                    content: t.content,
                });
                break;
            case 'tagEnd':
                // 如果当前 Token 是结束标签，则从堆栈中弹出
                elementStack.pop();
                break;
        }
        tokens.shift();
    }
    return root;
}
exports.parseAst = parseAst;
