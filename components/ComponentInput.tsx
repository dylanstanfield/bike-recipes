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
  LockOpenOutline,
  LockOutline,
  LockOpenVariantOutline,
} from 'mdi-material-ui'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FlipToFrontTwoToneIcon from '@material-ui/icons/FlipToFrontTwoTone'
import FlipToBackTwoToneIcon from '@material-ui/icons/FlipToBackTwoTone'
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate'
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete'
import { makeStyles, Theme, FormControl, Box, Typography, ListSubheader, Divider } from '@material-ui/core'

import { Component, COMPONENTS } from '../types'
import { TextField } from './TextField'
import { FormSection } from './FormSection'

interface ComponentOption {
  label: string
  value: Component & { categoryLabel: string }
}

const initialComponentOption: ComponentOption = {
  label: '',
  value: { category: 'drivetrain', type: '', categoryLabel: '' },
}

const componentOptions = COMPONENTS.map(
  (comp): ComponentOption => ({
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
  }),
)

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
  collapsedContainer: {},
  collapsedDescription: {
    fontWeight: 900,
    flex: 1,
    marginRight: theme.spacing(1),
  },
}))

export const ComponentInput: React.FC<ComponentInputProps> = ({ index, insert, remove, move, numComponents }) => {
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)
  const [component, setComponent] = useState<ComponentOption | null>(null)
  const [description, setDescription] = useState<string>('')

  if (collapsed) {
    return (
      <FormSection>
        <Box display="flex" alignItems="center" className={classes.collapsedContainer}>
          <Typography className={classes.collapsedDescription}>
            {component?.label ?? '—'}, {description || '—'}
          </Typography>
          <Tooltip title="Unlock">
            <span>
              <IconButton size="small" onClick={() => setCollapsed(false)}>
                <LockOutline />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </FormSection>
    )
  }

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
          <React.Fragment key={params.key}>
            <ListSubheader className={classes.optionGroupHeader}>{params.group}</ListSubheader>
            {params.children}
          </React.Fragment>
        )}
        value={component}
        onChange={(_, option) => setComponent(option)}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, selected) => option.value.type === selected.value.type}
        renderInput={(params) => <TextField {...params} label="Component" variant="outlined" />}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Tooltip title="Move Up">
            <span>
              <IconButton
                disabled={index === 0}
                className={classes.buttonLeft}
                size="small"
                onClick={() => move(index, 'up')}
              >
                <ArrowDownThinCircleOutline className={classes.rotate180} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Move Down">
            <span>
              <IconButton
                disabled={index + 1 >= numComponents}
                className={classes.buttonLeft}
                size="small"
                onClick={() => move(index, 'down')}
              >
                <ArrowDownThinCircleOutline />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem className={classes.buttonLeft} />
          <Tooltip title="Insert After">
            <span>
              <IconButton className={classes.buttonLeft} size="small" onClick={() => insert(index)}>
                <ShapeRectanglePlus />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton className={classes.buttonLeft} size="small" onClick={() => remove(index)}>
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Lock">
            <span>
              <IconButton className={classes.buttonRight} size="small" onClick={() => setCollapsed(true)}>
                <LockOpenVariantOutline />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </FormSection>
  )
}
