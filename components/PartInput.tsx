import { Fragment, useState } from 'react'
import { TextField, Typography, InputAdornment, IconButton, Menu, MenuItem, ListItemIcon, makeStyles, Theme } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { DotsVertical, ArrowUpCircle, ArrowDownCircle, Delete, Plus } from 'mdi-material-ui'

import { useStore } from '../hooks/useStore'

interface PartInputProps {
  index: number
}

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    fontStyle: 'italic',
    textTransform: 'lowercase',
  },
}))

export const PartInput: React.FC<PartInputProps> = ({ index }) => {
  const classes = useStyles()
  const store = useStore()

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setMenuAnchor(null)
  }

  const part = store.parts[index]

  return (
    <Autocomplete
      freeSolo
      autoHighlight
      value={part.suggestion.value}
      onChange={(_, value) => store.updatePart(index, value ?? '', 'suggestion')}
      inputValue={part.custom.value}
      onInputChange={(_, value) => store.updatePart(index, value ?? '', 'custom')}
      options={[]}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            className: undefined, // remove params className to fix custom end adornment
            endAdornment: (
              <Fragment>
                <InputAdornment position="end">
                  <IconButton tabIndex={-1} onClick={(e) => openMenu(e)} edge="end">
                    <DotsVertical />
                  </IconButton>
                </InputAdornment>
                <Menu anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={() => closeMenu()}>
                  <MenuItem disabled={index === 0} onClick={() => store.movePart(index, 'up')}>
                    <ListItemIcon>
                      <ArrowUpCircle fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.menuButton}>Move Up</Typography>
                  </MenuItem>
                  <MenuItem disabled={index === store.parts.length - 1} onClick={() => store.movePart(index, 'down')}>
                    <ListItemIcon>
                      <ArrowDownCircle fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.menuButton}>Move Down</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => store.insertPart(index)}>
                    <ListItemIcon>
                      <Plus fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.menuButton}>Add After</Typography>
                  </MenuItem>
                  <MenuItem disabled={store.parts.length <= 1} onClick={() => store.removePart(index)}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.menuButton}>Delete</Typography>
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


