import font from './Font';
import * as colors from './Colors';

export default {
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '0 0 0 15px',
    first: {
      padding: 0
    }
  },

  link: {
    ...font,
    padding: '8px 18px',
    fontSize: '13px',
    color: colors.BLACK_BRIGHT,
    display: 'block',
    textDecoration: 'none',
    transition: 'all .1s ease-out',
    position: 'relative',
    ':hover': {
      backgroundColor: colors.GRAY_DARKER,
      cursor: 'pointer'
    },
    overview: {
      padding: '10px 20px 10px 30px'
    }
  },

  iconWrapper: {
    marginRight: '8px',
    display: 'inline-block',
    position: 'relative',
    top: '-1px'
  },

  icon: {
    transition: 'transform .1s linear',
    closed: {
      transform: 'rotate(-90deg)'
    }
  },

  sidebarLinkActive: {
    backgroundColor: colors.GRAY
  }
}
