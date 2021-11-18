import '../styles/globals.css'
import Layout from '../components/Layout'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { ethers } from 'ethers';

function getLibrary(provider) {
  // return new Web3(provider)
  return new ethers.providers.Web3Provider(provider);
}


function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  )
  //return (<Layout>
  //          <Component {...pageProps} />
  //        </Layout>)
}

export default MyApp
