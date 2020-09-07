import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
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
