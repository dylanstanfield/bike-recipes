import { createMuiTheme, lighten, darken } from '@material-ui/core/styles'

import VulfMonoRegularWoff from '../fonts/vulf-mono/Vulf-Mono-Regular.woff'
import VulfMonoItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Italic.woff'
import VulfMonoBlackWoff from '../fonts/vulf-mono/Vulf-Mono-Black.woff'
import VulfMonoBlackItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Black-Italic.woff'

// const olive = '#3b4318'
// const olive = '#4b554c'
const olive = '#6B6A4E'
// const olive = lighten('#6B6A4E', 0)
const lightOlive = '#B8B574'
const blue = '#59656B'
const lightRed = '#B87D83'

const VulfMonoRegular = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    url(${VulfMonoRegularWoff}) format('woff')
  `,
}

const VulfMonoItalic = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'italic',
  fontWeight: 400,
  src: `
    url(${VulfMonoItalicWoff}) format('woff')
  `,
}

const VulfMonoBold = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'bold',
  fontWeight: 700,
  src: `
    url(${VulfMonoBlackWoff}) format('woff2')
  `,
}

const VulfMonoBlack = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'bolder',
  fontWeight: 900,
  src: `
    url(${VulfMonoBlackWoff}) format('woff2')
  `,
}

const VulfMonoBlackItalic = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'italic',
  fontWeight: 900,
  src: `
    url(${VulfMonoBlackItalicWoff}) format('woff2')
  `,
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: olive,
    },
    secondary: {
      main: darken('#4C5669', 0.5),
    },
    error: {
      main: lightRed,
    },
    background: {
      default: '#edecdd',
      paper: lighten(lightOlive, 0.9),
    },
    text: {
      primary: darken(blue, 0.2),
      secondary: lighten(blue, 0.2),
    },
  },
  typography: {
    fontFamily: 'Vulf Mono, Courier New, Courier, monospace',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [VulfMonoRegular, VulfMonoItalic, VulfMonoBold, VulfMonoBlack, VulfMonoBlackItalic],
      },
    },
  },
})
