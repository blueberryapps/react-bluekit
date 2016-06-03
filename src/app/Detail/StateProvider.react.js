import {Component, PropTypes as RPT} from 'react';
import {fromJS, Map, List} from 'immutable';


export default class StateProvider extends Component {

  static propTypes = {
    children: RPT.node,
    componentName: RPT.string
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

  state = {
    customProps: Map(),
    simplePropsSelected: true,
    showSourceCode: false,
    sourceBackground: '#ffffff',
    triggeredProps: new List()
  }

  render() {
    return this.props.children
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
    const {componentName} = this.props

    return `bluekit${componentName}${name}`
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
