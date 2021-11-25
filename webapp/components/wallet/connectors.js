import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({
  supportedChainIds: [ 4, // rinkeby
                       42, // ropsten
                      5777 // local ganache
                     ],
})