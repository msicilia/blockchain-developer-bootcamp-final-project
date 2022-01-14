import React from 'react'

const about = () => {
    return (
        <div>
            <h1>About</h1>
            <p>This is a sample DApp to launch challenges to users 
                in <b><a href="https://www.speedrun.com/">speedrun.com</a></b></p>
            <p>Be sure to connect your MetaMask wallet (to Kovan network).
            </p>
            In a nutshell, this works as follows:
            <ul>
            <li>
                Speedrunners can register themselves (or being registered by others) at the <b>&ldquo;register player&ldquo;</b> menu item. This just stores in the corresponding smart contract an Ethereum address associated to a speedrun.com user name and id.
            </li>
            <li>Then, somebody may <b>&ldquo;place a challenge&ldquo;</b>, locking some Ether into a smart contract, 
            as a motivation for some player to beat a given time speedrunning for some game.</li>
            <li>Eventually, somebody will <b>&ldquo;record a speedrun&ldquo;</b> that can be matched against some of the challenges.</li>
            <li>Finally, you can <b>&ldquo;claim a prize&ldquo;</b> for a challenge for yourself of for other
                speedrunner.
            </li>
            </ul>
            <p>Of course, registering addresses for players and record speedruns should be done via <i>decentralized oracles</i>, but this is just a demo in which that functionality is not implemented.</p>
        </div>
    )
}

export default about
