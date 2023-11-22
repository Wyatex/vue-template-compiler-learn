"use strict";
/**
 * 使用有限状态机将字符串解析成token
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = void 0;
var State = {
    initial: 1,
    tagOpen: 2,
    tagName: 3,
    text: 4,
    tagEnd: 5,
    tagEndName: 6,
};
function isAlpha(ch) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}
function tokenize(str) {
    var currentState = State.initial;
    var chars = [];
    var tokens = [];
    while (str) {
        var char = str[0];
        switch (currentState) {
            case State.initial:
                if (char === '<') {
                    currentState = State.tagOpen;
                }
                else if (isAlpha(char)) {
                    currentState = State.text;
                    chars.push(char);
                }
                str = str.slice(1);
                break;
            case State.tagOpen:
                if (isAlpha(char)) {
                    currentState = State.tagName;
                    chars.push(char);
                }
                else if (char === '/') {
                    currentState = State.tagEnd;
                }
                str = str.slice(1);
                break;
            case State.tagName:
                if (isAlpha(char)) {
                    chars.push(char);
                }
                else if (char === '>') {
                    currentState = State.initial;
                    tokens.push({
                        type: 'tag',
                        name: chars.join(''),
                    });
                    chars.length = 0;
                }
                str = str.slice(1);
                break;
            case State.text:
                if (isAlpha(char)) {
                    chars.push(char);
                }
                else if (char === '<') {
                    currentState = State.tagOpen;
                    tokens.push({
                        type: 'text',
                        content: chars.join(''),
                    });
                    chars.length = 0;
                }
                str = str.slice(1);
                break;
            case State.tagEnd:
                if (isAlpha(char)) {
                    currentState = State.tagEndName;
                    chars.push(char);
                }
                str = str.slice(1);
                break;
            case State.tagEndName:
                if (isAlpha(char)) {
                    chars.push(char);
                }
                else if (char === '>') {
                    currentState = State.initial;
                    tokens.push({
                        type: 'tagEnd',
                        name: chars.join(''),
                    });
                    chars.length = 0;
                }
                str = str.slice(1);
                break;
        }
    }
    return tokens;
}
exports.tokenize = tokenize;
