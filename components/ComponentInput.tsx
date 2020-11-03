import { Fragment, useState } from 'react'
import { TextField, Typography, InputAdornment, IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DotsVertical, ArrowUpCircle, ArrowDownCircle, Close, Delete } from 'mdi-material-ui'

import { useComponentStore } from '../hooks/useComponentStore'

interface ComponentInputProps {
  index: number
}

const options = ['shimano thing', 'sram thing']
const placeholders = ['Frame', 'Bars', 'Tires']

export const ComponentInput: React.FC<ComponentInputProps> = ({ index }) => {
  const components = useComponentStore((state) => state.components)
  const update = useComponentStore((state) => state.update)
  const remove = useComponentStore((state) => state.remove)
  const move = useComponentStore((state) => state.move)
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
      value={components[index].text}
      onChange={(_, text) => update(index, text ?? '')}
      key={components[index].id}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholders[index]}
          margin="normal"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            className: undefined, // remove params className to fix custom end adornment
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
                  <MenuItem disabled={index === components.length - 1} onClick={() => move(index, 'down')}>
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
                  <MenuItem disabled={components.length <= 1} onClick={() => remove(index)}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography>Delete</Typography>
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
