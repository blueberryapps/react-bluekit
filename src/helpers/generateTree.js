import parseHighlightedMenu from './parseHighlightedMenu';
import {Map} from 'immutable';

export default function generateTree(components) {
  return components.reduce((acc, component, x, y) => {
    return acc.setIn((component.get('highlightedMenu') || component.get('name')).split(' ').map(parseHighlightedMenu), component.get('key'))
  }
  , new Map())
}
