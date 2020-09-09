import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import {
  WindowMinimize,
  ChevronDoubleDown,
  ChevronDoubleUp,
  ShapeRectanglePlus,
  ArrowCollapseVertical,
  DotsVertical,
  UnfoldLessHorizontal,
  UnfoldMoreHorizontal,
  ArrowDownThinCircleOutline,
} from 'mdi-material-ui'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FlipToFrontTwoToneIcon from '@material-ui/icons/FlipToFrontTwoTone'
import FlipToBackTwoToneIcon from '@material-ui/icons/FlipToBackTwoTone'
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate'
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete'
import { makeStyles, Theme, FormControl, Box, Typography, ListSubheader, Divider } from '@material-ui/core'

import { COMPONENTS } from '../types'
import { TextField } from './TextField'
import { FormSection } from './FormSection'

const componentOptions = COMPONENTS.map((comp) => ({
  label: comp.type
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' '),
  value: {
    type: comp.type,
    category: comp.category,
    categoryLabel: comp.category
      .split('_')
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(' '),
  },
}))

interface ComponentInputProps {
  move: (index: number, direction: 'up' | 'down') => void
  insert: (index: number) => void
  remove: (index: number) => void
  index: number
  numComponents: number
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
  option: {
    fontWeight: 900,
    fontSize: 16,
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  optionGroupHeader: {
    textTransform: 'uppercase',
    fontWeight: 900,
    letterSpacing: '0.1em',
    fontSize: 12,
    background: 'white',
    top: -theme.spacing(1), // fixes bug
  },
}))

export const ComponentInput: React.FC<ComponentInputProps> = ({ index, insert, remove, move, numComponents }) => {
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <FormSection>
      <Autocomplete
        fullWidth
        renderOption={(props) => (
          <Typography variant="body1" className={classes.option}>
            {props.label}
          </Typography>
        )}
        options={componentOptions}
        groupBy={(option) => option.value.categoryLabel}
        renderGroup={(params: AutocompleteRenderGroupParams) => (
          <React.Fragment>
            <ListSubheader className={classes.optionGroupHeader} key={params.key}>
              {params.group}
            </ListSubheader>
            {params.children}
          </React.Fragment>
        )}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, selected) => option.value.type === selected.value.type}
        renderInput={(params) => <TextField {...params} label="Component" variant="outlined" />}
      />
      <TextField label="Description" variant="outlined" fullWidth />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
            <IconButton className={classes.buttonLeft} size="small" onClick={() => setCollapsed(!collapsed)}>
              {/* <ArrowCollapseVertical /> */}
              {collapsed && <UnfoldMoreHorizontal />}
              {!collapsed && <UnfoldLessHorizontal />}
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem className={classes.buttonLeft} />
          <Tooltip title="Move Up">
            <IconButton
              disabled={index === 0}
              className={classes.buttonLeft}
              size="small"
              onClick={() => move(index, 'up')}
            >
              <ArrowDownThinCircleOutline className={classes.rotate180} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Move Down">
            <IconButton
              disabled={index + 1 >= numComponents}
              className={classes.buttonLeft}
              size="small"
              onClick={() => move(index, 'down')}
            >
              <ArrowDownThinCircleOutline />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem className={classes.buttonLeft} />
          <Tooltip title="Insert After">
            <IconButton className={classes.buttonLeft} size="small" onClick={() => insert(index)}>
              <ShapeRectanglePlus />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton className={classes.buttonLeft} size="small" onClick={() => remove(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Delete">
            <IconButton className={classes.buttonRight} size="small" onClick={() => {}}>
              <DotsVertical />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </FormSection>
  )
}
