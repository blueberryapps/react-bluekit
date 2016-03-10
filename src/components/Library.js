import ComponentDetail from './Component';
import Header from './Header';
import HighlightStyle from './HighlightStyle';
import List from './List';
import Radium from 'radium';
import React, {Component, PropTypes as RPT} from 'react';
import Sidebar from './Sidebar';

@Radium
export default class Library extends Component {

  static propTypes = {
    componentsIndex: RPT.object.isRequired,
    inline: RPT.bool,
    mountPoint: RPT.string,
  }

  state = {
    selectedAtom: null
  }

  selectAtom(selectedAtom) {
    this.setState({selectedAtom})
  }

  render() {
    const {componentsIndex, inline} = this.props
    const {selectedAtom} = this.state

    return (
      <div className='component-library' style={inline ? styles.wrapper.inline : styles.wrapper.fullPage}>
        <Header />
        <div style={styles.mainContainer}>
          <Sidebar
            componentsIndex={componentsIndex}
            selectAtom={this.selectAtom.bind(this)}
            selectedAtom={selectedAtom}
          />
          <div style={styles.content}>
            {selectedAtom ? this.renderAtom() : this.renderList()}
          </div>
        </div>
        <HighlightStyle />
      </div>
    );
  }

  renderAtom() {
    const {componentsIndex} = this.props
    const {selectedAtom} = this.state

    return (
      <ComponentDetail
        componentsIndex={componentsIndex}
        selectedAtom={selectedAtom}
      />
    );
  }

  renderList() {
    const {componentsIndex} = this.props
    const {selectedAtom} = this.state

    return (
      <List
        componentsIndex={componentsIndex}
        selectAtom={this.selectAtom.bind(this)}
        selectedAtom={selectedAtom}
      />
    );
  }
}

const styles = {
  wrapper: {
    fullPage: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    inline: {
      flexDirection: 'column'
    }
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
