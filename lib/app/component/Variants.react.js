'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AtomPreview = require('../atoms/AtomPreview.react');

var _AtomPreview2 = _interopRequireDefault(_AtomPreview);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Headings = require('../styles/Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _renderProp = require('../../libraries/renderProp');

var _renderProp2 = _interopRequireDefault(_renderProp);

var _SourceCode = require('./SourceCode.react');

var _SourceCode2 = _interopRequireDefault(_SourceCode);

var _Sources = require('../styles/Sources');

var _Sources2 = _interopRequireDefault(_Sources);

var _variantChecksum = require('../../libraries/variantChecksum');

var _variantChecksum2 = _interopRequireDefault(_variantChecksum);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variants = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Variants, _Component);

  function Variants() {
    _classCallCheck(this, Variants);

    return _possibleConstructorReturn(this, (Variants.__proto__ || Object.getPrototypeOf(Variants)).apply(this, arguments));
  }

  _createClass(Variants, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var sortedProps = this.props.sortedProps;


      if (sortedProps === null) return null;

      var normalizedProps = sortedProps.valueSeq().toArray();
      var propsKeys = sortedProps.keySeq().toArray();

      return _react2.default.createElement(
        'div',
        null,
        normalizedProps.map(function (value, key) {
          return _this2.renderProp(value, propsKeys[key]);
        })
      );
    }
  }, {
    key: 'renderNoVariants',
    value: function renderNoVariants() {
      return _react2.default.createElement(
        'b',
        { style: _Sources2.default.noVariants },
        'There are no possible variants'
      );
    }
  }, {
    key: 'renderProp',
    value: function renderProp(definition, key) {
      var definitionMap = (0, _immutable.fromJS)(definition);
      if (!definitionMap.get('type')) return null;

      var name = definitionMap.getIn(['type', 'name']);
      var value = definitionMap.getIn(['type', 'value']);
      switch (name) {
        case 'string':
          return this.renderVariants(key, name, ['', 'String ' + key]);
        case 'number':
          return this.renderVariants(key, name, [0, 5, 100, 123.45]);
        case 'bool':
          return this.renderVariants(key, name, [false, true]);
        case 'enum':
          return this.renderEnumVariant(key, name, value);
      }

      return null;
    }
  }, {
    key: 'renderEnumVariant',
    value: function renderEnumVariant(key, name, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return this.renderVariants(key, name, value.map(function (text) {
        return text.get('value').replace(/\'/g, '');
      }).toJS());
      return null;
    }
  }, {
    key: 'collectVariants',
    value: function collectVariants(key, type, variants) {
      var _this3 = this;

      var _props = this.props,
          atom = _props.atom,
          componentProps = _props.componentProps;


      return variants.map(function (variant) {
        var variantProps = componentProps.set(key, variant);

        return {
          atom: atom,
          key: key,
          type: type,
          variant: variant,
          variantProps: variantProps,
          checksum: (0, _variantChecksum2.default)({ atom: atom, variantProps: variantProps, context: _this3.context })
        };
      });
    }
  }, {
    key: 'renderVariants',
    value: function renderVariants(key, type, variants) {
      var _this4 = this;

      var headingColor = this.props.headingColor;


      var collection = this.collectVariants(key, type, variants);
      var uniqCollection = _lodash2.default.uniqBy(collection, function (i) {
        return i.checksum;
      });

      if (uniqCollection.length < 2) return null;

      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          'div',
          { style: _Sources2.default.panel },
          _react2.default.createElement(
            'h2',
            {
              id: key + '-variant',
              style: [_Headings2.default, _Headings2.default.preview, { color: headingColor }]
            },
            'Prop variant: ',
            _react2.default.createElement(
              'b',
              null,
              key
            )
          ),
          collection.map(function (item) {
            return _this4.renderVariant(item);
          })
        )
      );
    }
  }, {
    key: 'renderVariant',
    value: function renderVariant(_ref) {
      var atom = _ref.atom,
          key = _ref.key,
          type = _ref.type,
          variant = _ref.variant,
          variantProps = _ref.variantProps;

      var source = '<' + atom.get('componentName') + ' ' + (0, _renderProp2.default)(key, type, variant) + ' />';

      return _react2.default.createElement(
        'div',
        { key: variant, style: _Sources2.default.pre },
        _react2.default.createElement(
          'div',
          { style: _Sources2.default.clear },
          _react2.default.createElement(_AtomPreview2.default, { atom: atom, variantProps: variantProps })
        ),
        _react2.default.createElement(_SourceCode2.default, { atom: atom, customSource: source, name: atom.get('name') + '-' + key + '-' + type + '-' + variant, visible: true }),
        _react2.default.createElement('div', { style: [_Sources2.default.clear, _Sources2.default.clear.after] })
      );
    }
  }]);

  return Variants;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object.isRequired,
  componentProps: _react.PropTypes.object.isRequired,
  headingColor: _react.PropTypes.string.isRequired,
  sortedProps: _react.PropTypes.object
}, _temp)) || _class;

exports.default = Variants;