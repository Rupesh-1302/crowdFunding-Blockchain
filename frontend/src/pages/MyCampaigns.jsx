import React, { useEffect, useContext, useState } from "react";
import { DisplayCampaigns } from "../components";
import { Web3Context } from "../web3context/Web3Provider";
import { formatCampaign } from "../utils";
import { Typography } from "@mui/material";

function MyCampaigns() {
  const { getUserCampaigns, isWeb3Enabled, account } = useContext(Web3Context);
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    async function callGetCampaigns() {
      if (!isWeb3Enabled) return;
      const newCampaigns = await getUserCampaigns();
      setCampaigns(
        newCampaigns
          .filter((campaign) => {
            return campaign.title !== "";
          })
          .map(formatCampaign)
      );
    }

    callGetCampaigns();
  }, [isWeb3Enabled]);

  return account ? (
    campaigns.length > 0 ? (
      <DisplayCampaigns campaigns={campaigns} title={"My Campaigns"} />
    ) : (
      <Typography variant="h5">
        You have not created any campaigns yet
      </Typography>
    )
  ) : (
    "Please connect to your wallet"
  );
}

export default MyCampaigns;
