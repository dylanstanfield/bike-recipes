import MuiFormControl, { FormControlProps } from '@material-ui/core/FormControl'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginBottom: theme.spacing(4),
  },
}))

export const FormControl: React.FC<FormControlProps> = ({ children, ...rest }) => {
  const classes = useStyles()
  return (
    <MuiFormControl fullWidth className={classes.formControl} {...rest}>
      {children}
    </MuiFormControl>
  )
}
