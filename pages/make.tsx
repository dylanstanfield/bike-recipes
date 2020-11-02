import { Fragment, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { makeStyles, Theme, TextField, Button, Typography } from '@material-ui/core'
import { Plus } from 'mdi-material-ui'

import { ComponentInput } from '../components/ComponentInput'
import { useComponents } from '../hooks/useComponents'

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

  const { components, insert } = useComponents()

  console.log(components)

  return (
    <Fragment>
      <Typography className={classes.title} component="h2" variant="body1">
        Make a bike recipe
      </Typography>
      <Typography className={classes.title} component="aside" variant="body2">
        Fill in the boxes below to generate an image of yer bike build thatcha can share with friends.
      </Typography>

      <Typography className={classes.label} component="label" variant="body1">
        Build
      </Typography>
      <TextField margin="normal" label="Name" variant="outlined" fullWidth />
      <TextField margin="normal" label="Description" variant="outlined" fullWidth multiline rows={3} />

      <Typography className={classes.label} component="label" variant="body1">
        Components
      </Typography>
      {components.map((component, index) => (
        <ComponentInput key={component.id} component={component} index={index} length={components.length} />
      ))}
      <Button
        className={classes.addComponentButton}
        fullWidth
        variant="outlined"
        startIcon={<Plus />}
        onClick={() => insert(components.length - 1)}
      >
        Add Component
      </Button>
    </Fragment>
  )
}

export default MakePage
