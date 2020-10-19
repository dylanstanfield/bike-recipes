import { useState } from 'react'
import {
  Container,
  Typography,
  Button,
  makeStyles,
  Theme,
  Tooltip,
  IconButton,
  Paper,
  CircularProgress,
  Modal,
  lighten,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { LockOutline, ExpandAllOutline, CollapseAllOutline } from 'mdi-material-ui'

import { useComponents } from '../hooks/useComponents'
import { FormLabel } from '../components/FormLabel'
import { FormControl } from '../components/FormControl'
import { TextField } from '../components/TextField'
import { ComponentInput } from '../components/ComponentInput'
import { FormSection } from '../components/FormSection'
import { ComponentType, Config } from '../types'

const useStyles = makeStyles((theme: Theme) => ({
  background: { minHeight: '100vh', background: lighten(theme.palette.primary.main, 0.75) },
  container: { minHeight: '100vh', background: theme.palette.background.default },
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
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  addComponentButton: {
    margin: theme.spacing(2, 0),
    fontWeight: 900,
    letterSpacing: '0.1em',
    fontSize: 14,
  },
  toolbarContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  toolbar: {
    padding: theme.spacing(2),
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '@keyframes shine': {
    to: { backgroundPosition: '200% center' },
  },
  generateButtonTextContainer: {
    fontStyle: 'italic',
    textTransform: 'lowercase',
    background: `-webkit-linear-gradient(0deg, ${theme.palette.background.paper}, ${theme.palette.background.paper}, #f542a4, ${theme.palette.background.paper})`,
    backgroundSize: '200% auto',
    animation: `$shine 2000ms linear infinite`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  modalContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backdropFilter: 'blur(10px)',
    position: 'relative',
  },
  imageLoading: {
    zIndex: 1,
    width: '100%',
    maxWidth: '800px',
    pointerEvents: 'visible',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    zIndex: 2,
    pointerEvents: 'visible',
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
    <div className={classes.background}>
      <Container maxWidth="md" disableGutters className={classes.container}>
        <Grid className={classes.titleContainer}>
          <img src="/logo.circle.light.svg" className={classes.logo} />
          <Typography component="h1" className={classes.title}>
            Bike Recipes
          </Typography>
        </Grid>
        <Grid container direction="column" alignContent="center">
          <Grid item md={8} xs={12}>
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
                    className={classes.addComponentButton}
                    size="large"
                    color="primary"
                    startIcon={<AddCircleOutlineOutlinedIcon style={{ marginRight: 8 }} />}
                  >
                    Add Component
                  </Button>
                </FormControl>

                <Box height={64} />
              </form>
            </Box>
          </Grid>
          <Grid item className={classes.toolbarContainer}>
            <Container maxWidth="md" disableGutters>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Paper elevation={3} variant="outlined" className={classes.toolbar}>
                    {components.some(({ locked }) => !locked) && (
                      <Tooltip title="Collapse All">
                        <span>
                          <IconButton size="small" onClick={() => lockAll()}>
                            <CollapseAllOutline />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    {components.every(({ locked }) => locked) && (
                      <Tooltip title="Expand All">
                        <span>
                          <IconButton size="small" onClick={() => unlockAll()}>
                            <ExpandAllOutline />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                    <Button color="primary" variant="contained" onClick={submit} title="make image">
                      <div className={classes.generateButtonTextContainer}>Make Recipe</div>
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={classes.modalContent}>
            <div className={classes.imageLoading}>
              <CircularProgress color="secondary" />
            </div>
            <img src={src} className={classes.image} />
          </div>
        </Modal>
      </Container>
    </div>
  )
}
