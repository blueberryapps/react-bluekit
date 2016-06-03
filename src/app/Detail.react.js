import PureComponent from 'react-pure-render/component';
import React, {PropTypes as RPT} from 'react';
import DetailPage from './Detail/Page.react';
import {StyleRoot} from 'radium';
import {fromJS, Map, List} from 'immutable';
import getComponentName from '../helpers/getComponentName';
import {FontStyle} from './styles/Font';
import FontBold from './styles/FontBold';

export default class Detail extends PureComponent {

  state = {
    customProps: Map(),
    simplePropsSelected: true,
    showSourceCode: false,
    sourceBackground: '#ffffff',
    triggeredProps: new List()
  }

  static propTypes = {
    backgroundColor: RPT.string,
    component: RPT.func.isRequired,
    height: RPT.string,
    inline: RPT.bool,
    name: RPT.string
  }

  static defaultProps = {
    height: '500px',
    inline: true
  }

  static childContextTypes = {
    createSetAtomProp: RPT.func,
    resetPropsToDefault: RPT.func,
    resetLocalStorage: RPT.func,
    setAtomProp: RPT.func,
    setSourceBackground: RPT.func,
    showSourceCode: RPT.bool,
    toggleSourceCode: RPT.func,
    toggleProps: RPT.func
  }

  getChildContext() {
    return {
      createSetAtomProp: this.createSetAtomProp.bind(this),
      resetPropsToDefault: this.resetPropsToDefault.bind(this),
      resetLocalStorage: this.resetLocalStorage.bind(this),
      setAtomProp: this.setAtomProp.bind(this),
      setSourceBackground: this.setSourceBackground.bind(this),
      showSourceCode: this.state.showSourceCode,
      toggleSourceCode: this.toggleSourceCode.bind(this),
      toggleProps: this.toggleProps.bind(this)
    }
  }

  getComponentName() {
    const {component, name} = this.props

    return name || getComponentName(component)
  }

  render() {
    const {component, backgroundColor, inline, height} = this.props
    const {customProps, sourceBackground, simplePropsSelected, triggeredProps} = this.state

    return (
      <StyleRoot>
        <div style={[styles.wrapper.base, inline ? {height: height} : styles.wrapper.full]}>
          <div style={styles.content}>
            <DetailPage
              Component={component}
              backgroundColor={backgroundColor || sourceBackground}
              componentName={this.getComponentName()}
              customProps={customProps}
              simplePropsSelected={simplePropsSelected}
              triggeredProps={triggeredProps}
            />
          </div>
        </div>
        <FontStyle />
        <FontBold />
      </StyleRoot>
    )
  }

  componentWillMount() {
    this.loadStateFromLocalStorage()
  }

  componentDidMount() {
    document.addEventListener('functionTriggered', this.propFunctionTriggered.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('functionTriggered', this.propFunctionTriggered.bind(this))
  }

  propFunctionTriggered({detail: {prop}}) {
    const {triggeredProps} = this.state
    this.setState({
      triggeredProps: triggeredProps.push(prop)
    })
    setTimeout(this.cleanupTriggeredProp.bind(this), 1000)
  }

  cleanupTriggeredProp() {
    const {triggeredProps} = this.state
    this.setState({
      triggeredProps: triggeredProps.shift()
    })
  }

  createSetAtomProp(_, key, type, scope = []) {
    return event => {
      let value = event

      // Get value from event
      if (event.target && event.target.value !== undefined)
        value = event.target.value

      // Get value from {name, value} event
      else if (event.value !== undefined)
        value = event.value

      // fix string to valid type
      if (type === 'bool' && typeof value !== 'boolean')
        value = event.target.checked
      else if (type === 'number')
        value = parseInt(value, 10)
      this.setAtomProp(key, value, scope)
    }
  }

  setAtomProp(key, value, scope = []) {
    const {customProps} = this.state

    const newCustomProps = customProps.setIn([].concat(scope).concat(key), value)

    this.setState({customProps: newCustomProps})
    this.storeStateToLocalStorage('customProps', newCustomProps)
  }

  toggleProps() {
    const {simplePropsSelected} = this.state

    this.setState({simplePropsSelected: !simplePropsSelected})
    this.storeStateToLocalStorage('simplePropsSelected', !simplePropsSelected)
  }

  toggleSourceCode() {
    const {showSourceCode} = this.state

    this.setState({showSourceCode: !showSourceCode})
    this.storeStateToLocalStorage('showSourceCode', !showSourceCode)
  }

  resetPropsToDefault() {
    const {customProps} = this.state

    const newCustomProps = customProps.set(Map())
    this.setState({
      customProps: newCustomProps,
      sourceBackground: '#ffffff'
    })
    this.storeStateToLocalStorage('customProps', newCustomProps)
    this.storeStateToLocalStorage('sourceBackground', '#ffffff')
  }

  setSourceBackground(color) {
    this.setState({sourceBackground: color})
    this.storeStateToLocalStorage('sourceBackground', color)
  }

  hasLocalStorage() {
    return typeof Storage !== 'undefined'
  }

  namespaceName(name) {
    return `bluekit${this.getComponentName()}${name}`
  }

  storeStateToLocalStorage(kind, value) {
    if (!this.hasLocalStorage())
      return

    switch (kind) {
      case 'customProps': return localStorage.setItem(this.namespaceName('customProps'), JSON.stringify(value))
      case 'selectedAtom': return localStorage.setItem(this.namespaceName('selectedAtom'), value)
      case 'searchedText': return localStorage.setItem(this.namespaceName('searchedText'), value)
      case 'simplePropsSelected': return localStorage.setItem(this.namespaceName('simplePropsSelected'), JSON.stringify(value))
      case 'showSourceCode': return localStorage.setItem(this.namespaceName('showSourceCode'), JSON.stringify(value))
      case 'sourceBackground': return localStorage.setItem(this.namespaceName('sourceBackground'), value)
    }
  }

  loadStateFromLocalStorage() {
    if (!this.hasLocalStorage())
      return

    const storedCustomProps = localStorage.getItem(this.namespaceName('customProps'))
    const storedSimplePropsSelected = localStorage.getItem(this.namespaceName('simplePropsSelected'))
    const storedShowSourceCode = localStorage.getItem(this.namespaceName('showSourceCode'))

    const customProps = storedCustomProps ? JSON.parse(storedCustomProps) : this.state.customProps
    const simplePropsSelected = storedSimplePropsSelected ? JSON.parse(storedSimplePropsSelected) : this.state.simplePropsSelected
    const showSourceCode = storedShowSourceCode ? JSON.parse(storedShowSourceCode) : this.state.showSourceCode
    const sourceBackground = localStorage.getItem(this.namespaceName('sourceBackground')) || this.state.sourceBackground

    this.setState({
      customProps: fromJS(customProps),
      simplePropsSelected: fromJS(simplePropsSelected),
      showSourceCode: fromJS(showSourceCode),
      sourceBackground
    })
  }

  resetLocalStorage() {
    if (!this.hasLocalStorage())
      return

    localStorage.removeItem(this.namespaceName('customProps'))
    localStorage.removeItem(this.namespaceName('simplePropsSelected'))
    localStorage.removeItem(this.namespaceName('showSourceCode'))
    localStorage.removeItem(this.namespaceName('sourceBackground'))
    // refresh page after reset
    window.location = window.location.pathname.replace(/#.*/, '')
  }
}

const styles = {
  wrapper: {
    base: {
      background: 'white',
      width: '100%'
    },
    full: {
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 100000
    }
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'top'
  },
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: 'auto'
  }
};

