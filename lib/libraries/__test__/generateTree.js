'use strict';

var _generateTree = require('../generateTree');

var _generateTree2 = _interopRequireDefault(_generateTree);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('generate components tree', function (t) {
  var componentsIndex = (0, _immutable.fromJS)({
    ExampleFolderButton: {
      menu: 'Example Folder Button',
      name: 'ExampleFolderButton'
    }
  });
  var folderIcon = '<svg style=\"position:relative;left:-3px;top:1px\" xmlns=\"http://www.w3.org/2000/svg\" height=\"12px\" id=\"Layer_1\" version=\"1.1\" viewBox=\"0 0 50 50\" width=\"12px\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><rect fill=\"none\" height=\"12\" width=\"12\"/><path d=\"M46,15v-4  c0-1.104-0.896-2-2-2c0,0-24.648,0-26,0c-1.469,0-2.484-4-4-4H3C1.896,5,1,5.896,1,7v4v29v4c0,1.104,0.896,2,2,2h39  c1.104,0,2-0.896,2-2\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/><path d=\"M1,44l5-27  c0-1.104,0.896-2,2-2h39c1.104,0,2,0.896,2,2l-5,27\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" stroke-width=\"2\"/></svg>';
  var tree = (0, _generateTree2.default)(componentsIndex);
  var name = tree.getIn([folderIcon + 'Example', folderIcon + 'Folder', 'Button']);
  var isMap = tree ? _immutable.Map.isMap(tree) : false;
  var result = isMap && name === 'ExampleFolderButton';
  t.true(result);
});