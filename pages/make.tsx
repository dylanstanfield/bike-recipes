import { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { makeStyles, Theme, TextField, Button, Typography } from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

import { ComponentInput } from '../components/ComponentInput'
import { useComponentStore } from '../hooks/useComponentStore'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  label: {
    marginTop: theme.spacing(4),
    display: 'block',
  },
  addComponentButton: {
    marginTop: theme.spacing(4),
    textTransform: 'lowercase',
    padding: theme.spacing(1.5),
    fontStyle: 'italic',
  },
}))

const MakePage = () => {
  const classes = useStyles()

  const components = useComponentStore((state) => state.components)
  const insert = useComponentStore((state) => state.insert)

  return (
    <Fragment>
      <Typography className={classes.title} component="aside" variant="body2">
        Fill in the boxes below to generate an image of your bike build that ya can share with friends or pass down to
        your children.
      </Typography>

      <Typography className={classes.label} component="label" variant="body1">
        Build
      </Typography>
      <TextField margin="normal" label="Name" variant="outlined" fullWidth />
      <TextField margin="normal" label="Description" variant="outlined" fullWidth multiline rows={3} />

      <Typography className={classes.label} component="label" variant="body1">
        Components
      </Typography>
      {components.map(({ id }, index) => (
        <ComponentInput key={id} index={index} />
      ))}
      <Button
        className={classes.addComponentButton}
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<Plus />}
        onClick={() => insert(components.length - 1)}
      >
        Add Component
      </Button>
    </Fragment>
  )
}

export default MakePage
