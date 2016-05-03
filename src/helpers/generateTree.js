import {Map} from 'immutable'

export default function generateTree(componentsIndex) {
  const componentsList = Object.keys(componentsIndex).map(key => componentsIndex[key])

  return componentsList.reduce((acc, component) => (
    acc.setIn((component.highlightedMenu || component.menu).split(/\s/).map(s => s.replace(/bstyle/g, 'b style')), component.name)
  ), new Map()).toJS()
}
