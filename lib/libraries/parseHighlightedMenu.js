'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseHighlightedMenu;
function parseHighlightedMenu(text) {
  return text.replace(/bstyle/g, 'b style');
}