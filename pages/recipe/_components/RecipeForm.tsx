import { Fragment } from 'react'
import { makeStyles, Theme, TextField, Button, Typography, FormControlLabel, Checkbox, Box, useTheme, useMediaQuery } from '@material-ui/core'
import { Plus, Download, Creation } from 'mdi-material-ui'

import { PartInput } from './PartInput'
import { useStore } from './useStore'
import { Preview } from './Preview'

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
  error: {
    marginTop: theme.spacing(1),
  },
}))

export const RecipeForm = () => {
  const classes = useStyles()

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const store = useStore()

  return (
    <Fragment>
      <Typography className={classes.title} component="aside" variant="body2">
        Fill in the boxes below to generate an image of your bike build to share with friends.
      </Typography>

      <Typography className={classes.label} component="label" variant="body1">
        Subject
      </Typography>
      <TextField value={store.name} onChange={(e) => store.updateName(e.target.value ?? '')} margin="normal" label="Name" variant="outlined" fullWidth />
      <TextField value={store.description} onChange={(e) => store.updateDescription(e.target.value ?? '')} margin="normal" label="Description" variant="outlined" fullWidth multiline rows={3} rowsMax={6} />

      <Typography className={classes.label} component="label" variant="body1">
        Part List
      </Typography>
      <Typography className={classes.sublabel} component="aside" variant="body2">
        Suggestions for parts are based on what other people have listed, but write whatever you'd like.
      </Typography>
      {store.parts.map(({ id }, index) => (
        <PartInput key={id} index={index} />
      ))}
      <Box marginRight={isLargeScreen ? '50%' : 0}>
        <Button
          fullWidth
          className={classes.addPartButton}
          variant="contained"
          startIcon={<Plus />}
          onClick={() => store.insertPart(store.parts.length - 1)}
        >
          Add Part
        </Button>
      </Box>

      <Box marginTop={4}>
        <FormControlLabel
          control={<Checkbox checked={store.public} onChange={() => store.togglePublic()} name="checkedA" />}
          label="Public"
        />
        <Typography component="aside" variant="body2">
          Allow <span style={{ fontStyle: 'italic' }}>bike recipes</span> to share this list to other bike enthusiast for inspiration.
        </Typography>
      </Box>

      <Box marginTop={4} marginRight={isLargeScreen ? '50%' : 0}>
        <Button
          fullWidth
          className={classes.addPartButton}
          variant="contained"
          color="secondary"
          startIcon={<Creation />}
          onClick={() => store.submit()}>
          Make Recipe
        </Button>
      </Box>
      {store.errors.isPartsEmpty && !store.pristine && (
        <Typography className={classes.error} color="error" component="aside" variant="body2">
          Add some parts to create a recipe.
        </Typography>
      )}
      {store.url && (
          <Fragment>
              <Typography className={classes.label} component="label" variant="body1">
                Fresh Bike Recipe!
              </Typography>
              <Preview />
              <Box marginRight={isLargeScreen ? '50%' : 0}>
                <Button
                  fullWidth
                  className={classes.addPartButton}
                  variant="contained"
                  color="secondary"
                  startIcon={<Download />}
                  href={store.url}
                  download="recipe.png">
                  Download Image
              </Button>
              </Box>
          </Fragment>
      )}
    </Fragment>
  )
}
