import { Fragment, useState } from 'react'
import { TextField, Typography, InputAdornment, IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DotsVertical, ArrowUpCircle, ArrowDownCircle, Close, Delete } from 'mdi-material-ui'

import { Component } from '../types/schema'
import { useComponents } from '../hooks/useComponents'

interface ComponentInputProps {
  component: Component
  index: number
  length: number
}

const options = ['shimano thing', 'sram thing']

export const ComponentInput: React.FC<ComponentInputProps> = ({ component, index, length }) => {
  const { update, move, remove, insert } = useComponents()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setMenuAnchor(null)
  }

  return (
    <Autocomplete
      freeSolo
      key={component.id}
      options={options.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          variant="outlined"
          value={component.text}
          onChange={({ target }) => update(index, target.value)}
          InputProps={{
            endAdornment: (
              <Fragment>
                <InputAdornment position="end">
                  <IconButton onClick={(e) => openMenu(e)} edge="end">
                    <DotsVertical />
                  </IconButton>
                </InputAdornment>
                <Menu anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={() => closeMenu()}>
                  <MenuItem disabled={index === 0} onClick={() => move(index, 'up')}>
                    <ListItemIcon>
                      <ArrowUpCircle fontSize="small" />
                    </ListItemIcon>
                    <Typography>Move Up</Typography>
                  </MenuItem>
                  <MenuItem disabled={index === length - 1} onClick={() => move(index, 'down')}>
                    <ListItemIcon>
                      <ArrowDownCircle fontSize="small" />
                    </ListItemIcon>
                    <Typography>Move Down</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => update(index, '')}>
                    <ListItemIcon>
                      <Close fontSize="small" />
                    </ListItemIcon>
                    <Typography>Clear</Typography>
                  </MenuItem>
                  <MenuItem disabled={length <= 1} onClick={() => remove(index)}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography>Delete</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => insert(index)}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography>Insert After</Typography>
                  </MenuItem>
                </Menu>
              </Fragment>
            ),
          }}
        />
      )}
    />
  )
}
