// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./ISpeedRunRepo.sol";

/// @title A stub repository of data from Speedrun.com
/// @author msicilia.eth
/// @notice This is a stub, dummy implementation for testing. No Oracles are used, so it is permitted to enter arbitrary data
contract SpeedRunRepo_Stub is ISpeedRunRepo {

    // Runners registered succesfully:
    mapping (string => SpeedRunner) public runners;
    // Runs registered succesfully:
    mapping (string => mapping (string => mapping (string => Run[]))) public runs; 

    /// @dev Note this naive implementation allows anybody to steal the prizes of others by simply 
    ///     registering again to other address. See the oraclized version for a more realistic use case.
     function add_runner(string calldata _userName, string calldata _userId, address _addr) external{
        runners[_userId] = SpeedRunner(true, _userName, _userId, _addr);
    }

    function add_run(string calldata _userId, string calldata _gameId, string calldata _levelId, string calldata _runId, uint mark) external {
        require(runners[_userId].isRunner);
        Run[] storage user_runs = runs[_userId][_gameId][_levelId];
        user_runs.push(Run(true, _gameId, _levelId, _runId, mark, _userId));
    }

    /// @param userId The SppedRun.com `userId` being queried.
    /// @param gameId The id of the game.
    /// @param levelId The id of the level of the game.
    /// @param mark The time ckeched. 
    /// @return `true` if there is verified evidence in the repo that the user has a mark equal or better than `mark`.
    /// @notice It returns `false` if no evidence found (but it might be that such evidence is yet at SpeedRun.com)
    function passed_mark(string calldata userId, string calldata gameId, string calldata levelId, uint mark) override external view returns (bool){
        require(runner_registered(userId));
        return true;
    }
    function runner_registered(string memory _userId) public view returns (bool){
        return runners[_userId].isRunner;
     }
}
  