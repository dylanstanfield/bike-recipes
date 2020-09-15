import { createMuiTheme, lighten, darken } from '@material-ui/core/styles'

const olive = '#6B6A4E'
const lightOlive = '#B8B574'
const blue = '#59656B'
const lightRed = '#B87D83'

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
      default: lighten(lightOlive, 0.75),
      paper: lighten(lightOlive, 0.9),
    },
    text: {
      primary: darken(blue, 0.2),
      secondary: lighten(blue, 0.2),
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 900,
      textTransform: 'uppercase',
      fontSize: 36,
    },
  },
  overrides: {
    // MuiFormControlLabel: {
    //   label: {
    //     fontWeight: 900,
    //   },
    // },
  },
})
