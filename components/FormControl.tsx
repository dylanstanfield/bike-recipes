import MuiFormControl, { FormControlProps } from '@material-ui/core/FormControl'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1, 0),
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
