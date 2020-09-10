import Box, { BoxProps } from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    border: '1px solid #c3c3c3',
    borderRadius: 5,
    marginBottom: theme.spacing(2),
    background: 'white',
  },
}))

export const FormSection: React.FC<BoxProps> = ({ children }) => {
  const classes = useStyles()
  return <Box className={classes.container}>{children}</Box>
}
