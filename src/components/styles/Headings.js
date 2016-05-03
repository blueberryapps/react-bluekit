import font from './Font';
import * as colors from './Colors';

export default {
  ...font,
  ...font.size.medium,
  color: colors.BLACK_BRIGHT,
  marginTop: 0,
  marginBottom: '10px',
  preview: {
    marginBottom: '30px'
  }
}
