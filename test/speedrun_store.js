const SpeedRunRepo_Stub = artifacts.require("SpeedRunRepo_Stub");

contract("SpeedRunRepo_Stub", (accounts) => {
   it("Should store addresses of speedrunners", () =>{
        const _name =  'thefunambulista';
        const _id = 'jp47vmyj';
        const _address = '0xDd59Fd14BCF6Da7C084882801D99462cea6dC1A1';
        const inst = SpeedRunRepo_Stub.deployed();
        inst.add_player.call(_name, _id, _address);
        assert.equal(_name, inst.accounts[_id]).name;
   });
    it("something", () => {
        SpeedRunRepo_Stub.deployed();
        assert.equal(true, true);
    });
})
