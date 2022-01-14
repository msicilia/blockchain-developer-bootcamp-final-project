const StraightForwardMotivator = artifacts.require("StraightForwardMotivator");
const SpeedRunRepo_Stub = artifacts.require("SpeedRunRepo_Stub");


contract("StraightForwardMotivator", (accounts) => {
    before(async () => {
        const _name =  'itsdarious555';
        const _id = 'xz7vpk0j';
        const _address = accounts[1];
        const _gameid = 'w6j4e56j';
        const _levelid = '';
        const _runid = 'yw0gggnm';
        const _mark = 751;

        const inst = await SpeedRunRepo_Stub.deployed();
        await inst.add_runner(_name, _id, _address);
        await inst.add_run(_id, _gameid, _levelid, _runid, _mark);
    })

   it("Should allow placing challenges", async () =>{
        const _id = 'xz7vpk0j';
        const _gameid = 'w6j4e56j';
        const _levelid = '';
        const _mark = 800;
        const inst = await StraightForwardMotivator.deployed();
        await inst.place_challenge(_id, _gameid, _levelid, _mark, {from: accounts[2], value: web3.utils.toWei("0.1", 'ether')});
        const challenge = await inst.challenges(0);
        assert.equal(challenge.userId, _id);
        assert.equal(challenge.gameId, _gameid);
        assert.equal(challenge.levelId, _levelid);
        assert.equal(challenge.time, _mark);
        assert.equal(challenge.prize, web3.utils.toWei("0.1", 'ether'));
        assert.equal(challenge.reclaimed, false);
        assert.equal(challenge.sender, accounts[2]);

   });

   it("Should allow reclaiming prizes if the challenge was achieved.", async () =>{
    const inst = await StraightForwardMotivator.deployed();
    const initial_balance = await web3.eth.getBalance(accounts[1]); // this is the account of the runner.
    await inst.reclaim_prize(0);
    const final_balance = await web3.eth.getBalance(accounts[1]); 
    assert.isTrue(web3.utils.toBN(initial_balance).add(web3.utils.toBN(web3.utils.toWei("0.1", 'ether'))).eq(web3.utils.toBN(final_balance)), "The prize has not been transferred.");
    const challenge = await inst.challenges(0);
    assert.equal(challenge.reclaimed, true);

  });

  it("Should NOT allow reclaiming prizes already reclaimed.", async () =>{
    const inst = await StraightForwardMotivator.deployed();
    try{
        await inst.reclaim_prize(0);
    } catch(error){ // It is expected the error will be catched here.
        return;
    } 
    assert.fail("Reclaiming a prize already reclaimed should have produced an error.");
  });

  it("Should NOT allow reclaiming prizes NOT achieved.", async () =>{
    const _id = 'xz7vpk0j';
    const _gameid = 'w6j4e56j';
    const _levelid = '';
    const _mark = 1;
    const inst = await StraightForwardMotivator.deployed();
    await inst.place_challenge(_id, _gameid, _levelid, _mark, {from: accounts[3], value: web3.utils.toWei("0.2", 'ether')});
    try{
      await inst.reclaim_prize(1);
    }catch(error){
      const challenge = await inst.challenges(1);
      assert.equal(challenge.reclaimed, false);
      return;
    }
    assert.fail("Reclaiming a prize not achieved should have reverted the transaction.");
    
  });

  it("Should allow the owner destroy the contract and reimburse pending challenges", async () =>{
    const _id = 'xz7vpk0j';
    const _gameid = 'w6j4e56j';
    const _levelid = '';
    const _mark = 10;
    const inst = await StraightForwardMotivator.deployed();
    const initial_balance = await web3.eth.getBalance(accounts[3]); // this is the account of the sender of the challenge.
    await inst.return_funds_and_destroy();
    const final_balance = await web3.eth.getBalance(accounts[3]); 
    assert.isTrue(web3.utils.toBN(initial_balance).add(web3.utils.toBN(web3.utils.toWei("0.2", 'ether'))).eq(web3.utils.toBN(final_balance)), "The prize has not been reimbursed.");

  
  });

  it("Should not allow placing challenges on a destroyed motivator contract.", async () =>{
    const _id = 'xz7vpk0j';
    const _gameid = 'w6j4e56j';
    const _levelid = '';
    const _mark = 10;
    const inst = await StraightForwardMotivator.deployed();
    // After the destruction, the contract is paused for ever.
    // Calling relevant functions then will revert with a message like this:
    // Error: Returned error: VM Exception while processing transaction: revert Pausable: paused -- Reason given: Pausable: paused.
    try{
       await inst.place_challenge(_id, _gameid, _levelid, _mark);
    } catch(error){ // It is expected the error will be catched here.
        return;
    }    
    assert.fail("A revert was expected when sending a transaction to the paused contract.");
  });
  
})
