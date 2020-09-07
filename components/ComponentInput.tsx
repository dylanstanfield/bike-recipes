import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FlipToFrontTwoToneIcon from '@material-ui/icons/FlipToFrontTwoTone'
import FlipToBackTwoToneIcon from '@material-ui/icons/FlipToBackTwoTone'
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles, Theme, FormControl, Box, Typography } from '@material-ui/core'

import { COMPONENTS } from '../types'
import { TextField } from './TextField'

const componentOptions = COMPONENTS.map((comp) => ({
  label: comp
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' '),
  value: comp,
}))

interface ComponentInputProps {
  insert: (index: number) => void
  remove: (index: number) => void
  index: number
}

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    textTransform: 'uppercase',
    fontWeight: 900,
    letterSpacing: '0.1em',
    fontSize: 12,
    paddingRight: theme.spacing(4),
  },
  buttonLeft: {
    marginRight: theme.spacing(1),
  },
  buttonRight: {
    marginLeft: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(2, 2, 2, 2),
    border: '1px solid #c3c3c3',
    borderRadius: 5,
    marginBottom: theme.spacing(3),
    background: 'white',
  },
  option: {
    textTransform: 'uppercase',
    fontWeight: 900,
    letterSpacing: '0.1em',
    fontSize: 12,
  },
}))

export const ComponentInput: React.FC<ComponentInputProps> = ({ index, insert, remove }) => {
  const classes = useStyles()

  const onInsertBefore = () => {
    insert(index - 1)
  }

  const onInsertAfter = () => {
    insert(index)
  }

  return (
    <FormControl className={classes.container}>
      <Autocomplete
        fullWidth
        renderOption={(props) => (
          <Typography variant="body1" className={classes.option}>
            {props.label}
          </Typography>
        )}
        options={componentOptions}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, selected) => option.value === selected.value}
        renderInput={(params) => <TextField {...params} size="small" variant="outlined" />}
      />
      <TextField size="small" variant="outlined" fullWidth />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Tooltip title="Move Up">
            <IconButton className={classes.buttonLeft} size="small" color="primary" onClick={() => {}}>
              <FlipToFrontTwoToneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Move Down">
            <IconButton className={classes.buttonLeft} size="small" color="primary" onClick={() => {}}>
              <FlipToBackTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Add After">
            <IconButton className={classes.buttonRight} size="small" onClick={onInsertAfter}>
              <ControlPointDuplicateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton className={classes.buttonRight} size="small" onClick={() => remove(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </FormControl>
  )
}
