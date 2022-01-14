import { useRef, useState } from "react";
import repoABI from '../contracts/StraightForwardMotivator.json';
import {  useContractFunction } from '@usedapp/core'
import { straightForwardMotivatorAddress } from '../contract_addresses.json'
import { utils } from 'ethers'

import { Contract as ContractEthers} from '@ethersproject/contracts'
import Web3 from 'web3';


const Claim_prize = () => {
    const [inputs, setInputs] = useState({});
    const get_challenge = useRef(null);
    const get_text = useRef("");

    const straightForwardMotivatorAbi = new utils.Interface(repoABI.abi);
    const contract_eths = new ContractEthers(straightForwardMotivatorAddress, straightForwardMotivatorAbi);
    const { state, send} = useContractFunction(contract_eths, 'reclaim_prize', { transactionName: `Reclaiming prize` });
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(repoABI.abi, straightForwardMotivatorAddress );
  
    const  handleSubmit = async (event) => {
        event.preventDefault();
        const challengeid = get_challenge.current.value;
        if (challengeid){
            // TODO: check the challengeid exists.
            send(challengeid);
        }

    }

    const  handleCheck = async (event) => {
        event.preventDefault();
        const challengeid = get_challenge.current.value;
        const challenge = await contract.methods.challenges(challengeid).call();
        console.log(challenge);
        get_text.current.value=`${challenge["reclaimed"]?'RECLAIMED': 'PENDING'} : reward of ${utils.formatEther(challenge["prize"])} eth 
                  for ${challenge["userId"]}, when passing ${challenge["gameId"]} (level ${challenge["levelId"]}), 
                               in less than ${challenge["time"]} secs.`;
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    return (
        <div>
            <h1>Claim a prize for a speedrunner</h1>
            <form onSubmit={handleSubmit}>
            <label>Challenge id: <input type="number" min="0" max="100"
                                ref={get_challenge}
                                name="challenge" 
                                className="formInput"
                                value={inputs.challenge || ""}
                                onChange={handleChange}
                                placeholder="0"/> </label>
                <input type="submit" className="submitButton" value="CLAIM"/>
                <input type="button" className="submitButton" value="CHECK" onClick={handleCheck}/>
            </form>
            <p  ref={get_text}>{get_text.current.value}</p>
        </div>
    )
}

export default Claim_prize
