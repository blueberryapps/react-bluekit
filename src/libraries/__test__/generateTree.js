import generateTree from '../generateTree';
import test from 'ava';
import {fromJS, Map} from 'immutable';

test('generate components tree', t => {
  const componentsIndex = fromJS({
    ExampleFolderButton: {
      menu: 'Example Folder Button',
      name: 'ExampleFolderButton'
    }
  })
  const folderIcon = '<img style=\"position: relative; left: -3px; top: 1px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAQAAAD8fJRsAAAAr0lEQVQYGQXBPUoDQRgA0DeTb9NJyCr4kyqFNtp5AysLD+JdvIa3ECystEwhqGAjQhTZSMAfItkZ30v27QhzDwBAcmGmmrj3qlFV4cdTWLg0dODYCCQrh27Ct1NHOr0GZEV1FiaKK0tDvQSSa+dh160ZAGDDb9jziVBAlfWm+rDtA0UBVLTew1KHDCArtiyyR29YK4qiWGOsCysnGgmQ/Gltehn40hoIIYTQyO48/wMsuzgbB9MA3wAAAABJRU5ErkJggg==\">'
  const tree = generateTree(componentsIndex)
  const name = tree.getIn([`${folderIcon}Example`, `${folderIcon}Folder`, 'Button'])
  const isMap = tree ? Map.isMap(tree) : false
  const result = isMap && name === 'ExampleFolderButton'
  t.true(result)
});
