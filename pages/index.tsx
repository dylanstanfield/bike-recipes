import { useState } from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { v4 as uuid } from 'uuid'
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone'

import { FormLabel } from '../components/FormLabel'
import { FormControl } from '../components/FormControl'
import { TextField } from '../components/TextField'
import { ComponentInput } from '../components/ComponentInput'
import { Config } from '../types'

export default function Home(): React.ReactElement {
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
    <Container maxWidth="lg">
      <Typography variant="h1" component="h1">
        Bike Recipes
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Box style={{ minHeight: '500px' }}>
            <form>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <TextField variant="outlined" fullWidth />
              </FormControl>

              <FormControl>
                <FormLabel>Components</FormLabel>
                {components.map((component, index) => (
                  <ComponentInput key={component.id} remove={remove} insert={insert} index={index} />
                ))}
                <Button
                  onClick={() => insert(components.length - 1)}
                  style={{ fontWeight: 900, letterSpacing: '0.1em', fontSize: 14 }}
                  size="large"
                  color="primary"
                  startIcon={<AddCircleTwoToneIcon style={{ marginRight: 8 }} />}
                >
                  Add Component
                </Button>
              </FormControl>
            </form>
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Box style={{ background: 'blue', minHeight: '500px' }}></Box>
        </Grid>
      </Grid>
    </Container>
  )
}
