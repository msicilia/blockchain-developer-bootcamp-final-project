const SpeedRunRepo_Stub = artifacts.require("SpeedRunRepo_Stub");

contract("SpeedRunRepo_Stub", (accounts) => {
   it("Should store new data of speedrunners", async () =>{
        const _name =  'thefunambulista';
        const _id = 'jp47vmyj';
        const _address = '0xDd59Fd14BCF6Da7C084882801D99462cea6dC1A1';
        const inst = await SpeedRunRepo_Stub.deployed();
        await inst.add_runner(_name, _id, _address);
        const new_runner = await inst.runners(_id);
        assert.isOk(new_runner);
        assert.equal(_name, new_runner.userName);
        assert.equal(_id, new_runner.userId);
        assert.equal(_address, new_runner.addr);

   });
    it("Should add data for a new run of an existing runner", async () => {
        // This data corresponds to a run of this user:
        // https://www.speedrun.com/api/v1/runs?user=xz7vpk0j
        const _name =  'itsdarious555';
        const _id = 'xz7vpk0j';
        const _address = '0xDd59Fd14BCF6Da7C084882801D99462cea6dC1A1';
        const _gameid = 'w6j4e56j';
        const _levelid = '';
        const _runid = 'yw0gggnm';
        const _mark = 751;

        const inst = await SpeedRunRepo_Stub.deployed();
        await inst.add_runner(_name, _id, _address);
        await inst.add_run(_id, _gameid, _levelid, _runid, _mark);
        const new_run = await inst.runs(_id, _gameid, _levelid, 0);
        assert.isOk(new_run);
        assert.equal(new_run.runId, _runid);

    });
    it("Should NOT add data for a new run of a non existing runner", async () => {
        const _id = 'nonexisting';
        const _gameid = 'w6j4e56j';
        const _levelid = '';
        const _runid = 'yw0gggnm';
        const _mark = 9;

        const inst = await SpeedRunRepo_Stub.deployed();
        try{
            await inst.add_run(_id, _gameid, _levelid, _runid, _mark);
        }catch(error){ // It is expected the error will be catched here.
        }    
    });
    })
