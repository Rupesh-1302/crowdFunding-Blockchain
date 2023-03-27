import React, { useState, useEffect, useContext } from "react";
import {
  CampaignDetailHeader,
  CampaignDetailFooter,
} from "../components/campaignDetail";
import { useParams } from "react-router-dom";
import { Web3Context } from "../web3context/Web3Provider";
import { formatCampaign } from "../utils";

function CampaignDetail() {
  const [campaign, setCampaign] = useState(null);
  const [funders, setFunders] = useState(0);
  const { getCampaign, contractAddress, abi } = useContext(Web3Context);
  const { id } = useParams();
  useEffect(() => {
    const getCampaignData = async () => {
      const options = {
        contractAddress: contractAddress,
        abi: abi,
        functionName: "getCampaign",
        params: { _id: id },
      };
      const campaignData = await getCampaign({ params: options });
      setCampaign(formatCampaign(campaignData));
    };
    getCampaignData();
  }, [getCampaign, id, contractAddress, abi, funders]);
  return campaign ? (
    <>
      <CampaignDetailHeader campaign={campaign} />
      <CampaignDetailFooter campaign={campaign} setFunders={setFunders} />
    </>
  ) : (
    "Loading..."
  );
}

export default CampaignDetail;
