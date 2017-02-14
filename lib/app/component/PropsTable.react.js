'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _Checkbox = require('../atoms/Checkbox.react');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _HtmlEditor = require('../atoms/HtmlEditor.react');

var _HtmlEditor2 = _interopRequireDefault(_HtmlEditor);

var _JsonEditor = require('../atoms/JsonEditor.react');

var _JsonEditor2 = _interopRequireDefault(_JsonEditor);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Input = require('../atoms/Input.react');

var _Input2 = _interopRequireDefault(_Input);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('../atoms/Select.react');

var _Select2 = _interopRequireDefault(_Select);

var _Spaces = require('../styles/Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _immutable = require('immutable');

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropsTable = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(PropsTable, _Component);

  function PropsTable() {
    _classCallCheck(this, PropsTable);

    return _possibleConstructorReturn(this, (PropsTable.__proto__ || Object.getPrototypeOf(PropsTable)).apply(this, arguments));
  }

  _createClass(PropsTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var sortedProps = this.props.sortedProps;


      if (sortedProps === null) return _react2.default.createElement(
        'div',
        { style: styles.prop.noProps },
        'No props defined'
      );

      var normalizedProps = sortedProps.valueSeq().toArray();
      var propsKeys = sortedProps.keySeq().toArray();

      return _react2.default.createElement(
        'div',
        { style: _Font2.default },
        normalizedProps.map(function (value, key) {
          return _this2.renderProp(value, propsKeys[key]);
        })
      );
    }
  }, {
    key: 'renderProp',
    value: function renderProp(data, key) {
      if (!data.get('type')) return null;

      var required = data.get('required');

      if (required) return this.renderPropTableRow(data, key, true, []);

      return this.renderPropTableRow(data, key, false, []);
    }
  }, {
    key: 'renderPropTableRow',
    value: function renderPropTableRow(data, key, renderRequired, scope) {
      var _this3 = this;

      var _props = this.props,
          activeProps = _props.activeProps,
          commonStyles = _props.commonStyles,
          triggeredProps = _props.triggeredProps;

      var name = data.getIn(['type', 'name']);

      if (!data.get('type')) return null;

      if (name === 'shape') return (0, _immutable.Map)(data.getIn(['type', 'value'])).map(function (v, k) {
        return _this3.renderPropTableRow({ type: v }, k, renderRequired, [key]);
      });

      var description = data.get('description');
      var required = data.get('required');
      var triggered = triggeredProps.includes(key);
      var fullWidth = ['any', 'array', 'arrayOf', 'element', 'enum', 'node', 'object', 'shape', 'string'].indexOf(name) !== -1;
      return _react2.default.createElement(
        'div',
        { key: key },
        _react2.default.createElement(
          'div',
          { style: styles.row },
          _react2.default.createElement(
            'div',
            {
              style: [styles.prop, styles.prop.name, fullWidth && styles.prop.fullWidth, styles.prop.fullWidth.name, required && styles.prop.required, activeProps === key && commonStyles.propName.active]
            },
            this.renderNameOfProp(scope.concat(key).join('.'), name),
            required && '*',
            _react2.default.createElement(
              'small',
              { style: styles.prop.small },
              name
            )
          ),
          _react2.default.createElement(
            'div',
            {
              style: [styles.prop, styles.prop.value, fullWidth && styles.prop.fullWidth, triggered && { backgroundColor: colors.GRAY_BRIGHT }]
            },
            name === 'func' || name.match(/\(.*\)\s*=>/) ? 'func()' : this.renderValueSelection(key, data.get('type').toJS(), scope)
          ),
          description && _react2.default.createElement(
            'div',
            { style: styles.description },
            description
          )
        ),
        _react2.default.createElement('div', { style: styles.clearfix })
      );
    }
  }, {
    key: 'renderNameOfProp',
    value: function renderNameOfProp(name, kind) {
      var handlePropsNameClick = this.props.handlePropsNameClick;


      if (['string', 'number', 'bool', 'boolean', 'enum'].indexOf(kind) === -1) return name;else return _react2.default.createElement(
        'a',
        {
          href: '#' + name + '-variant',
          onClick: function onClick() {
            return handlePropsNameClick(name);
          },
          style: styles.prop.value.link
        },
        name
      );
    }
  }, {
    key: 'renderValueSelection',
    value: function renderValueSelection(key, type) {
      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var _props2 = this.props,
          atom = _props2.atom,
          componentProps = _props2.componentProps;
      var createSetAtomProp = this.context.createSetAtomProp;

      var name = atom.get('name') + '-' + scope.concat(key).join('-');

      var defaultProps = {
        onChange: createSetAtomProp(key, type.name, scope),
        value: (0, _immutable.fromJS)(componentProps).getIn(scope.concat([key]))
      };

      switch (type.name.replace('React.', '')) {
        case 'any':
          return _react2.default.createElement(_Input2.default, _extends({ key: name, type: 'text' }, defaultProps));
        case 'array':
          return _react2.default.createElement(_JsonEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'arrayOf':
          return _react2.default.createElement(_JsonEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'bool':
          return _react2.default.createElement(_Checkbox2.default, _extends({ key: name }, _extends({}, defaultProps, { checked: defaultProps.value, name: key })));
        case 'boolean':
          return _react2.default.createElement(_Checkbox2.default, _extends({ key: name }, _extends({}, defaultProps, { checked: defaultProps.value, name: key })));
        case 'element':
          return _react2.default.createElement(_HtmlEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'enum':
          return this.renderEnum(name, type, defaultProps);
        case 'node':
          return _react2.default.createElement(_HtmlEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'Children':
          return _react2.default.createElement(_HtmlEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'ReactNode':
          return _react2.default.createElement(_HtmlEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'ReactElement':
          return _react2.default.createElement(_HtmlEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'number':
          return _react2.default.createElement(_Input2.default, _extends({ key: name, type: 'number' }, defaultProps));
        case 'object':
          return _react2.default.createElement(_JsonEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'shape':
          return _react2.default.createElement(_JsonEditor2.default, _extends({ key: name, name: name }, defaultProps));
        case 'string':
          return _react2.default.createElement(_Input2.default, _extends({ key: name, type: 'text' }, defaultProps));
      }
    }
  }, {
    key: 'renderEnum',
    value: function renderEnum(name, type, defaultProps) {
      if (_typeof(type.value) === 'object') return _react2.default.createElement(_Select2.default, _extends({ key: name, options: this.selectOptions(type) }, defaultProps));

      return _react2.default.createElement(_Input2.default, _extends({ key: name, type: 'text' }, defaultProps));
    }
  }, {
    key: 'selectOptions',
    value: function selectOptions(type) {
      var options = type.value.map(function (v) {
        return _react2.default.createElement(
          'option',
          { key: v.value, value: v.value.replace(/'/g, '') },
          v.value.replace(/'/g, '')
        );
      });

      if (!type.required) return [_react2.default.createElement('option', { key: 'empty', value: '' })].concat(options);

      return options;
    }
  }]);

  return PropsTable;
}(_component2.default), _class2.contextTypes = {
  createSetAtomProp: _react.PropTypes.func.isRequired
}, _class2.propTypes = {
  activeProps: _react.PropTypes.any,
  atom: _react.PropTypes.object.isRequired,
  commonStyles: _react.PropTypes.object.isRequired,
  componentProps: _react.PropTypes.object.isRequired,
  handlePropsNameClick: _react.PropTypes.func.isRequired,
  sortedProps: _react.PropTypes.object,
  triggeredProps: _react.PropTypes.object
}, _temp)) || _class;

exports.default = PropsTable;


var styles = {
  clearfix: {
    clear: 'both'
  },

  row: {
    paddingBottom: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'none'
  },

  description: _extends({}, _Font2.default, _Font2.default.size.small, {
    width: '100%',
    color: colors.BLACK_BRIGHT,
    padding: '3px ' + _Spaces2.default.normal + ' 0',
    margin: 0,
    whiteSpace: 'pre-line'
  }),

  prop: {
    float: 'left',
    boxSizing: 'border-box',
    name: _extends({}, _Font2.default.size.small, {
      width: '55%',
      color: colors.BLUE,
      wordBreak: 'break-all',
      borderLeft: '5px solid transparent',
      padding: '0 ' + _Spaces2.default.small + ' 0 ' + _Spaces2.default.smaller,
      transition: 'all .2s ease-out',
      active: {
        borderLeft: '5px solid ' + colors.BLUE
      }
    }),
    value: _extends({}, _Font2.default.size.small, {
      width: '45%',
      color: colors.BLACK_BRIGHT,
      padding: '0 ' + _Spaces2.default.normal + ' 0 ' + _Spaces2.default.small,
      link: {
        color: colors.BLUE
      }
    }),
    small: {
      fontWeight: 'normal',
      fontSize: '95%',
      display: 'block',
      color: colors.BLACK_BRIGHT
    },
    fullWidth: {
      width: '100%',
      padding: '0 ' + _Spaces2.default.normal,
      name: {
        padding: '0 ' + _Spaces2.default.normal + ' 2px 15px'
      }
    },
    required: {
      fontWeight: 'bold'
    },
    noProps: _extends({}, _Font2.default, _Font2.default.bold, {
      padding: '8px ' + _Spaces2.default.normal
    })
  }
};