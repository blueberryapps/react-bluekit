export const colors = {
  primary: '#6dae0d',
  secondary: 'blue',
  error: '#ff1744',
  black: 'hsl(0, 0%, 0%)',
  grayDarker: 'hsl(0, 0%, 15%)',
  grayDark: 'hsl(0, 0%, 30%)',
  gray: 'hsl(0, 0%, 50%)',
  grayLight: 'hsl(0, 0%, 70%)',
  grayLighter: 'hsl(0, 0%, 85%)',
  white: 'hsl(0, 0%, 100%)',
  border: 'hsl(0, 0%, 60%)',
  text: {
    primary: 'hsl(0, 0%, 25%)',
    secondary: 'hsl(0, 0%, 50%)'
  }
};

export const button = {
  base: {
    display: 'inline-block',
    backgroundColor: '#909090',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    padding: '13px 22px',
    margin: '10px 10px 0 0',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    borderRadius: 0,
    outline: 'none',
    cursor: 'pointer',
    transition: 'background-color .2s, color .2s'
  },

  kind: {
    primary: {
      backgroundColor: '#6dae0d',
      ':hover': {
        backgroundColor: '#3d9e0d'
      }
    },

    secondary: {
      backgroundColor: colors.gray,
      ':hover': {
        backgroundColor: colors.grayDark
      }
    },

    outlined: {
      backgroundColor: colors.white,
      color: colors.black,
      borderWidth: '1px',
      borderStyle: 'dashed',
      borderColor: colors.gray,
      borderRadius: '5px',
      ':hover': {
        backgroundColor: colors.grayLight,
        color: colors.white,
        borderStyle: 'solid',
        borderColor: colors.grayLight
      }
    }
  },

  size: {
    small: {
      padding: '10px 18px',
      fontSize: '14px'
    },

    large: {
      padding: '25px 30px',
      fontSize: '18px'
    }
  },

  fullWidth: {
    width: '100%'
  }
}

export const form = {
  input: {
    base: {
      fontWeight: '300',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'hsl(0, 0%, 80%)',
      outline: 'none',
      WebkitAppearance: 'none',
      borderRadius: 0,
      transition: 'border-color .2s',
      ':focus': {
        borderColor: 'hsl(0, 0%, 40%)'
      }
    },
    size: {
      regular: {
        height: '50px',
        padding: '0 20px',
        fontSize: '16px',
        '@media (max-width: 480px)': {
          height: '40px'
        }
      },
      large: {
        fontSize: '18px',
        padding: '20px 20px',
        '@media (max-width: 480px)': {
          padding: '10px 15px',
          fontSize: '15px'
        }
      }
    }
  },

  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'hsl(0, 0%, 30%)'
  },

  hint: {
    fontSize: '14px',
    color: 'hsl(0, 0%, 40%)'
  },

  textArea: {
    fontSize: '18px',
    fontWeight: '300',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d4d4d4',
    outline: 'none',
    padding: '20px 20px',
    WebkitAppearance: 'none',
    borderRadius: 0
  }
}

export const clearfix = {
  clear: 'both'
}
