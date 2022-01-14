import { useContract } from './useContract';
import SP_REPO_ABI from '../contracts/SpeedRunRepo_Stub.json';
//import useIsValidNetwork from '../hooks/useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { isAddress } from '@ethersproject/address'; 
import { speedRunRepoAddress } from '../contract_addresses.json'
// import { useAppContext } from '../AppContext';
//import { formatUnits, parseEther } from '@ethersproject/units';
//import { useEffect } from 'react';
import { utils } from 'ethers'


export const useSpeedRunRepoContract = () => {
  const {chainId } = useWeb3React();
  //const { isValidNetwork } = useIsValidNetwork();

  //const spRepoContractAddress = contractAddress(chainId);
  //if (isValidNetwork){
    // console.log(speedRunRepoAddress);
    const speedRunRepoAbi = new utils.Interface(SP_REPO_ABI.abi);
    const spRepoContract = useContract(speedRunRepoAddress, speedRunRepoAbi);
  //}else{
    //alert("Metamask is not connected to a valid network");
  //}
  // const { setCTokenBalance, setExchangeRate, setTxnStatus, cTokenBalance, exchangeRate } = useAppContext();

  //const fetchCTokenBalance = async () => {
  //  const cTokenBalance = await cTokenContract.balanceOf(account);
  //  setCTokenBalance(formatUnits(cTokenBalance, 8));
  //};

  //const getCTokenExchangeRate = async () => {
  //  try {
  //    let exchangeRateCurrent = await cTokenContract.callStatic.exchangeRateCurrent();
  //    exchangeRateCurrent = exchangeRateCurrent / Math.pow(10, 18 + 18 - 8);
  //    setExchangeRate(exchangeRateCurrent);
  //  } catch (error) {
  //    console.log(error);
  //  }
  //};

  
  const add_runner = async (userName, userId, addr) => {
    if (isValidNetwork) {
      try {
        console.log("sending transaction");
        //setTxnStatus('LOADING');
        const txn = await spRepoContract.add_runner(
          userName,
          userId,
          addr
        );
        await txn.wait(1);
        // await fetchCTokenBalance();
        //setTxnStatus('COMPLETE');
    } catch (error) {
        console.log(error);
        //setTxnStatus('ERROR');
    }
  }else{
    alert("Metamask is not connected to a valid network");
  }
  };
  const fetch_runner = async (userId) => {
    try {
      //setTxnStatus('LOADING');
      const result = await spRepoContract.runners(
        userId
      );
      return result;
      //const result = await txn.wait(1);
      //setTxnStatus('COMPLETE');
    } catch (error) {
      console.log(error);
      //setTxnStatus('ERROR');

  }
}
/* 
  useEffect(() => {
    if (account) {
      getCTokenExchangeRate();
    }
  }, [account]);
*/
   return {
      add_runner,
      fetch_runner
  };

};