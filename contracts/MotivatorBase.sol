// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;
/// @title A motivating mechanism for speedrunners.
/// @author msicilia.eth
/// @notice This interface defines the basic interface for a variety of possible mechanisms.

import "./ISpeedRunRepo.sol";
import "./Ownable.sol";
import "./Pausable.sol";

abstract contract MotivatorBase is Ownable, Pausable{
    struct Challenge {
        string userId;
        string gameId;
        string levelId;
        uint time;
        uint prize; 
        bool reclaimed;
        address sender;
        bool isChallenge;
    }
    event ChallengePlaced(
        uint challengeId,
        string indexed userId, 
        string indexed gameId,
        string indexed levelId,
        uint time,
        uint prize      
    ); 
    
    mapping (uint => Challenge) public challenges;
    uint public next_challenge;

    address speedrunRepo;
    ISpeedRunRepo repo;

    constructor(address _speedrunRepo){
        speedrunRepo = _speedrunRepo;
        repo = ISpeedRunRepo(_speedrunRepo);
        next_challenge = 0;
    }
    function reclaim_prize(uint challengeId) external virtual;
    function place_challenge(string calldata _userId, string calldata _gameId, string calldata _levelId,
                             uint _time) whenNotPaused() external virtual payable{
        require(msg.value > 0, "Challenges need to provide funds for rewarding speedrunners");
        require(_time > 0, "The time of the challenge needs to be greater than zero.");
        Challenge memory c = Challenge(_userId, _gameId, _levelId, _time, msg.value, false, msg.sender, true);
        challenges[next_challenge] = c;
        emit ChallengePlaced(next_challenge, _userId, _gameId, _levelId, _time, msg.value);
        next_challenge += 1;

    }
    
    function return_funds_and_destroy() whenNotPaused() external onlyOwner {
        _pause(); // Only the owner can do it, and is not revertible.
        for (uint i=0; i < next_challenge; i++){
            Challenge storage c = challenges[i];
            if (!c.reclaimed){
                c.reclaimed = true;
                payable(c.sender).transfer(c.prize);
            }
        }
    }
}