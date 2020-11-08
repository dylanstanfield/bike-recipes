import { makeStyles, Theme, Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderBottom: `3px solid ${theme.palette.error.main}`,
  },
  title: {
    textTransform: 'lowercase',
    fontStyle: 'italic',
  }
}))

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container} paddingY={3}>
      <Typography className={classes.title} component="h1" variant="body1">
        Bike Recipes
      </Typography>
    </Box>
  )
}


