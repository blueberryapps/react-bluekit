import React, {Component, PropTypes as RPT} from 'react';
import {filter as fuzzyFilter} from 'fuzzy';
import {fromJS, Map, List} from 'immutable';
import {HIGHLIGHT} from './styles/Colors';

export default function StateProvider(Wrapped) {

  return class StateProvider extends Component {

    static propTypes = {
      componentsIndex: RPT.object.isRequired
    }

    static childContextTypes = {
      createSetAtomProp: RPT.func,
      resetPropsToDefault: RPT.func,
      selectAtom: RPT.func,
      searchAtoms: RPT.func,
      setAtomProp: RPT.func,
      setSourceBackground: RPT.func,
      toggleProps: RPT.func
    }

    getChildContext() {
      return {
        createSetAtomProp: this.createSetAtomProp.bind(this),
        resetPropsToDefault: this.resetPropsToDefault.bind(this),
        selectAtom: this.selectAtom.bind(this),
        searchAtoms: this.searchAtoms.bind(this),
        setAtomProp: this.setAtomProp.bind(this),
        setSourceBackground: this.setSourceBackground.bind(this),
        toggleProps: this.toggleProps.bind(this)
      }
    }

    state = {
      customProps: Map(),
      selectedAtom: null,
      searchedText: '',
      simplePropsSelected: true,
      sourceBackground: '#ffffff',
      triggeredProps: new List()
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

    createSetAtomProp(key, type, scope = []) {
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
      const {selectedAtom, customProps} = this.state

      if (!selectedAtom) return false

      this.setState({
        customProps: customProps.setIn([selectedAtom].concat(scope).concat(key), value)
      })
    }

    toggleProps() {
      const {simplePropsSelected} = this.state

      this.setState({simplePropsSelected: !simplePropsSelected})
    }

    resetPropsToDefault() {
      const {customProps, selectedAtom} = this.state

      this.setState({
        customProps: {...customProps, [selectedAtom]: {}},
        sourceBackground: '#ffffff'
      })
    }

    selectAtom(selectedAtom) {
      this.setState({selectedAtom})
    }

    searchAtoms(searchedText) {
      this.setState({
        searchedText
      })
    }

    filterComponentsIndex() {
      const {componentsIndex} = this.props
      const {searchedText} = this.state
      const options = {pre: `<bstyle="color:${HIGHLIGHT}">`, post: '</b>'}
      if (`${searchedText}`.length > 0)
        return fuzzyFilter(searchedText.toLowerCase(), Object.keys(componentsIndex))
          .reduce((acc, key) => ({...acc, [key.original]: {...componentsIndex[key.original], highlightedMenu: fuzzyFilter(searchedText.toLowerCase(), [componentsIndex[key.original].menu], options)[0].string}}), {})
      return componentsIndex
    }

    setSourceBackground(color) {
      this.setState({sourceBackground: color})
    }

    render() {
      return <Wrapped {...this.state} {...this.props} componentsIndex={fromJS(this.filterComponentsIndex())} />
    }
  }
}
