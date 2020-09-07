import { makeStyles, Theme } from '@material-ui/core/styles'
import MuiFormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontWeight: 900,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: theme.spacing(2),
  },
}))

export const FormLabel: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <MuiFormLabel component="label" className={classes.label}>
      {children}
    </MuiFormLabel>
  )
}
