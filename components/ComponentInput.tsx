import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import { ShapeRectanglePlus, ArrowDownThinCircleOutline, LockOutline, LockOpenVariantOutline } from 'mdi-material-ui'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete'
import { makeStyles, Theme, FormControl, Box, Typography, ListSubheader, Divider } from '@material-ui/core'

import { Component, COMPONENTS, ComponentVM, ComponentType } from '../types'
import { TextField } from './TextField'
import { FormSection } from './FormSection'

interface ComponentOption {
  label: string
  value: Component & { categoryLabel: string }
}

const labelify = (snake: string) =>
  snake
    .split('_')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')

const componentOptions = COMPONENTS.map(
  (comp): ComponentOption => ({
    label: labelify(comp.type),
    value: {
      type: comp.type,
      category: comp.category,
      categoryLabel: labelify(comp.category),
    },
  }),
)

interface ComponentInputProps {
  component: ComponentVM
  index: number
  moveUp: () => void
  moveDown: () => void
  insert: () => void
  update: (description: string, type?: ComponentType) => void
  remove: () => void
  lock: () => void
  unlock: () => void
  numComponents: number
}

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    textTransform: 'uppercase',
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
    fontSize: 16,
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  optionGroupHeader: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    fontSize: 12,
    background: theme.palette.background.paper,
    top: -theme.spacing(1), // fixes bug
  },
  collapsedContainer: {},
  collapsedDescription: {
    flex: 1,
    marginRight: theme.spacing(1),
  },
  componentsPopover: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}))

export const ComponentInput: React.FC<ComponentInputProps> = ({
  component,
  index,
  insert,
  update,
  remove,
  moveUp,
  moveDown,
  lock,
  unlock,
  numComponents,
}) => {
  const classes = useStyles()

  const getCollapsedLabel = (): string => {
    if (component.type && component.description) {
      return `${labelify(component.type)}, ${component.description}`
    }

    if (component.type && !component.description) {
      return `${labelify(component.type)}, —`
    }

    if (component.description) {
      return `—, ${component.description}`
    }

    return '—'
  }

  if (component.locked) {
    return (
      <FormSection>
        <Box display="flex" alignItems="center" className={classes.collapsedContainer}>
          <Typography className={classes.collapsedDescription}>{getCollapsedLabel()}</Typography>
          <Tooltip title="Unlock">
            <span>
              <IconButton size="small" onClick={() => unlock()}>
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
        classes={{ paper: classes.componentsPopover }}
        value={
          componentOptions.find((opt) => opt.value.type === component.type) || {
            label: '',
            value: { type: '', category: '', categoryLabel: '' },
          }
        }
        onChange={(_, option) => update(component.description, option?.value.type as ComponentType)}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, selected) => option.value.type === selected.value.type}
        renderInput={(params) => <TextField {...params} label="Component" variant="outlined" />}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={component.description}
        onChange={({ target }) => update(target.value, component.type)}
      />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Tooltip title="Move Up">
            <span>
              <IconButton disabled={index === 0} className={classes.buttonLeft} size="small" onClick={() => moveUp()}>
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
                onClick={() => moveDown()}
              >
                <ArrowDownThinCircleOutline />
              </IconButton>
            </span>
          </Tooltip>
          <Divider orientation="vertical" flexItem className={classes.buttonLeft} />
          <Tooltip title="Insert After">
            <span>
              <IconButton className={classes.buttonLeft} size="small" onClick={() => insert()}>
                <ShapeRectanglePlus />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton className={classes.buttonLeft} size="small" onClick={() => remove()}>
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Lock">
            <span>
              <IconButton className={classes.buttonRight} size="small" onClick={() => lock()}>
                <LockOpenVariantOutline />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </FormSection>
  )
}
