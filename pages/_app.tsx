import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Box, Container, Typography } from '@material-ui/core'
import { theme } from '../styles/theme'

import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    const parent = jssStyles?.parentElement ?? null
    if (jssStyles && parent) {
      parent.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Bike Recipes</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box paddingY={3} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="body1" style={{ fontStyle: 'italic' }} align="center">
              bike recipes
            </Typography>
          </Box>
          <Box paddingY={4}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
