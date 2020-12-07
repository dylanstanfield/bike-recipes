import { createMuiTheme, lighten } from '@material-ui/core/styles'

import VulfMonoRegularWoff from '../fonts/vulf-mono/Vulf-Mono-Regular.woff'
import VulfMonoItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Italic.woff'
import VulfMonoBlackWoff from '../fonts/vulf-mono/Vulf-Mono-Black.woff'
import VulfMonoBlackItalicWoff from '../fonts/vulf-mono/Vulf-Mono-Black-Italic.woff'

export const navy = '#00022e'
export const olive = '#6B6A4E'
export const offwhite = '#edecdd';
export const lightRed = '#ee6562'

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
