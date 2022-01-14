// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./ISpeedRunRepo.sol";
// import "./bytesSwap.sol";

contract SpeedRunRepoOraclized is ChainlinkClient, ISpeedRunRepo {
    using Chainlink for Chainlink.Request;
    // Runners registered succesfully:
    mapping (string => SpeedRunner) public runners;
    // Runs registered succesfully:
    mapping (string => mapping (string => mapping (string => Run))) public runs; 
    // Temporary storage of add_runner requests
    mapping (bytes32 => SpeedRunner) private runner_requests;


    event RequestFulfilled(
        bytes32 indexed requestId,
        bytes indexed data
    );
    
    /**
     * Network: Rinkeby
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: d5270d1c311941d0b08bead21fea7747
     * Fee: 0.1 LINK
     */
    constructor() {
        setPublicChainlinkToken();
    }
    
    function passed_mark(string calldata userId, string calldata gameId, string calldata levelId,  uint mark) override external view returns (bool){
        return true;
    }

    function add_runner(string calldata _userName, string calldata _userId, address _addr) override external{
         bytes32 reqId = _requestAddress(_userId);
         runner_requests[reqId] = SpeedRunner(true, _userName, _userId, address(0));
    }

    ///
    function add_run(string calldata _userId, string calldata _gameId, string calldata _levelId,string calldata runId, uint mark) override external{}

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function _requestAddress(string calldata _userId) public returns (bytes32 requestId)
    {
        address oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        bytes32 specId = "7a97ff8493ec406d90621b2531f9251a";
        uint256 payment = 100000000000000000;
        Chainlink.Request memory request = buildChainlinkRequest(specId, address(this), this.fulfillRequestAddress.selector);

        // Set the URL to perform the GET request on
        request.add("get", "https://www.speedrun.com/api/v1/users/jp47vmyj");

            /* This is how the Json output for an API request for user info looks like:
                    {
            "data": {
            "id": "jp47vmyj",
            "names": {
            "international": "thefunambulista",
            "japanese": null
            },
            "weblink": "https://www.speedrun.com/user/thefunambulista",
            ...
            "role": "user",
            ...
            "twitch": {
            "uri": "https://www.twitch.tv/0xdEa3e18AA866f46DA789f0b908e90bF55A0dCa90"
            },
            */
        // The trick is that the user includes the address in one of the accounts, here we use twitch.
        request.add("path", "data.twitch.uri");
           
        // Sends the request
        //requestOracleData(request, payment);

        return sendChainlinkRequestTo(oracle, request, payment);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfillRequestAddress(bytes32 _requestId, bytes memory _addr) public recordChainlinkFulfillment(_requestId)
    {
        //string memory addr = bytesSwap.bytes32ToString(_addr);
        emit RequestFulfilled(_requestId, _addr);
        SpeedRunner memory temp = runner_requests[_requestId];
        //runners[temp.userId] = SpeedRunner(temp.userName, temp.userId, address(_addr));

    }
  
    function runner_registered(string memory _userId) public view returns (bool){
        return runners[_userId].isRunner;
     }

    function get_runner_address(string memory _userId) override external view returns (address){
         require(runner_registered(_userId));
         return runners[_userId].addr;
     }
}
