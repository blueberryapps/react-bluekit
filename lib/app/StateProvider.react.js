'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = StateProvider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fuzzy = require('fuzzy');

var _immutable = require('immutable');

var _Colors = require('./styles/Colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function StateProvider(Wrapped) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(StateProvider, _Component);

    function StateProvider() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, StateProvider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        customProps: (0, _immutable.Map)(),
        selectedAtom: null,
        searchedText: '',
        simplePropsSelected: true,
        showMobileProps: false,
        showMobileSidebar: false,
        showSourceCode: false,
        sourceBackground: '#ffffff',
        triggeredProps: new _immutable.List(),
        uiFoldersOpened: new _immutable.List()
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(StateProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          createSetAtomProp: this.createSetAtomProp.bind(this),
          resetPropsToDefault: this.resetPropsToDefault.bind(this),
          resetLocalStorage: this.resetLocalStorage.bind(this),
          selectAtom: this.selectAtom.bind(this),
          searchAtoms: this.searchAtoms.bind(this),
          setAtomProp: this.setAtomProp.bind(this),
          setSourceBackground: this.setSourceBackground.bind(this),
          showSourceCode: this.state.showSourceCode,
          toggleFoldersOpened: this.toggleFoldersOpened.bind(this),
          toggleMobileProps: this.toggleMobileProps.bind(this),
          toggleSidebar: this.toggleSidebar.bind(this),
          toggleSourceCode: this.toggleSourceCode.bind(this),
          toggleProps: this.toggleProps.bind(this),
          uiFoldersOpened: this.state.uiFoldersOpened
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var componentsIndex = this.props.componentsIndex;


        return _react2.default.createElement(Wrapped, _extends({}, this.state, this.props, { componentsIndex: (0, _immutable.fromJS)(componentsIndex), filteredComponentsIndex: (0, _immutable.fromJS)(this.filterComponentsIndex()) }));
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.loadStateFromLocalStorage();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('functionTriggered', this.propFunctionTriggered.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('functionTriggered', this.propFunctionTriggered.bind(this));
      }
    }, {
      key: 'propFunctionTriggered',
      value: function propFunctionTriggered(_ref2) {
        var _this2 = this;

        var prop = _ref2.detail.prop;
        var triggeredProps = this.state.triggeredProps;


        setTimeout(function () {
          return _this2.setState({
            triggeredProps: triggeredProps.push(prop)
          });
        }, 1);

        setTimeout(this.cleanupTriggeredProp.bind(this), 1000);
      }
    }, {
      key: 'cleanupTriggeredProp',
      value: function cleanupTriggeredProp() {
        var triggeredProps = this.state.triggeredProps;

        this.setState({
          triggeredProps: triggeredProps.shift()
        });
      }
    }, {
      key: 'createSetAtomProp',
      value: function createSetAtomProp(key, type) {
        var _this3 = this;

        var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        return function (event) {
          var value = event;

          // Get value from event
          if (event.target && event.target.value !== undefined) value = event.target.value;

          // Get value from {name, value} event
          else if (event.value !== undefined) value = event.value;

          // fix string to valid type
          if ((type === 'bool' || type === 'boolean') && typeof value !== 'boolean') value = event.target.checked;else if (type === 'number') value = parseInt(value, 10);
          _this3.setAtomProp(key, value, scope);
        };
      }
    }, {
      key: 'setAtomProp',
      value: function setAtomProp(key, value) {
        var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var _state = this.state,
            selectedAtom = _state.selectedAtom,
            customProps = _state.customProps;


        if (!selectedAtom) return false;

        var newCustomProps = customProps.setIn([selectedAtom].concat(scope).concat(key), value);

        this.setState({ customProps: newCustomProps });
        this.storeStateToLocalStorage('customProps', newCustomProps);
      }
    }, {
      key: 'toggleFoldersOpened',
      value: function toggleFoldersOpened(key) {
        var uiFoldersOpened = this.state.uiFoldersOpened;

        var keyPosition = uiFoldersOpened.keyOf(key);
        var folders = keyPosition >= 0 ? uiFoldersOpened.delete(keyPosition) : uiFoldersOpened.push(key);

        this.setState({ uiFoldersOpened: folders });
        this.storeStateToLocalStorage('uiFoldersOpened', folders);
      }
    }, {
      key: 'toggleMobileProps',
      value: function toggleMobileProps() {
        var showMobileProps = this.state.showMobileProps;


        this.setState({ showMobileProps: !showMobileProps });
        this.storeStateToLocalStorage('showMobileProps', !showMobileProps);
      }
    }, {
      key: 'toggleProps',
      value: function toggleProps() {
        var simplePropsSelected = this.state.simplePropsSelected;


        this.setState({ simplePropsSelected: !simplePropsSelected });
        this.storeStateToLocalStorage('simplePropsSelected', !simplePropsSelected);
      }
    }, {
      key: 'toggleSidebar',
      value: function toggleSidebar() {
        var showMobileSidebar = this.state.showMobileSidebar;


        this.setState({ showMobileSidebar: !showMobileSidebar });
        this.storeStateToLocalStorage('showMobileSidebar', !showMobileSidebar);
      }
    }, {
      key: 'toggleSourceCode',
      value: function toggleSourceCode() {
        var showSourceCode = this.state.showSourceCode;


        this.setState({ showSourceCode: !showSourceCode });
        this.storeStateToLocalStorage('showSourceCode', !showSourceCode);
      }
    }, {
      key: 'resetPropsToDefault',
      value: function resetPropsToDefault() {
        var _state2 = this.state,
            customProps = _state2.customProps,
            selectedAtom = _state2.selectedAtom;


        var newCustomProps = customProps.set(selectedAtom, (0, _immutable.Map)());
        this.setState({
          customProps: newCustomProps,
          sourceBackground: '#ffffff'
        });
        this.storeStateToLocalStorage('customProps', newCustomProps);
        this.storeStateToLocalStorage('sourceBackground', '#ffffff');
      }
    }, {
      key: 'selectAtom',
      value: function selectAtom(inputSelectedAtom) {
        var selectedAtom = inputSelectedAtom === 'null' ? null : inputSelectedAtom;

        this.setState({ selectedAtom: selectedAtom });
        this.storeStateToLocalStorage('selectedAtom', selectedAtom);
      }
    }, {
      key: 'searchAtoms',
      value: function searchAtoms(searchedText) {
        this.setState({ searchedText: searchedText });
        this.storeStateToLocalStorage('searchedText', searchedText);
      }
    }, {
      key: 'filterComponentsIndex',
      value: function filterComponentsIndex() {
        var componentsIndex = this.props.componentsIndex;
        var searchedText = this.state.searchedText;

        var options = { pre: '<bstyle="color:' + _Colors.HIGHLIGHT + ';background:' + _Colors.HIGHLIGHT_BACKGROUND + '">', post: '</b>' };
        if (('' + searchedText).length > 0) return (0, _fuzzy.filter)(searchedText.toLowerCase(), Object.keys(componentsIndex)).reduce(function (acc, key) {
          return _extends({}, acc, _defineProperty({}, key.original, _extends({}, componentsIndex[key.original], { highlightedMenu: (0, _fuzzy.filter)(searchedText.toLowerCase(), [componentsIndex[key.original].menu], options)[0].string })));
        }, {});
        return componentsIndex;
      }
    }, {
      key: 'setSourceBackground',
      value: function setSourceBackground(color) {
        this.setState({ sourceBackground: color });
        this.storeStateToLocalStorage('sourceBackground', color);
      }
    }, {
      key: 'hasLocalStorage',
      value: function hasLocalStorage() {
        return typeof Storage !== 'undefined';
      }
    }, {
      key: 'storeStateToLocalStorage',
      value: function storeStateToLocalStorage(kind, value) {
        if (!this.hasLocalStorage()) return;

        var name = this.props.name;


        switch (kind) {
          case 'customProps':
            return localStorage.setItem('bluekit' + name + 'CustomProps', JSON.stringify(value));
          case 'selectedAtom':
            return localStorage.setItem('bluekit' + name + 'SelectedAtom', value);
          case 'searchedText':
            return localStorage.setItem('bluekit' + name + 'SearchedText', value);
          case 'simplePropsSelected':
            return localStorage.setItem('bluekit' + name + 'SimplePropsSelected', JSON.stringify(value));
          case 'showSourceCode':
            return localStorage.setItem('bluekit' + name + 'ShowSourceCode', JSON.stringify(value));
          case 'sourceBackground':
            return localStorage.setItem('bluekit' + name + 'SourceBackground', value);
          case 'uiFoldersOpened':
            return localStorage.setItem('bluekit' + name + 'UiFoldersOpened', JSON.stringify(value));
        }
      }
    }, {
      key: 'loadStateFromLocalStorage',
      value: function loadStateFromLocalStorage() {
        if (!this.hasLocalStorage()) return;

        var name = this.props.name;


        var storedCustomProps = localStorage.getItem('bluekit' + name + 'CustomProps');
        var storedSimplePropsSelected = localStorage.getItem('bluekit' + name + 'SimplePropsSelected');
        var storedShowSourceCode = localStorage.getItem('bluekit' + name + 'ShowSourceCode');
        var storedUiFoldersOpened = localStorage.getItem('bluekit' + name + 'UiFoldersOpened');

        var customProps = storedCustomProps ? JSON.parse(storedCustomProps) : this.state.customProps;
        var selectedAtom = localStorage.getItem('bluekit' + name + 'SelectedAtom') || this.state.selectedAtom;
        var searchedText = localStorage.getItem('bluekit' + name + 'SearchedText') || this.state.searchedText;
        var simplePropsSelected = storedSimplePropsSelected ? JSON.parse(storedSimplePropsSelected) : this.state.simplePropsSelected;
        var showSourceCode = storedShowSourceCode ? JSON.parse(storedShowSourceCode) : this.state.showSourceCode;
        var sourceBackground = localStorage.getItem('bluekit' + name + 'SourceBackground') || this.state.sourceBackground;
        var uiFoldersOpened = storedUiFoldersOpened ? JSON.parse(storedUiFoldersOpened) : this.state.uiFoldersOpened;

        this.selectAtom(selectedAtom);

        this.setState({
          customProps: (0, _immutable.fromJS)(customProps),
          searchedText: searchedText,
          simplePropsSelected: (0, _immutable.fromJS)(simplePropsSelected),
          showSourceCode: (0, _immutable.fromJS)(showSourceCode),
          sourceBackground: sourceBackground,
          uiFoldersOpened: (0, _immutable.fromJS)(uiFoldersOpened)
        });
      }
    }, {
      key: 'resetLocalStorage',
      value: function resetLocalStorage() {
        if (!this.hasLocalStorage()) return;

        var name = this.props.name;


        localStorage.removeItem('bluekit' + name + 'CustomProps');
        localStorage.removeItem('bluekit' + name + 'SelectedAtom');
        localStorage.removeItem('bluekit' + name + 'SearchedText');
        localStorage.removeItem('bluekit' + name + 'SimplePropsSelected');
        localStorage.removeItem('bluekit' + name + 'ShowSourceCode');
        localStorage.removeItem('bluekit' + name + 'SourceBackground');
        localStorage.removeItem('bluekit' + name + 'UiFoldersOpened');
        // refresh page after reset
        window.location = window.location.pathname.replace(/#.*/, '');
      }
    }]);

    return StateProvider;
  }(_react.Component), _class.propTypes = {
    componentsIndex: _react.PropTypes.object.isRequired,
    inline: _react.PropTypes.bool,
    name: _react.PropTypes.string
  }, _class.childContextTypes = {
    createSetAtomProp: _react.PropTypes.func,
    resetPropsToDefault: _react.PropTypes.func,
    resetLocalStorage: _react.PropTypes.func,
    selectAtom: _react.PropTypes.func,
    searchAtoms: _react.PropTypes.func,
    setAtomProp: _react.PropTypes.func,
    setSourceBackground: _react.PropTypes.func,
    showSourceCode: _react.PropTypes.bool,
    toggleFoldersOpened: _react.PropTypes.func,
    toggleMobileProps: _react.PropTypes.func,
    toggleSidebar: _react.PropTypes.func,
    toggleSourceCode: _react.PropTypes.func,
    toggleProps: _react.PropTypes.func,
    uiFoldersOpened: _react.PropTypes.object
  }, _temp2;
}