import React from 'react'

const about = () => {
    return (
        <div>
            <h1>About</h1>
            <p>This is a sample DApp to launch challenges to users 
                in <b><a href="https://www.speedrun.com/">speedrun.com</a></b></p>
            <p>Be sure to connect your MetaMask wallet, and then submit your 
                challenge at the home of this site.
            </p>
            <p>
                Speedrunners can also register themselves (or others) at the register
                link. This just stores in the DApp an Ethereum address to a speedrun.com user name.
            </p>
            <p>Finally, you can claim a reward for a challenge for yourself of for other
                speedrunner.
            </p>
        </div>
    )
}

export default about
