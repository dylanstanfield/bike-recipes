import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField'
import { makeStyles, Theme } from '@material-ui/core'

interface StyleProps {
  disableMarginBottom?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  input: {
    marginBottom: ({ disableMarginBottom }) => theme.spacing(disableMarginBottom ? 0 : 2),
  },
  label: {
    textTransform: 'uppercase',
    fontSize: 14,
    letterSpacing: '0.1em',
    background: theme.palette.background.paper,
    paddingRight: theme.spacing(0.5),
  },
}))

export const TextField: React.FC<TextFieldProps & StyleProps> = (props) => {
  const classes = useStyles({ disableMarginBottom: props.disableMarginBottom })
  const { InputProps, ...rest } = props

  return (
    <MuiTextField
      {...rest}
      size="small"
      className={classes.input}
      InputLabelProps={{ className: classes.label }}
      InputProps={{ style: { fontSize: '16px', lineHeight: 1.4 }, ...InputProps }}
    />
  )
}
