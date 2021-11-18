// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./ISpeedRunRepo.sol";

/// @title A stub repository of data from Speedrun.com
/// @author msicilia.eth
/// @notice This is a stub, dummy implementation for testing. No Oracles are used, so it is permitted to enter arbitrary data
contract SpeedRunRepo_Stub is ISpeedRunRepo {

    mapping (string => SpeedRunner) public runners;
    mapping (string => mapping (string => mapping (string => Run))) runs; 
    function add_runner(string calldata _userName, string calldata _userId, address _addr) external{
        runners[_userId] = SpeedRunner(_userName, _userId, _addr);
    }

    function add_run(string calldata _userId, string calldata _gameId, string calldata _levelId, uint mark) external {
        //user_runs = runs[_userId][_gameId];
        // user_runs.push(Run(_gameId, _levelId, _runId, mark, _userId));
    }
    /// @param userId The SppedRum.com `userId` being queried.
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
        return runners[_userId].addr != address(0x0);
     }
}
  