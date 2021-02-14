import { createMuiTheme, lighten } from '@material-ui/core/styles'

import VulfMonoRegularWoff from '../fonts/vulf-mono/Vulf-Mono-Regular'
import VulfMonoItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Italic'
import VulfMonoBlackWoff from '../fonts/vulf-mono/Vulf-Mono-Black'
import VulfMonoBlackItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Black-Italic'

export const navy = '#00022e'
export const olive = '#6B6A4E'
export const offwhite = '#edecdd';
export const lightRed = '#ee6562'

const VulfMonoRegular = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    url(data:font/woff;charset=utf-8;base64,${VulfMonoRegularWoff}) format('woff')
  `,
}

const VulfMonoItalic = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'italic',
  fontWeight: 400,
  src: `
    url(data:font/woff;charset=utf-8;base64,${VulfMonoItalicWoff}) format('woff')
  `,
}

const VulfMonoBold = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'bold',
  fontWeight: 700,
  src: `
    url(data:font/woff;charset=utf-8;base64,${VulfMonoBlackWoff}) format('woff')
  `,
}

const VulfMonoBlack = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'bolder',
  fontWeight: 900,
  src: `
    url(data:font/woff;charset=utf-8;base64,${VulfMonoBlackWoff}) format('woff')
  `,
}

const VulfMonoBlackItalic = {
  fontFamily: 'Vulf Mono',
  fontStyle: 'italic',
  fontWeight: 900,
  src: `
    url(data:font/woff;charset=utf-8;base64,${VulfMonoBlackItalicWoff}) format('woff')
  `,
}

export const theme = createMuiTheme({
  palette: {
    primary: { main: navy },
    secondary: { main: olive },
    error: { main: lightRed },
    background: {
      default: offwhite,
      paper: lighten(offwhite, 0.9),
    },
    text: {
      primary: lighten(navy, 0.3),
      secondary: lighten(navy, 0.5),
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
