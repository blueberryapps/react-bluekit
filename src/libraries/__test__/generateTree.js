import generateTree from '../generateTree';
import {Map} from 'immutable';
import test from 'ava';

test('generate components tree', t => {
  const componentsIndex = Map({
    ExampleFolderButton: Map({
      menu: 'Example Folder Button',
      name: 'ExampleFolderButton'
    })
  })
  const tree = generateTree(componentsIndex)
  const name = tree.getIn(['Example', 'Folder', 'Button'])
  const isMap = tree ? Map.isMap(tree) : false
  const result = isMap && name === 'ExampleFolderButton'
  t.true(result)
});
