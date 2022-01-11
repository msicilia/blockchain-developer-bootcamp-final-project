

# Install locally 
## Dependencies

The contracts are specified with Solidity `0.8.10` version. A compatible Truffle version is required. The development version has used `5.4.22`. 

`npm install -g truffle@5.4.22`

The oraclized version of the repo contracts require Chainlink contracts to be compiled. 

`npm install @chainlink/contracts --save`

Other than Truffle and Next.js, the dependencies are local, thus they appear in the `package.json` both for the Truffle project and for the embedded Next.js app in the `webapp` folder. 

## Issues

I was unable to install chainlink contracts using `npm`, so had to use `yarn` instead.

`yarn add @chainlink/contracts`

# Local testing

The contracts in the Truffle project can be tested locally as usual with `truffle test`. Note that this tests the mock version of the speedrun repository that **does not use actual oracles**. 

For this local testing, the `development` network should be launched at the host and port config in `truffle-config.js`. Tests are written in Javascript. 


