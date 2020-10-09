import { useState } from 'react'
import { Container, Typography, Button, makeStyles, Theme, Tooltip, IconButton, Paper, Modal } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { LockOutline, LockOpenVariantOutline } from 'mdi-material-ui'

import { useComponents } from '../hooks/useComponents'
import { FormLabel } from '../components/FormLabel'
import { FormControl } from '../components/FormControl'
import { TextField } from '../components/TextField'
import { ComponentInput } from '../components/ComponentInput'
import { FormSection } from '../components/FormSection'
import { ComponentType, Config } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  titleContainer: {
    background: theme.palette.primary.main,
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  logo: {
    height: 80,
    margin: '0 auto',
    display: 'block',
  },
  title: {
    fontSize: 20,
    color: theme.palette.background.default,
    fontStyle: 'italic',
    marginTop: theme.spacing(1),
    textTransform: 'lowercase',
    background: theme.palette.background.paper,
    // background: `-webkit-linear-gradient(120deg, #e5fe15, #ff2daa)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  toolbar: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    padding: theme.spacing(2),
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '@keyframes backgroundAnimated': {
    '0%': { backgroundPosition: '14% 0%' },
    '50%': { backgroundPosition: '87% 100%' },
    '100%': { backgroundPosition: '14% 0%' },
  },
  generateButton: {
    background: '#59656B',
    // background: theme.palette.primary.main,
  },
  generateButtonTextContainer: {
    fontStyle: 'italic',
    textTransform: 'lowercase',
    background: `-webkit-linear-gradient(120deg, #e35aa8, #fee998, #b8ebf9, #fee998, #e35aa8)`,
    backgroundSize: '400% 400%',
    animation: `$backgroundAnimated 4000ms ${theme.transitions.easing.easeInOut} infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  modalContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
    backdropFilter: 'blur(10px)',
  },
  outputImage: {
    width: '100%',
    maxWidth: '800px',
  },
}))

export default function Home(): React.ReactElement {
  const classes = useStyles()
  const { components, move, insert, update, remove, lock, unlock, lockAll, unlockAll, getInput } = useComponents()

  const [buildName, setBuildName] = useState('')
  const [description, setDescription] = useState('')
  const [src, setSrc] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const submit = () => {
    const config: Config = {
      buildName,
      description,
      components: getInput(),
    }
    setSrc(`/api/build?c=${encodeURIComponent(JSON.stringify(config))}`)
    setIsModalOpen(true)
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Grid className={classes.titleContainer}>
        <img src="/logo.circle.light.svg" className={classes.logo} />
        <Typography component="h1" className={classes.title}>
          Bike Recipes
        </Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <Box padding={2}>
          <form>
            <FormControl>
              <FormLabel>Information</FormLabel>
              <FormSection>
                <TextField
                  label="Build Name"
                  variant="outlined"
                  fullWidth
                  value={buildName}
                  onChange={({ target }) => setBuildName(target.value)}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  disableMarginBottom
                  fullWidth
                  multiline
                  rows={3}
                  rowsMax={6}
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                />
              </FormSection>
            </FormControl>
            <FormControl>
              <FormLabel>Components</FormLabel>
              {components.map((component, index) => (
                <ComponentInput
                  key={component.id}
                  component={component}
                  index={index}
                  moveUp={() => move(index, 'up')}
                  moveDown={() => move(index, 'down')}
                  remove={() => remove(index)}
                  insert={() => insert(index)}
                  update={(desc: string, type?: ComponentType) => update(index, desc, type)}
                  lock={() => lock(index)}
                  unlock={() => unlock(index)}
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

            <Box height={64} />

            <Paper className={classes.toolbar} elevation={3} variant="outlined">
              {components.some(({ locked }) => !locked) && (
                <Tooltip title="Lock All">
                  <span>
                    <IconButton size="small" onClick={() => lockAll()}>
                      <LockOpenVariantOutline />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
              {components.every(({ locked }) => locked) && (
                <Tooltip title="Unlock All">
                  <span>
                    <IconButton size="small" onClick={() => unlockAll()}>
                      <LockOutline />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
              <Button className={classes.generateButton} variant="contained" onClick={submit} title="make image">
                <div className={classes.generateButtonTextContainer}>Make Image</div>
              </Button>
            </Paper>
          </form>
        </Box>
      </Grid>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={classes.modalContent}>
          <img src={src} className={classes.outputImage} />
        </div>
      </Modal>
    </Container>
  )
}
