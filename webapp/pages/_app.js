import '../styles/globals.css'
import Layout from '../components/Layout'

import { ChainId, DAppProvider } from '@usedapp/core'


const config = {
  supportedChains: [ChainId.Kovan],
  autoconnect: false,
  notifications: {
    expirationPeriod: 50000,
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>      <Layout>
          <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  )
  //return (<Layout>
  //          <Component {...pageProps} />
  //        </Layout>)
}

export default MyApp
