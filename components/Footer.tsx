import { makeStyles, Theme, Box, Typography, Link, lighten } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderTop: `1px solid ${lighten(theme.palette.primary.main, 0.66)}`,
    padding: theme.spacing(3, 1, 8),
    marginTop: theme.spacing(4),
  },
  text: {
    fontStyle: 'italic',
    textTransform: 'lowercase',
  },
  copyright: {
      marginTop: theme.spacing(2),
  }
}))

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography className={classes.text} component="footer" variant="caption">
        I built this website to try distract myself from building more bikes...
        <Box className={classes.copyright}>Copyright © {new Date().getFullYear()}, <Link href="https://www.instagram.com/sdstanfield/">Dylan Stanfield</Link></Box>
      </Typography>
    </Box>
  )
}


