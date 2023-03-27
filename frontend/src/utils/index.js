import { ethers } from "ethers";

export const formatCampaign = (campaign) => {
  const curDate = new Date();
  let newAmounts = [];
  for (let amount of campaign.amounts) {
    const newAmount = ethers.utils.formatEther(amount);
    newAmounts.push(newAmount);
  }
  return {
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    funders: campaign.funders,
    goal: campaign.goal?.toString(),
    balance: campaign.balance?.toString(),
    deadline: campaign.deadline?.toString(),
    amounts: newAmounts,
    image: campaign.image,
    id: campaign.id?.toString(),
    daysLeft: days(campaign.deadline, curDate),
  };
};

const days = (date_1, date_2) => {
  let difference = date_1 - date_2.getTime() / 1000;
  let TotalDays = Math.ceil(difference / (3600 * 24));
  return Math.max(TotalDays, 0);
};

export const calcFundingPercentage = (balance, goal) => {
  return Math.min((balance / goal) * 100, 100);
};
