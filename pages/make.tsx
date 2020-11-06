import { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid'
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
    marginTop: theme.spacing(4),
    textTransform: 'lowercase',
    padding: theme.spacing(1.5),
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
        Fill in the boxes below to generate an image of your bike build that ya can share with friends or add to the
        family cookbook.
      </Typography>

      <Typography className={classes.label} component="label" variant="body1">
        Subject
      </Typography>
      <TextField margin="normal" label="Name" variant="outlined" fullWidth />
      <TextField margin="normal" label="Description" variant="outlined" fullWidth multiline rows={3} />

      <Typography className={classes.label} component="label" variant="body1">
        Part List
      </Typography>
      <Typography className={classes.sublabel} component="aside" variant="body2">
        Suggestions for parts are based on what other people have listed, but write whatever ya want.
      </Typography>
      {parts.map(({ id }, index) => (
        <PartInput key={id} index={index} />
      ))}
      <Button
        className={classes.addPartButton}
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<Plus />}
        onClick={() => insert(parts.length - 1)}
      >
        Add Another
      </Button>
    </Fragment>
  )
}

export default MakePage
