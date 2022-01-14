import { useState, useRef, useEffect } from 'react';
import { isAddress } from '@ethersproject/address'; 
import { useContractFunction } from '@usedapp/core'
import repoABI from '../contracts/SpeedRunRepo_Stub.json';
import { speedRunRepoAddress } from '../contract_addresses.json'
import { Contract as ContractEthers} from '@ethersproject/contracts'
import Web3 from 'web3';
import { utils, getDefaultProvider } from 'ethers'

// import { useSpeedRunRepoContract } from '../hooks/useSpeedRunRepoContract.js';


const UserElement =  ({name, id}) => {
    const [getClicked, setClicked] = useState(false);
    const [getAddress, setAddress] = useState("");
    const get_address = useRef(null);
    const web3 = new Web3(Web3.givenProvider);
    const speedRunRepoAbi = new utils.Interface(repoABI.abi);
    const contract_eths = new ContractEthers(speedRunRepoAddress, speedRunRepoAbi);
    const contract = new web3.eth.Contract(repoABI.abi, speedRunRepoAddress );
    const { state, send} = useContractFunction(contract_eths, 'add_runner', { transactionName: `Adding runner address` });

    // effect runs on component mount
    useEffect(async () => {
        if (get_address.current) {
            await display_runner_address(id);
        }
    });

    const toggle = async () =>{
        setClicked(!getClicked)
    }
    
     const display_runner_address = async () =>{
        // check if the user is yet registered.
        // Third element of the SpeedRunner struct.   
      const runner = await contract.methods.runners(id).call();
      if (runner)
            get_address.current.value = runner[3];
    }

    const sendAddRunnerTx = async () => {
          const address =  get_address.current.value;
          // check if the address is a valid Ethereum address
          if (isAddress(address)){
              await send(name, id, address);
          }
    }

    return (
        <div>
            <p>
            <span className="userElement" onClick={toggle}>{name}</span>
           {!getClicked? 
                <span/>
                : 
                <span>
                <input className="userElementInput" ref={get_address} />
                <button onClick={sendAddRunnerTx}>update</button>
                </span>
            }
            </p>
        </div>
    )
}

export default UserElement
