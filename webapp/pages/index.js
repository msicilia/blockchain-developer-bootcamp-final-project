import Head from 'next/head'
import { useRef, useState } from "react";



export default function Home() {
  const [inputs, setInputs] = useState({});
  const get_name = useRef(null);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const speedrunnerExists = async () => {
    const name = get_name.current.value;
    const res = await fetch(`https://www.speedrun.com/api/v1/users/${name}`);
    const user = await res.json();
    return user.status=="404"? false : true;
  }
  
  
  const  handleSubmit = async (event) => {
    event.preventDefault();
    const result = await speedrunnerExists();
    alert(result);
  }

  return (
    <div>
      <h1>Motivate a speedrunner</h1>

      <form onSubmit={handleSubmit}>
       <label>Speedrunner name: <input type="text" 
                                ref={get_name}
                                name="username" 
                                className="formInput"
                                value={inputs.username || ""}
                                onChange={handleChange}/> </label>
       <label>Game name: <input type="text" 
                                name="gamename" 
                                className="formInput"
                                value={inputs.gamename || ""}
                                onChange={handleChange}/> </label>
       <label>Level name: <input type="text"
                                name="gamename" 
                                className="formInput"
                                value={inputs.levelname || ""}
                                onChange={handleChange}/> </label>
       <label>Time record (seconds): <input type="number" min="1"
                                name="timerecord" 
                                className="formInput"
                                value={inputs.levelname || ""}
                                onChange={handleChange}/> </label>
       <label>Amount (wei): <input type="number" min="0" 
                                name="amount" 
                                className="formInput"
                                value={inputs.amount || ""}
                                onChange={handleChange}/> </label>
       <input type="submit" className="submitButton" value="SEND"/>
      </form>

    </div>
  )
}
