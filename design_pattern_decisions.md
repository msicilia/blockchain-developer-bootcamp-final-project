


## Overview of smart contract design
An overall description of the  [design of smart contracts can be found here](smart_contract_design.md).

## Inter-contract execution
The separtion of concerns of the smart contract design requires inter-contract execution: motivator contracts use repository contracts to get reliable facts about speedrunners and speedruns. 

This results in that a subclass of `MotivatorBase` must take the address of an already deployed repository at construction time, and that the key decisions will be dependant on the data that accrues in that repository. 
## Interfaces and abstract classes

The basic interface of repositories has been abstracted in a `ISpeedRunRepo` interface, and the essential functionality of motivators in a `MotivatorBase` abstract class.


## Oracles

The repository part requires the use of oracles, since its responsibility is that of bringing data on-chain to be used by the motivators. 

Note that an implementation **witouth oracles** has been provided in the `SpeedRunRepoStub` contract **just for purposes of testing of basic functionality**, but that contract is just a stub for testing, since not having Oracle input obviously defeats the whole purpose of the use case.

As a more realistic implementtion, the `SpeedRunRepoOraclized` contract brings the use of ChainLink APIs to the contract design. But still it is not an ideal case, since in its current implementation it uses a single Chainlink node, so it is still not trustless. More realistic implementations could use several, or make use of Chainlink facilities as `PreCoordinators`.

## Ownable contracts

A slightly modified version of OppenZeppelin `Ownable` contract has been applied to the motivator contracts, for a sort of emergency stop mechanism. More information included in the [section on avoiding attack patterns](avoiding_common_attacks.md).

## Pausable contract

A modified version of OpenZeppelin `Pausable` contract has been applied to the motivator contracts to support the permanent disabling of a motivator, returning the pending prizes to their original issues. Once a motivator contract is paused, its significant behaviors are disabled, and this is a better solution than `selfdestruct` which may make lose of funds sent to the disabled contract. When returning the funds, the transfers are done after the updating of the status of the challenges, following the known pattern of "Checks-Effects-Interactions" that is used to attempt to mitigate attack vectors as those used in reentrancy attacks. 
## About strings

I have used `string` as data type for user names and user ids since I was unable to find in the SpeedRun.com API docs the maximum length of those elements. 