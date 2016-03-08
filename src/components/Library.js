import Header from './Header';
import HighlightStyle from './HighlightStyle';
import List from './List';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import Sidebar from './Sidebar';
import componentsIndex from '../componentsIndex';

class Library extends Component {

  static childContextTypes = {
    componentsIndex: RPT.object
  }

  static propTypes = {
    children: RPT.object,
    mountPoint: RPT.string
  }

  getChildContext() {
    return {
      componentsIndex
    };
  }

  render() {
    const {children, mountPoint} = this.props

    return (
      <div className='component-library' style={styles.wrapper}>
        <Header mountPoint={mountPoint} />
        <div style={styles.mainContainer}>
          <Sidebar
            componentsIndex={componentsIndex}
            mountPoint={mountPoint}
          />
          <div style={styles.content}>
            {children || this.renderList()}
          </div>
        </div>
        <HighlightStyle />
      </div>
    );
  }

  renderList() {
    const {mountPoint} = this.props

    return (
      <List componentsIndex={componentsIndex} mountPoint={mountPoint} />
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },

  mainContainer: {
    backgroundColor: 'hsl(0, 0%, 100%)',
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'horizontal',
  },

  content: {
    flex: '1 1 0',
    overflow: 'auto',
  },
};

export default Radium(Library)
