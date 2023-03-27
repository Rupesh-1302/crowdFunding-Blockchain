import React, { useEffect, useContext, useState } from "react";
import { Web3Context } from "../web3context/Web3Provider";
import { formatCampaign } from "../utils";
import { DonationList } from "../components";
import { ethers } from "ethers";
import { Typography } from "@mui/material";

function MyDonations() {
  const [campaigns, setCampaigns] = useState([]);
  const { getFunding, isWeb3Enabled, account } = useContext(Web3Context);
  useEffect(() => {
    async function callGetCampaigns() {
      if (!isWeb3Enabled) return;
      const fundings = await getFunding();
      setCampaigns(
        fundings.map((funding) => {
          let camp = formatCampaign(funding.campaign);
          camp.amountFunded = ethers.utils.formatEther(funding.amount);
          return camp;
        })
      );
    }

    callGetCampaigns();
  }, [isWeb3Enabled]);

  return account ? (
    campaigns.length > 0 ? (
      <DonationList campaigns={campaigns} title={"My Donations"} />
    ) : (
      <Typography variant="h5">
        You have not donated to any campaigns yet
      </Typography>
    )
  ) : (
    "Please connect to your wallet"
  );
}

export default MyDonations;
