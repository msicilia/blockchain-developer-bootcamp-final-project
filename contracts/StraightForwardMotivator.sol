// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import "./MotivatorBase.sol";

/// @title A barebones motivator, that simply sends the amounts on the challenges to the speedrunner on reclaim.
/// @author msicilia.eth

abstract contract StraightForwardMotivator is MotivatorBase{
    constructor(address _speedRunRepo) MotivatorBase(_speedRunRepo) {}

    function reclaim(string calldata _challengeId) external override {
        require(challenges[_challengeId].time != 0, "ChallengeId not found.");
        Challenge memory ch = challenges[_challengeId];
        if (repo.passed_mark(ch.userId, ch.gameId, ch.levelId, ch.time)){
            // repo.getUserAddress(ch.userId);  ... and send the money
        }
    }
}