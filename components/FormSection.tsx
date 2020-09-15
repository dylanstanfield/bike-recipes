import { Paper, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    borderRadius: 5,
    marginBottom: theme.spacing(2),
    background: theme.palette.background.paper,
  },
}))

export const FormSection: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper variant="outlined" className={classes.container}>
      {children}
    </Paper>
  )
}
