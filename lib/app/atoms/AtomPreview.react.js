'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _extendComponentProps = require('../../libraries/extendComponentProps');

var _extendComponentProps2 = _interopRequireDefault(_extendComponentProps);

var _filterFunctionProps = require('../../libraries/filterFunctionProps');

var _filterFunctionProps2 = _interopRequireDefault(_filterFunctionProps);

var _notResolved = require('../../libraries/notResolved');

var _notResolved2 = _interopRequireDefault(_notResolved);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _resolveComponent = require('../../libraries/resolveComponent');

var _resolveComponent2 = _interopRequireDefault(_resolveComponent);

var _wrapComponentWithRescue = require('../../libraries/wrapComponentWithRescue');

var _wrapComponentWithRescue2 = _interopRequireDefault(_wrapComponentWithRescue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtomPreview = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(AtomPreview, _Component);

  function AtomPreview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AtomPreview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AtomPreview.__proto__ || Object.getPrototypeOf(AtomPreview)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.state = {
      component: _this.resolveComponentFromProps(_this.props)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AtomPreview, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        component: this.resolveComponentFromProps(nextProps)
      });
    }
  }, {
    key: 'resolveComponentFromProps',
    value: function resolveComponentFromProps(props) {
      if (!props.atom) return null;

      return (0, _wrapComponentWithRescue2.default)((0, _resolveComponent2.default)(props.atom.get('component')));
    }
  }, {
    key: 'atomProps',
    value: function atomProps(props) {
      var atom = props.atom,
          disableFunctionProps = props.disableFunctionProps,
          variantProps = props.variantProps;

      var simpleProps = atom.get('simpleProps').toJS();
      var filteredProps = disableFunctionProps ? (0, _filterFunctionProps2.default)(simpleProps) : simpleProps;
      var extendedFiltered = (0, _extendComponentProps2.default)(filteredProps, atom.get('propsDefinition'));
      var customProps = variantProps ? variantProps : {};
      var extendedCustom = (0, _extendComponentProps2.default)(customProps, atom.get('propsDefinition'));
      var extendedProps = extendedFiltered.mergeDeep(extendedCustom);

      return extendedProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var ExampleComponent = this.state.component || (0, _notResolved2.default)(this.props);
      return _react2.default.createElement(
        'div',
        { style: styles },
        _react2.default.createElement(ExampleComponent, this.atomProps(this.props).toJS())
      );
    }
  }]);

  return AtomPreview;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object,
  disableFunctionProps: _react.PropTypes.bool,
  variantProps: _react.PropTypes.object
}, _temp2)) || _class;

exports.default = AtomPreview;
;

var styles = {
  position: 'relative',
  minHeight: '35px',
  minWidth: '50px'
};