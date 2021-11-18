import { useContract } from './useContract';
import SP_REPO_ABI from '../contracts/SpeedRunRepo_Stub.json';
// import useIsValidNetwork from '../hooks/useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
// import { useAppContext } from '../AppContext';
import { formatUnits, parseEther } from '@ethersproject/units';
import { useEffect } from 'react';

export const useSpeedRunRepoContract = () => {
  const { account } = useWeb3React();
  // const { isValidNetwork } = useIsValidNetwork();
  const spRepoContractAddress = '0x1071737962A9723F2369e5A2B5e2ddEa0b94d2dB'; // ganache
  const spRepoContract = useContract(spRepoContractAddress, SP_REPO_ABI);
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
    //if (account /* && isValidNetwork*/) {
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
    //}
  };
/* 
  useEffect(() => {
    if (account) {
      getCTokenExchangeRate();
    }
  }, [account]);
*/
   return {
      add_runner,
  };
  /*
  return {
    cTokenBalance,
    exchangeRate,
    getCTokenExchangeRate,
    fetchCTokenBalance,
    deposit,
  };
  */
};