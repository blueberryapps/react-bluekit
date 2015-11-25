import Component from 'react-pure-render/component';
import Icon from './Icon.react';
import Radium from 'radium';
import React from 'react';
import ReactTooltip from 'rc-tooltip';

const styles = {
  tooltipIcon: {
    width: '24px',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '5px',
    ':hover': {
    }
  }
};

@Radium
export default class Tooltip extends Component {

  static propTypes = {
    tooltip:  React.PropTypes.string.isRequired
  }

  render() {
    const {tooltip} = this.props;
    const iconColor = Radium.getState(this.state, 'tooltip-icon', ':hover')
      ? 'hsl(0, 70%, 50%)' : 'hsl(0, 0%, 50%)';

    if (!tooltip) return null;

    return (
      <ReactTooltip
        overlay={<span>{tooltip}</span>}
        overlayStyle={{width: '200px'}}
        placement='top'
        trigger={['hover']}
      >
        <div key='tooltip-icon' style={styles.tooltipIcon}>
          <Icon color={iconColor} kind='star' size='26px' />
        </div>
      </ReactTooltip>
    );
  }
}
