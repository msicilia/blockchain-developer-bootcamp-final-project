import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useSpeedRunRepoContract } from '../hooks/useSpeedRunRepoContract.js';
import { isAddress } from '@ethersproject/address'; 
import { useWeb3React } from "@web3-react/core"


const UserElement = ({name, id}) => {
    const { chainId } = useWeb3React()
    const [getClicked, setClicked] = useState(false);
    const [getAddress, setAddress] = useState("");
    const { add_runner, fetch_runner } = useSpeedRunRepoContract();
    const get_address = useRef(null);


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
            const result = await fetch_runner(id);
            // Third element of the SpeedRunner struct.
            if (result)
                get_address.current.value = result[2];
    }
    const sendAddRunnerTx = async () => {
          const address =  get_address.current.value;
          // check if the address is a valid Ethereum address
          if (isAddress(address)){
              console.log(name, id, address);
            await add_runner(name, id, address);
            await display_runner_address();
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
                <input className="userElementInput" ref={get_address}/>
                <button onClick={sendAddRunnerTx}>update</button>
                </span>

            }
            </p>
        </div>
    )
}

export default UserElement
