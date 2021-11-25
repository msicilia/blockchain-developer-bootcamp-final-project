# Speed the speedrunners!
## Motivation in a nutshell

The project starts from the idea of how gamers that engage in **speedrunning** (competing in passing games or levels as quick or effectively as possible) could be motivated with rewards in crypto that would be automatically distributed using smart contracts. 

Typically, somebody would post a challenge (e.g. passing some game level in less than X minutes) for a particular gamer in the blockchain sending some crypto as reward, and that reward may be claimed when the challenge is eventually beat by the user. 

This example use case is just one of many possible options. The  variations are endless, e.g. posting challenges to any player, redistributing part of the rewards to losers also, etc. More about the motivation of the use case can be found [here](motivation.md).

As is evident, **oracles** play a significant role in these use cases. In consequence, the prototype in this project uses [Speedrun.com](https://www.speedrun.com/) as source of data about speedrunners, together with a basic initial implementation using [Chainlink](https://chain.link/) nodes as oracles.

## Smart contract design

The design of the smart contracts attempts to address **extensibility** by separating the concerns of the logic in two parts (player and play data on one side and rewards management on the other) and providing generic interfaces that can be used as a basis for diverse implementations. More information about the [design of smart contracts here](design_pattern_decisions.md). 

The considerations on security and attack vectors [can be found here](avoiding_common_attacks.md).

## Folder structure
The main folder contains the [truffle](https://trufflesuite.com/)-generated structure for the project. The `webapp` folder is the [Next.js](https://nextjs.org/) frontend for the DApp.  

## Access the prototype frontend
The frontend of the prototype is deployed at [this address]().

A screencast with a short walkthrough [can be found here]().

## Deployment and tests

Documentation for deployment, compilation and testing [can be found here](deployment_testing.md).
## Credits

`msicilia.eth` (`0xb92Eb3331af4662f92F211BD1EFc128b16740156`)
