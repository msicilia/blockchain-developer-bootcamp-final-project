import React from 'react'
import { useRef, useState } from 'react';
import UserElement from '../components/UserElement.js'
import {  useEthers } from '@usedapp/core'


const Register_player = () => {
    const [getResult, setGetResult] = useState(null);
    const get_name = useRef(null);
    const { active } = useEthers()
    

    const getSpeedRunners = async () => {
        if (active){
        const name = get_name.current.value;
        const res = await fetch(`https://www.speedrun.com/api/v1/users?name=${name}`);
        const users = await res.json();
        setGetResult(users.data);
        }else{
            alert("Metamask is not connected to a valid network");
        }
      }

    return (
        <div>
            <h1>register an address</h1>
            <label>Search speedrunner names, then click on them to update:</label>
            <input type="text" className="formInput" ref={get_name}/>
            <button onClick={getSpeedRunners} className="submitButton">Search</button>
            { getResult && getResult.map((sr) =>
                    <UserElement key={sr.id} name={sr.names.international} id={sr.id}/>
                    )}
        </div>
 
    )
}

export default Register_player
