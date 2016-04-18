import {Map} from 'immutable'

export default function generateTree(componentsIndex) {
  const componentsList = Object.keys(componentsIndex).map(key => componentsIndex[key])
  return componentsList.reduce((acc, component) => (
    acc.setIn(component.menu.split(/\s/), component.name)
  ), new Map())
}
