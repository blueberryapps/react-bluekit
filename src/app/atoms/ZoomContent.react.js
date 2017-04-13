import Component from 'react-pure-render/component';
import font from '../styles/Font';
import Radium from 'radium';
import React from 'react';
import RPT from 'prop-types';
import ReactDOM from 'react-dom';
import * as colors from '../styles/Colors';

@Radium
export default class ZoomContent extends Component {

  static propTypes = {
    children: RPT.node
  }

  state = {
    zoom: 1.0,
    contentWidth: null,
    calculateZoomTimeout: null
  }

  componentWillUnmount() {
    const {calculateZoomTimeout} = this.state
    clearTimeout(calculateZoomTimeout)

    window.removeEventListener('resize', this.calculateZoomAsyncBounded)
  }

  componentDidMount() {
    this.calculateZoomAsyncBounded = this.calculateZoomAsync.bind(this)
    window.addEventListener('resize', this.calculateZoomAsyncBounded)
    this.calculateZoomAsync()
  }

  calculateZoomAsync() {
    const {calculateZoomTimeout} = this.state
    if (calculateZoomTimeout)
      clearTimeout(calculateZoomTimeout)

    this.setState({
      calculateZoomTimeout: setTimeout(() => this.calculateZoom(), 500)
    })
  }

  calculateZoom() {
    const {contentWidth} = this.state
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const content = ReactDOM.findDOMNode(this.refs.content)
    if (!wrapper || !content)
      return

    const wrapperWidth = wrapper.offsetWidth
    const actualContentWidth = contentWidth || content.offsetWidth

    if (wrapperWidth < actualContentWidth)
      this.setState({
        zoom: wrapperWidth / actualContentWidth,
        contentWidth: actualContentWidth
      })
    else
      this.setState({
        zoom: 1.0,
        contentWidth: actualContentWidth
      })
  }

  render() {
    const {children} = this.props
    const {zoom} = this.state

    return (
      <div ref='wrapper' style={[styles.wrapper, zoom !== 1.0 && {zoom}]}>
        {zoom !== 1.0 && <span style={styles.zoom}>{Math.round(zoom * 100)}%</span>}
        <div ref='content' style={styles.content}>
          {children}
        </div>
      </div>
    )
  };

}

const styles = {
  content: {
    position: 'relative',
    display: 'inline-block'
  },

  wrapper: {
    position: 'relative',
    width: '100%',
  },

  zoom: {
    ...font,
    position: 'absolute',
    right: 0,
    top: '-22px',
    zIndex: 500,
    backgroundColor: colors.GRAY,
    padding: '2px 3px 2px 6px',
    opacity: 0.7
  }
}
