import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import PropsTableRow from './PropsTableRow.react';
import spaces from '../styles/Spaces';

@Radium
export default class PropsTable extends Component {

  static propTypes = {
    activeProps: RPT.string,
    componentName: RPT.string,
    componentProps: RPT.object,
    componentPropsDefinition: RPT.object,
    handlePropsNameClick: RPT.func,
    triggeredProps: RPT.object
  }

  render() {
    const {activeProps, componentPropsDefinition, componentName, componentProps, handlePropsNameClick, triggeredProps} = this.props

    if (Object.keys(componentPropsDefinition.toJS()).length === 0)
      return <div style={styles.noProps}>No props defined</div>

    return (
      <div>
        {componentPropsDefinition.map((definition, name) =>
          <PropsTableRow
            activeProps={activeProps}
            componentName={componentName}
            componentProps={componentProps}
            definition={definition}
            handlePropsNameClick={handlePropsNameClick}
            name={name}
            scope={[]}
            triggeredProps={triggeredProps}
          />
        )}
      </div>
    )
  }
}

const styles = {
  noProps: {
    ...font,
    ...font.bold,
    padding: `8px ${spaces.normal}`
  }
}
