import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    marginBottom: theme.spacing(1.5),
  },
  label: {
    fontWeight: 900,
    textTransform: 'uppercase',
    fontSize: 14,
    letterSpacing: '0.1em',
    background: 'white',
    paddingRight: theme.spacing(0.5),
  },
}))

export const TextField: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles()
  const { InputProps, ...rest } = props

  return (
    <MuiTextField
      {...rest}
      size="small"
      className={classes.input}
      InputLabelProps={{ className: classes.label }}
      InputProps={{ style: { fontWeight: 900, fontSize: '16px' }, ...InputProps }}
    />
  )
}
