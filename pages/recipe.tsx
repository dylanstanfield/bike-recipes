import { Fragment } from 'react'
import { makeStyles, Theme, TextField, Button, Typography, FormControlLabel, Checkbox, Box, useTheme, useMediaQuery } from '@material-ui/core'
import { Plus, Send } from 'mdi-material-ui'

import { PartInput } from '../components/PartInput'
import { usePartStore } from '../hooks/usePartStore'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  label: {
    marginTop: theme.spacing(4),
    display: 'block',
  },
  sublabel: {
    margin: theme.spacing(2, 0, 1),
  },
  addPartButton: {
    margin: theme.spacing(2, 0, 1),
    textTransform: 'lowercase',
    padding: theme.spacing(1.5, 2),
    fontStyle: 'italic',
  },
}))

const RecipePage = () => {
  const classes = useStyles()

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const parts = usePartStore((state) => state.parts)
  const insert = usePartStore((state) => state.insert)

  return (
    <Fragment>
      <Typography className={classes.title} component="aside" variant="body2">
        Fill in the boxes below to generate an image of your bike build to share with friends.
      </Typography>

      <Typography className={classes.label} component="label" variant="body1">
        Subject
      </Typography>
      <TextField margin="normal" label="Name" variant="outlined" fullWidth />
      <TextField margin="normal" label="Description" variant="outlined" fullWidth multiline rows={3} rowsMax={6} />

      <Typography className={classes.label} component="label" variant="body1">
        Part List
      </Typography>
      <Typography className={classes.sublabel} component="aside" variant="body2">
        Suggestions for parts are based on what other people have listed, but write whatever you'd like.
      </Typography>
      {parts.map(({ id }, index) => (
        <PartInput key={id} index={index} />
      ))}
      <Box marginRight={isLargeScreen ? '50%' : 0}>
        <Button
          fullWidth
          className={classes.addPartButton}
          variant="contained"
          startIcon={<Plus />}
          onClick={() => insert(parts.length - 1)}
        >
          Add Part
        </Button>
      </Box>

      <Box marginTop={4}>
        <FormControlLabel
          control={<Checkbox checked={false} onChange={() => {}} name="checkedA" />}
          label="Public"
        />
        <Typography component="aside" variant="body2">
          Allow <span style={{ fontStyle: 'italic' }}>bike recipes</span> to share this list to other bike enthusiast for inspiration.
        </Typography>
      </Box>

      <Box marginTop={2}>
        <FormControlLabel
          control={<Checkbox checked={false} onChange={() => {}} name="checkedA" />}
          label="Editable"
        />
        <Typography component="aside" variant="body2">
          Saves this list so that you can change things later, will create a link for you to hang on to.
        </Typography>
      </Box>

      <Box marginTop={4} marginRight={isLargeScreen ? '50%' : 0}>
        <Button
          fullWidth
          className={classes.addPartButton}
          variant="contained"
          color="secondary"
          startIcon={<Send />}
          onClick={() => insert(parts.length - 1)}
        >
          Make Recipe
        </Button>
      </Box>

    </Fragment>
  )
}

export default RecipePage
