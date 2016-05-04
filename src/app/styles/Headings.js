import font from './Font';
import * as colors from './Colors';

export default {
  ...font,
  ...font.size.medium,
  color: colors.BLACK_BRIGHT,
  marginTop: 0,
  marginBottom: 0,
  preview: {
    marginBottom: '30px'
  },
  allComponents: {
    display: 'inline-block',
    marginBottom: '20px',
    borderBottom: `1px solid ${colors.BLACK_BRIGHT}`,
    ':hover': {
      cursor: 'pointer'
    }
  }
}
