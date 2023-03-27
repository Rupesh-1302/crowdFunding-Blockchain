import React, { useContext } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import contractAddress from "./contractAddress.json";
import abi from "./contractABI.json";

export const Web3Context = React.createContext();

export default function Web3Provider({ children }) {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, account } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const { runContractFunction: getAllCampaigns } = useWeb3Contract({
    contractAddress: contractAddress[chainId],
    abi: abi,
    functionName: "getAllCampaigns",
  });

  const { runContractFunction: getUserCampaigns } = useWeb3Contract({
    contractAddress: contractAddress[chainId],
    abi: abi,
    functionName: "getUserCampaign",
  });

  const { runContractFunction: getCampaign } = useWeb3Contract();

  const { runContractFunction: fundCampaign } = useWeb3Contract();

  const { runContractFunction: getFunding } = useWeb3Contract({
    contractAddress: contractAddress[chainId],
    abi: abi,
    functionName: "getFunding",
  });

  const { runContractFunction: createCampaign } = useWeb3Contract();

  return (
    <Web3Context.Provider
      value={{
        getAllCampaigns,
        getUserCampaigns,
        getCampaign,
        createCampaign,
        fundCampaign,
        getFunding,
        account,
        isWeb3Enabled,
        contractAddress: contractAddress[chainId],
        abi,
        Moralis,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
