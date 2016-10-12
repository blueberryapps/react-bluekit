import parseHighlightedMenu from './parseHighlightedMenu';
import {Map} from 'immutable';

export default function generateTree(componentsIndex) {
  const folderIcon = '<img style="position: relative; left: -3px; top: 1px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAAr0lEQVQYGQXBPUoDQRgA0DeTb9NJyCr4kyqFNtp5AysLD+JdvIa3ECystEwhqGAjQhTZSMAfItkZ30v27QhzDwBAcmGmmrj3qlFV4cdTWLg0dODYCCQrh27Ct1NHOr0GZEV1FiaKK0tDvQSSa+dh160ZAGDDb9jziVBAlfWm+rDtA0UBVLTew1KHDCArtiyyR29YK4qiWGOsCysnGgmQ/Gltehn40hoIIYTQyO48/wMsuzgbB9MA3wAAAABJRU5ErkJggg==">'
  return componentsIndex.reduce((acc, component) => {
    const key = (component.get('highlightedMenu') || component.get('menu')).split(/\s/).map(parseHighlightedMenu)
    const keyWithFolder = key.map((k, i) => i === key.length - 1 ? k : folderIcon + k)
    return acc.setIn(keyWithFolder, component.get('name'))
  }, new Map())
}
