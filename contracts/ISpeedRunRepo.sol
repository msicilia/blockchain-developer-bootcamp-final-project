// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
/// @title A repository of data from Speedrun.com
/// @author msicilia.eth
/// @notice This interface defines the data structures and the interface of data repos for SpeedRun.com.
interface ISpeedRunRepo{
    /// @notice This is minimal information from a SpeedRun.com user.
    /// @dev Note that username corresponds to `international` names according to SpeedRun API. 
    /// @dev Note field `userName` is not strictly necessary, but is kept for the readability of events. 
    struct SpeedRunner{
        string userName; 
        string userId;
        address addr;
    }
    /// @notice This is minimal information from a concrete speed run of `userId`. 
    /// @dev Note Field `primaryTime` is the one used in the leaderboards at SpeedRun.com. 
    /// @dev Note Field `primaryTime` is in seconds, the API allows for miliseconds (float) but they are to be truncated.
    struct Run{
        string gameId;
        string levelId;
        string runId;
        uint primaryTime;
        string userId;
    }
    /// @param userId The SppedRum.com `userId` being queried.
    /// @param gameId The id of the game.
    /// @param levelId The id of the level of the game.
    /// @param mark The time ckeched. 
    /// @return `true` if there is verified evidence in the repo that the user has a mark equal or better than `mark`.
    /// @notice It returns `false` if no evidence found (but it might be that such evidence is yet at SpeedRun.com)
    function  passed_mark(string calldata userId, string calldata gameId, string calldata levelId, uint mark) external view returns (bool);
}