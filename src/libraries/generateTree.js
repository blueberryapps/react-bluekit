import parseHighlightedMenu from './parseHighlightedMenu';
import {Map} from 'immutable';

export default function generateTree(componentsIndex) {
  return componentsIndex.reduce((acc, component, x, y) => (
    acc.setIn((component.get('highlightedMenu') || component.get('menu')).split(/\s/).map(parseHighlightedMenu), component.get('name'))
  ), new Map())
}
