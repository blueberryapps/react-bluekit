import React, {Component, PropTypes as RPT} from 'react';
import {fromJS} from 'immutable';

export default function StateProvider(Wrapped) {

  return class Page extends Component {

    static propTypes = {
    }

    static childContextTypes = {
      createSetAtomProp: RPT.func,
      selectAtom: RPT.func,
      setAtomProp: RPT.func,
      toggleProps: RPT.func,
      resetPropsToDefault: RPT.func,
    }

    getChildContext() {
      return {
        createSetAtomProp: this.createSetAtomProp.bind(this),
        selectAtom: this.selectAtom.bind(this),
        setAtomProp: this.setAtomProp.bind(this),
        toggleProps: this.toggleProps.bind(this),
        resetPropsToDefault: this.resetPropsToDefault.bind(this),
      }
    }

    state = {
      customProps: {},
      selectedAtom: null,
      simplePropsSelected: true
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
        else if (type === 'shape' || type === 'arrayOf')
          value = JSON.parse(value)

        this.setAtomProp(key, value, scope)
      }
    }

    setAtomProp(key, value, scope = []) {
      const {selectedAtom, customProps} = this.state

      if (!selectedAtom) return false

      this.setState({
        customProps: fromJS(customProps).setIn([selectedAtom].concat(scope).concat(key), value).toJS()
      })
    }

    toggleProps() {
      const {simplePropsSelected} = this.state

      this.setState({simplePropsSelected: !simplePropsSelected})
    }

    resetPropsToDefault() {
      const {customProps, selectedAtom} = this.state

      this.setState({
        customProps: {...customProps, [selectedAtom]: {}}
      })
    }

    selectAtom(selectedAtom) {
      this.setState({selectedAtom})
    }

    render() {
      return <Wrapped {...this.state} {...this.props} />
    }
  }
}
