import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import {  useEthers } from '@usedapp/core'
import { useNotifications } from '@usedapp/core'



export const shortenAddress = (address, num = 3) => {
    if (!address) return '';
    return !!address && `${address.substring(0, num + 2)}...${address.substring(address.length - num - 1)}`;
  };


  const NotificationElement = ({ transaction, txname, title, type, date }) => {
    return (
        <li>
         {type} - {txname? txname:""} - {type=="transactionSucceed"? transaction.receipt:""} -
         {transaction? <a href={"https://kovan.etherscan.io/tx/"+ transaction.hash} target="_blank" rel="noopener noreferrer">See transaction at Etherscan</a> : ""}
        </li>
    )
  }

const Nav = () => {
    const { activateBrowserWallet, account } = useEthers();
    const { notifications } = useNotifications()

    function attempt_connect(){
        activateBrowserWallet();
    }

    return (
        <>
        <div className={navStyles.nav}>
            <img src='sr-logo-white.png' className="img-fluid"/>
            <ul>
                <li>
                    <Link href="/">Place a challenge</Link>
                </li>
                <li>
                    <Link href="/register_player">Register player</Link>
                </li>
                <li>
                    <Link href="/register_play">Record a speedrun</Link>
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
                <button onClick={() => attempt_connect()}>
                    {account ? `Connected to kovan: ${shortenAddress(account)}` : `Connect to Metamask (use Kovan)`}
                </button>
                </li>
                </ul>
                <img src='metamask.png' className="img-fluid"/>

        </div>
        <div className={navStyles.notif}><ul>  
        {notifications.map((notification) => {
          if ('transaction' in notification)
            return (
              <NotificationElement
                key={notification.id}
                title={"transaction"}
                type={notification.type}
                transaction={notification.transaction}
                txname={notification.transactionName}
                date={Date.now()}
              />
            )
          else
            return (
              <NotificationElement
                key={notification.id}
                type={notification.type}
                title={notification.type}
                date={Date.now()}
              />
            )
        })}</ul> </div>
        </>
    )
}

export default Nav
