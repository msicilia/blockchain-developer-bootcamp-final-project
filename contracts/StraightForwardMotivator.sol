// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "./MotivatorBase.sol";

/// @title A barebones motivator, that simply sends the amounts on the challenges to the speedrunner on reclaim.
/// @author msicilia.eth

contract StraightForwardMotivator is MotivatorBase{
    constructor(address _speedRunRepo) MotivatorBase(_speedRunRepo) {}

    function reclaim_prize(uint _challengeId) whenNotPaused() external override {
        require(challenges[_challengeId].time != 0, "ChallengeId not found when reclaiming prize.");
        Challenge storage ch = challenges[_challengeId];
        require(!ch.reclaimed, "The challenge has already been reclaimed.");
        require(repo.passed_mark(ch.userId, ch.gameId, ch.levelId, ch.time));
        ch.reclaimed = true;
        address addr = repo.get_runner_address(ch.userId);
        payable(addr).transfer(ch.prize);
    }
}