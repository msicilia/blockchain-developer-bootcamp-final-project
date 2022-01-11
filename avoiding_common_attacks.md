
# Security considerations

### Solidity version

I have used the latest Solidity compiler version available and workable (`0.8.9`) at the time of development and fixed it in smart contract code and in the configuration of Truffle. I could not use the later versions `0.8.10` and `0.8.11` due to some problems with Truffle that I was unable to solve (seem to be related to this issue: https://github.com/ethereum/solidity/issues/11489).

This is a recommendation from the Solidity docs as only the latest version receives security fixes. This is also recommended in [SWC-102](https://swcregistry.io/docs/SWC-102) *"outdated compiler version"* and [SWC-103](https://swcregistry.io/docs/SWC-103) *"floating pragma"* .

### Ownership of the contracts

I considered the option of making the contracts `Ownable` by using OppenZeppelin libraries. This is the rationale I followed: 
- The SpeedRun `Repo`s of facts should essentially be completely independent of any owner. They are not holding any funds, so in case it could got attacked, the target must be the contracts that use them, and disbling the attack should be done at those users to avoid leaking funds.
- The `Motivator` contracts are holding funds, so they are likely targets of attackers. 

In consequence, `Motivators` are `Ownable`, but this raises the problem of locking funds in an emergency situation. The solution in this case would be that of reverting the funds to the poster of the challenges, effectively cancelling them, via a `onlyOwner` protected function. The use of OppenZeppelin `Pausable` is no apparent alternative, since there is no easy remediation other than cancelling all the pending challenges in the case of an attack capable of stealing funds. Also, this mechanism works nice as a "Moloch style" "violent" upgrade: just abandon a contract, return the funds and deploy a new one. This is related to [SWC-105](https://swcregistry.io/docs/SWC-105) *"unprotected ether withdrawal"* .