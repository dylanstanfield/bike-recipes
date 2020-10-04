import { makeStyles, Theme } from '@material-ui/core/styles'
import MuiFormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    paddingBottom: theme.spacing(2),
    display: 'block',
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
