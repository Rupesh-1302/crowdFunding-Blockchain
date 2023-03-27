import React, { useEffect, useContext, useState } from "react";
import { DisplayCampaigns } from "../components";
import { Web3Context } from "../web3context/Web3Provider";
import { formatCampaign } from "../utils";
import { Typography } from "@mui/material";

function Archive() {
  const { getAllCampaigns, isWeb3Enabled, account } = useContext(Web3Context);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function callGetCampaigns() {
      if (!isWeb3Enabled) return;
      const newCampaigns = await getAllCampaigns();
      setCampaigns(
        newCampaigns
          .map(formatCampaign)
          .filter((campaign) => campaign.daysLeft === 0)
      );
    }

    callGetCampaigns();
  }, [isWeb3Enabled]);

  return account ? (
    campaigns.length > 0 ? (
      <DisplayCampaigns campaigns={campaigns} title={"Archive"} />
    ) : (
      <Typography variant="h5">There are no campaigns to Archive</Typography>
    )
  ) : (
    "Please connect to your wallet"
  );
}

export default Archive;
