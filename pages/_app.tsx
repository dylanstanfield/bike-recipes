import { AppProps } from 'next/app'
import { Layout } from 'antd'

import 'antd/dist/antd.css'
import '../styles/globals.css'

const { Header, Footer, Content } = Layout

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Header>BIKE RECIPES</Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default MyApp
