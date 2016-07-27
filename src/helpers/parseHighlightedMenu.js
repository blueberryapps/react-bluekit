export default function parseHighlightedMenu(text) {
  return text ? text.replace(/bstyle/g, 'b style') : text
}
