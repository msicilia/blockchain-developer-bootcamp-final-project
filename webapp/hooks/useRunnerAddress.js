import { useContractCall } from "@usedapp/core";
import repoABI from '../contracts/SpeedRunRepo_Stub.json';
import { speedRunRepoAddress } from '../contract_addresses.json'

export function useRunnerAddress(runnerid) {
  const runnerinfo =
    useContractCall(
        {
          abi: repoABI.abi,
          address: speedRunRepoAddress,
          method: 'runners',
          args: [runnerid],
        }
    );
  return runnerinfo;
}