'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _AtomPreview = require('./atoms/AtomPreview.react');

var _AtomPreview2 = _interopRequireDefault(_AtomPreview);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Headings = require('./styles/Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _MediaQueries = require('./styles/MediaQueries');

var _NotFound = require('./atoms/NotFound.react');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _parseHighlightedMenu = require('../libraries/parseHighlightedMenu');

var _parseHighlightedMenu2 = _interopRequireDefault(_parseHighlightedMenu);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZoomContent = require('./atoms/ZoomContent.react');

var _ZoomContent2 = _interopRequireDefault(_ZoomContent);

var _Colors = require('./styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllComponentsPreview = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(AllComponentsPreview, _Component);

  function AllComponentsPreview() {
    _classCallCheck(this, AllComponentsPreview);

    return _possibleConstructorReturn(this, (AllComponentsPreview.__proto__ || Object.getPrototypeOf(AllComponentsPreview)).apply(this, arguments));
  }

  _createClass(AllComponentsPreview, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var componentsIndex = this.props.componentsIndex;

      var index = 0;
      return _react2.default.createElement(
        'div',
        { style: styles.wrapper },
        _react2.default.createElement(
          'div',
          { style: styles.wrapper.row },
          componentsIndex.sortBy(function (value, key) {
            return key;
          }).reduce(function (acc, atom, name) {
            return acc.concat(_this2.renderAtom(name, atom, index++ % 2));
          }, []),
          Object.keys(componentsIndex.toJS()).length === 0 && this.renderNotFound()
        )
      );
    }
  }, {
    key: 'renderNotFound',
    value: function renderNotFound() {
      return _react2.default.createElement(
        _NotFound2.default,
        null,
        'No components to display'
      );
    }
  }, {
    key: 'renderAtom',
    value: function renderAtom(name, atom, isOdd) {
      var selectAtom = this.props.selectAtom;

      var heading = (0, _parseHighlightedMenu2.default)(atom.get('highlightedMenu') || atom.get('menu'));

      return _react2.default.createElement(
        'div',
        {
          key: name,
          style: [styles.atom.wrapper, isOdd && styles.atom.wrapper.odd]
        },
        _react2.default.createElement(
          'div',
          { style: styles.headingWrapper },
          _react2.default.createElement('h2', {
            dangerouslySetInnerHTML: { __html: heading },
            key: name,
            onClick: function onClick() {
              return selectAtom(name);
            },
            style: [_Headings2.default, _Headings2.default.allComponents]
          })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.atom.column },
          _react2.default.createElement(
            _ZoomContent2.default,
            null,
            _react2.default.createElement(_AtomPreview2.default, { atom: atom })
          )
        )
      );
    }
  }]);

  return AllComponentsPreview;
}(_component2.default), _class2.propTypes = {
  componentsIndex: _react.PropTypes.object.isRequired,
  selectAtom: _react.PropTypes.func.isRequired
}, _temp)) || _class;

exports.default = AllComponentsPreview;


var styles = {
  wrapper: {
    padding: '15px',
    row: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  },

  headingWrapper: {
    marginBottom: '20px'
  },

  atom: {
    wrapper: _defineProperty({
      width: '50%',
      float: 'left',
      padding: '15px 15px 15px 0',
      boxSizing: 'border-box',
      borderBottom: '1px solid ' + colors.GRAY_DARKER,
      borderRight: '1px solid ' + colors.GRAY_DARKER,
      odd: {
        borderRight: 0,
        padding: '15px 0 15px 15px'
      }
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      width: '100%',
      borderRight: 0,
      padding: '15px 0'
    }),
    column: {
      clear: 'both'
    }
  }
};