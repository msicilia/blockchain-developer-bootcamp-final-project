// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
/// @title A motivating mechanism for speedrunners.
/// @author msicilia.eth
/// @notice This interface defines the basic interface for a variety of possible mechanisms.

import "./ISpeedRunRepo.sol";
import "./Ownable.sol";

abstract contract MotivatorBase is Ownable{
    struct Challenge {
        string userId;
        string gameId;
        string levelId;
        uint time;
        uint prize; 
        bool reclaimed;
        address sender;
    }
    event ChallengePlaced(
        string challengeId,
        string indexed userId, 
        string indexed gameId,
        string indexed levelId,
        uint time,
        uint prize      
    ); 
    
    mapping (string => Challenge) challenges;

    address speedrunRepo;
    ISpeedRunRepo repo;

    constructor(address _spreedrunRepo){
        speedrunRepo = _spreedrunRepo;
        repo = ISpeedRunRepo(_spreedrunRepo);
    }
    function reclaim_prize(string calldata challengeId) external virtual;
    function place_challenge(string calldata _userId, string calldata _gameId, string calldata _levelId,
                             uint _time, string calldata _challengeId) external virtual payable{
        require(msg.value > 0, "Challenges need to provide funds for rewarding speedrunners");
        require(_time > 0, "The time of the challenge needs to be greater than zero.");
        require(challenges[_challengeId].time != 0, "ChallengeId already used.");
        Challenge memory c = Challenge(_userId, _gameId, _levelId, _time, msg.value, false, msg.sender);
        challenges[_challengeId] = c;
        emit ChallengePlaced(_challengeId, _userId, _gameId, _levelId, _time, msg.value);
    }
    
    function return_funds_and_destroy() external onlyOwner {

    }
}