import Component from 'react-pure-render/component';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';

class Heading extends Component {

  static propTypes = {
    centered:        RPT.bool,
    children:        RPT.any.isRequired,
    decorated:       RPT.bool,
    decorationColor: RPT.string,
    inheritedStyle:  RPT.oneOfType([RPT.object, RPT.array]),
    kind:            RPT.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']).isRequired,
    noMargin:        RPT.bool,
    thin:            RPT.bool,
    withSubheading:  RPT.bool
  }

  static defaultProps = {
    decorated: true
  }

  render() {
    const {
      kind: Element,
      centered,
      children,
      decorated,
      decorationColor,
      inheritedStyle,
      noMargin,
      thin,
      withSubheading
    } = this.props;
    const decorationColorStyle = {backgroundColor: decorationColor};

    const text = typeof children === 'string'
      ? <span dangerouslySetInnerHTML={{__html: children}} />
      : children;

    return (
      <Element
        style={[
          styles.base,
          styles[Element],
          centered && styles.centered,
          thin && styles.thin,
          noMargin && styles.noMargin,
          withSubheading && styles.withSubheading,
          inheritedStyle
        ]}
      >
        {text}
        {decorated &&
          <div style={[
            styles.decoration.base,
            styles.decoration[`${Element}`],
            decorationColor && decorationColorStyle
          ]}
          />
        }
      </Element>
    );
  }
}

function superDecorator(options) {
  return (component) => component
}

export default superDecorator({})(Radium(Heading))

const styles = {
  base: {
    color: 'hsl(0, 0%, 20%)',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '1',
    margin: '.4em 0'
  },

  h1: {
    fontSize: '55px',
    fontWeight: '100'
  },

  h2: {
    fontSize: '50px',
    fontWeight: '700'
  },

  h3: {
    fontSize: '26px',
    fontWeight: '700',
  },

  h4: {
    fontSize: '22px',
    fontWeight: '300',
    paddingTop: '30px',
    paddingBottom: '15px'
  },

  h5: {
    fontSize: '18px',
    fontWeight: '700',
    paddingTop: '15px',
    paddingBottom: '10px'
  },

  centered: {
    textAlign: 'center'
  },

  decoration: {
    base: {
      backgroundColor: 'hsl(50, 100%, 50%)',
      display: 'block',
      lineHeight: 'inherit',
      marginTop: '.5em',
      minWidth: '12%',
      maxWidth: '24%',
      width: '48px'
    },
    h1: {height: '5px'},
    h2: {height: '4px'},
    h3: {height: '3px'},
    h4: {height: '2px'},
    h5: {height: '2px'}
  },

  thin: {
    fontWeight: '100'
  },

  noMargin: {
    margin: 0
  },

  withSubheading: {
    margin: '1em 0 0'
  }
};
