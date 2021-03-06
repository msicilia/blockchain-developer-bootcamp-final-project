import Head from 'next/head'
import { useRef, useState } from "react";
import { Contract } from '@ethersproject/contracts'
import {  useEthers } from '@usedapp/core'
import { utils } from 'ethers'
import repoABI from '../contracts/StraightForwardMotivator.json';
import {  useContractFunction } from '@usedapp/core'
import { straightForwardMotivatorAddress } from '../contract_addresses.json'

export default function Home() {
  const [inputs, setInputs] = useState({});
  const get_player = useRef(null);
  const get_game = useRef(null);
  const get_level = useRef(null);
  const get_challenge = useRef(null);
  const get_reward= useRef(null);
  const { active } = useEthers()

  // console.log(straightForwardMotivatorAddress);
  //console.log(repoABI);

  const straightForwardMotivatorAbi = new utils.Interface(repoABI.abi);
  const contract = new Contract(straightForwardMotivatorAddress, straightForwardMotivatorAbi);
  const { state, send } = useContractFunction(contract, 'place_challenge', { transactionName: 'New Challenge' });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const speedrunnerExists = async () => {
    const playerid = get_player.current.value;
    // Check the runner exists. Note the API works with runner ids OR names!. 
    const res = await fetch(`https://www.speedrun.com/api/v1/users/${playerid}`);
    const user = await res.json();
    return user.data!==undefined
  }

  // TODO: Check that the game id and levelid are valid ids at speedrun.com
  
  const  handleSubmit = async (event) => {
    event.preventDefault();
    const playerid = await speedrunnerExists();
    if (!playerid) {
      alert(`Player does not appear to be a valid speedrun.com user.`);
      return;
    }
    if (active){
        const amount = utils.parseEther(get_reward.current.value);
        const id = get_player.current.value;
        const gameid = get_game.current.value;
        const levelid = get_level.current.value;
        const mark = get_challenge.current.value;
        console.log(amount.toString());
        send(id, gameid, levelid, mark, { value: amount })
    }else{
      alert("Please connect to Kovan with Metamask");
    }
  }

  return (
    <div>
      <h1>Motivate a speedrunner</h1>
      <form onSubmit={handleSubmit}>
       <label>Speedrunner id: <input type="text" 
                                ref={get_player}
                                name="username" 
                                className="formInput"
                                value={inputs.username || ""}
                                onChange={handleChange}
                                placeholder="type a speedruner id"/> </label>
       <label>Game id: <input type="text" 
                                ref={get_game}
                                name="gamename" 
                                className="formInput"
                                value={inputs.gamename || ""}
                                onChange={handleChange}
                                placeholder="type a game id"/> </label>
       <label>Level name: <input type="text"
                                ref={get_level}
                                name="levelname" 
                                className="formInput"
                                value={inputs.levelname || ""}
                                onChange={handleChange}
                                placeholder="level id for the game (may be blank)"/> </label>
       <label>Time challenge (seconds): <input type="number" min="1"
                                ref={get_challenge}
                                name="timerecord" 
                                className="formInput"
                                value={inputs.timerecord || ""}
                                onChange={handleChange}
                                placeholder="time you want the runner to hit (secs.)"/> </label>
       <label>Amount (ether): <input type="number" min="0" step="0.01"
                                ref={get_reward}
                                name="amount" 
                                className="formInput"
                                value={inputs.amount || ""}
                                onChange={handleChange}
                                placeholder="reward you pay to motivate the runner (ether)"/> </label>
       <input type="submit" className="submitButton" value="SEND"/>
      </form>

    </div>
  )
}
