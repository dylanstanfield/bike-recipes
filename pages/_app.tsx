import { AppProps } from 'next/app'
import { Flex, Box } from 'rebass'

import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Flex justifyContent="center">
      <Box flex={1} maxWidth="800px" paddingX={2}>
        <Component {...pageProps} />
      </Box>
    </Flex>
  )
}

export default MyApp
