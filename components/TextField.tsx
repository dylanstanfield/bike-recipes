import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}))

export const TextField: React.FC<TextFieldProps> = (props) => {
  const classes = useStyles()
  const { InputProps, ...rest } = props

  return (
    <MuiTextField
      className={classes.input}
      size="small"
      {...rest}
      InputProps={{ style: { fontWeight: 900, fontSize: '14px' }, ...InputProps }}
    />
  )
}
