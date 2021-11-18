import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import { injected } from "../components/wallet/connectors"
import { useWeb3React } from "@web3-react/core"

export const shortenAddress = (address, num = 3) => {
    if (!address) return '';
    return !!address && `${address.substring(0, num + 2)}...${address.substring(address.length - num - 1)}`;
  };

export const networkName = (networkId) => {
    switch(networkId){
        case 1:
            return "mainnet";
        case 3:
            return "ropsten";
        case 4:
            return "rinkeby";
        case 5:
            return "goerli";
        case 42:
            return "kovan";
        default:
            return networkId;
    }
  };

const Nav = () => {
    const { active, account, activate, chainId } = useWeb3React()

    async function connect() {
        try {
          await activate(injected)
        } catch (ex) {
          console.log(ex)
        }
      }

    return (
        <div className={navStyles.nav}>
            <img src='sr-logo-white.png' className="img-fluid"/>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/register_player">Register player</Link>
                </li>
                <li>
                    <Link href="/claim_prize">Claim a prize</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
               
            </ul>   
               <ul>
                <li>
                   {active ?
                     <div><small><b>{shortenAddress(account)}({networkName(chainId)})</b></small></div>
                    : <div><button onClick={connect}>Connect to Metamask</button>
                      </div>
                    }
                </li>
                </ul>
                <img src='metamask.png' className="img-fluid"/>

        </div>
    )
}

export default Nav
