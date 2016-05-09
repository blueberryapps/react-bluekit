import font from './Font';
import * as colors from './Colors';

export default {
  ...font,
  ...font.size.medium,
  color: colors.BLACK_BRIGHT,
  marginTop: 0,
  marginBottom: 0,
  lineHeight: '1.4',
  preview: {
    marginBottom: '30px'
  },

  allComponents: {
    display: 'inline',
    borderBottom: `1px solid ${colors.BLACK_BRIGHT}`,
    ':hover': {
      cursor: 'pointer'
    }
  }
}
