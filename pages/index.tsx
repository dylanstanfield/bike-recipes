import { useState } from 'react'
import { Container, Typography, Button, makeStyles, Theme, Tooltip, IconButton, Paper } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { v4 as uuid } from 'uuid'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

import { ArrowDownThinCircleOutline } from 'mdi-material-ui'
import { FormLabel } from '../components/FormLabel'
import { FormControl } from '../components/FormControl'
import { TextField } from '../components/TextField'
import { ComponentInput } from '../components/ComponentInput'
import { FormSection } from '../components/FormSection'
import { Config } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.background.default,
  },
  titleContainer: {
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  toolbar: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,

    padding: theme.spacing(2),
    borderRadius: 0,
  },
}))

export default function Home(): React.ReactElement {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [components, setComponents] = useState<{ description: string; id: string }[]>([{ description: '', id: uuid() }])
  const [src, setSrc] = useState('')

  const change = (input: string, index: number): void => {
    setComponents(
      components.map((component, i) => {
        if (index !== i) {
          return component
        }
        return { ...component, description: input }
      }),
    )
  }

  const move = (index: number, direction: 'up' | 'down') => {
    const copy = [...components]

    if (direction === 'up') {
      copy.splice(index - 1, 0, copy.splice(index, 1)[0])
    }

    if (direction === 'down') {
      copy.splice(index + 1, 0, copy.splice(index, 1)[0])
    }

    setComponents(copy)
  }

  const insert = (index: number) => {
    const copy = [...components]
    copy.splice(index + 1, 0, { description: '', id: uuid() })
    setComponents(copy)
  }

  const remove = (index: number) => {
    const copy = [...components]
    copy.splice(index, 1)
    setComponents(copy)
  }

  const submit = () => {
    const config: Config = {
      name,
      components: components.map(({ description }) => description),
    }

    setSrc(`/api/build?c=${encodeURIComponent(JSON.stringify(config))}`)
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid className={classes.titleContainer}>
        <Typography className={classes.title} variant="h1">
          Bike Recipes
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <Box padding={2}>
          <form>
            <FormControl>
              <FormLabel>Information</FormLabel>
              <FormSection>
                <TextField label="Build Name" variant="outlined" fullWidth />
                <TextField label="Your Name" variant="outlined" fullWidth />
              </FormSection>
            </FormControl>

            <FormControl>
              <FormLabel>Components</FormLabel>
              {components.map((component, index) => (
                <ComponentInput
                  key={component.id}
                  move={move}
                  remove={remove}
                  insert={insert}
                  index={index}
                  numComponents={components.length}
                />
              ))}
              <Button
                onClick={() => insert(components.length - 1)}
                style={{ fontWeight: 900, letterSpacing: '0.1em', fontSize: 14 }}
                size="large"
                color="primary"
                startIcon={<AddCircleOutlineOutlinedIcon style={{ marginRight: 8 }} />}
              >
                Add Component
              </Button>
            </FormControl>
            <Paper className={classes.toolbar} elevation={3} variant="outlined">
              <Tooltip title="Move Down">
                <span>
                  <IconButton size="small" onClick={() => {}}>
                    <ArrowDownThinCircleOutline />
                  </IconButton>
                </span>
              </Tooltip>
            </Paper>
          </form>
        </Box>
      </Grid>
    </Container>
  )
}
