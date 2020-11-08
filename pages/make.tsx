import { Fragment } from 'react'
import { makeStyles, Theme, TextField, Button, Typography } from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

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
    display: 'block',
  },
  addPartButton: {
    marginTop: theme.spacing(2),
    textTransform: 'lowercase',
    padding: theme.spacing(1.5, 2),
    fontStyle: 'italic',
  },
}))

const MakePage = () => {
  const classes = useStyles()

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
      <Button
        className={classes.addPartButton}
        variant="outlined"
        startIcon={<Plus />}
        onClick={() => insert(parts.length - 1)}
      >
        Add Another
      </Button>
    </Fragment>
  )
}

export default MakePage
