import React from 'react'
import { useRef, useState } from 'react';
import UserElement from '../components/UserElement.js'


const register_player = () => {
    const [getResult, setGetResult] = useState(null);
    const get_name = useRef(null);

    const getSpeedRunners = async () => {
        const name = get_name.current.value;
        const res = await fetch(`https://www.speedrun.com/api/v1/users?name=${name}`);
        const users = await res.json();
        setGetResult(users.data);
      }

    // console.log(speedrunners);
    return (
        <div>
            <h1>register an address</h1>
            <label>Search speedrunner names:</label>
            <input type="text" className="formInput" ref={get_name}/>
            <button onClick={getSpeedRunners} className="submitButton">Search</button>
            { getResult && getResult.map((sr) =>
                    <UserElement key={sr.id} name={sr.names.international} id={sr.id}/>
                    )}
        </div>
 
    )
}

export default register_player
/*
export const getStaticProps = async (username) => {
  const res = await fetch(`https://www.speedrun.com/api/v1/users?name=abc`);
  const users = await res.json();
  console.log(users);
  return {
      props: {
          speedrunners: users.data, 
      },
  }
}
*/