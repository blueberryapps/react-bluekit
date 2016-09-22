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
  const tree = generateTree(componentsIndex)
  const name = tree.getIn(['Example', 'Folder', 'Button'])
  const isMap = tree ? Map.isMap(tree) : false
  const result = isMap && name === 'ExampleFolderButton'
  t.true(result)
});
