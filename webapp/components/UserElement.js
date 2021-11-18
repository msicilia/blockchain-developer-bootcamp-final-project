import React from 'react'
import { useState, useRef } from 'react';
import { useSpeedRunRepoContract } from '../hooks/useSpeedRunRepoContract.js';
import { isAddress } from '@ethersproject/address'; 

const UserElement = ({name, id}) => {
    const [getClicked, setClicked] = useState(false);
    const { add_runner } = useSpeedRunRepoContract();
    const get_address = useRef(null);

    const toggle = () =>{
        setClicked(!getClicked)
    }
    
    const sendAddRunnerTx = async () => {
          const address =  get_address.current.value;
          if (isAddress(address)){
            await add_runner(name, id, address);
          }else{
              console.log(`Not a valid address: ${address}`);
          }
    }

    return (
        <div>
            <p>
            <span onClick={toggle}>{name}
            </span>
           {!getClicked? 
                <span/> 
                : 
                <span>
                
                <input placeholder="Paste address" ref={get_address}/>
                <button onClick={sendAddRunnerTx}>register</button>
                </span>
            }
            </p>
        </div>
    )
}

export default UserElement
