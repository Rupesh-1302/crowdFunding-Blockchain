// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract CrowdFunding {
    event CampaignCreated(uint256 id);
    event CampaignFunded(uint256 id, uint256 amount);
    error DeadlinePassed(uint256 deadline);
    error CampaignDoesNotExist(uint256 id);
    error TransferFailed();

    struct Campaign {
        address owner;
        uint256 id;
        string title;
        string description;
        string image;
        uint256 goal;
        uint256 deadline;
        uint256 balance;
        address[] funders;
        uint256[] amounts;
    }

    struct Funding {
        Campaign campaign;
        uint256 amount;
    }

    mapping(uint256 => Campaign) campaigns;
    mapping(address => Funding[]) fundings;
    uint256 public campaignCount = 0;

    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _goal,
        uint256 _deadline
    ) public returns (uint256) {
        if (_deadline < block.timestamp) {
            revert DeadlinePassed(_deadline);
        }
        campaigns[campaignCount] = Campaign(
            msg.sender,
            campaignCount,
            _title,
            _description,
            _image,
            _goal,
            _deadline,
            0,
            new address[](0),
            new uint256[](0)
        );
        campaignCount++;
        emit CampaignCreated(campaignCount - 1);
        return campaignCount - 1;
    }

    function fundCampaign(uint256 _id) public payable {
        if (_id >= campaignCount) {
            revert CampaignDoesNotExist(_id);
        }
        require(
            campaigns[_id].deadline > block.timestamp,
            "Campaign has ended"
        );
        (bool success, ) = payable(campaigns[_id].owner).call{value: msg.value}(
            ""
        );
        if (!success) {
            revert TransferFailed();
        }
        campaigns[_id].funders.push(msg.sender);
        campaigns[_id].amounts.push(msg.value);
        campaigns[_id].balance += msg.value;
        fundings[msg.sender].push(Funding(campaigns[_id], msg.value));
        emit CampaignFunded(_id, msg.value);
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        for (uint256 i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function getCampaign(uint256 _id) public view returns (Campaign memory) {
        if (_id >= campaignCount) {
            revert CampaignDoesNotExist(_id);
        }
        return campaigns[_id];
    }

    function getFunders(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        if (_id >= campaignCount) {
            revert CampaignDoesNotExist(_id);
        }
        return (campaigns[_id].funders, campaigns[_id].amounts);
    }

    function getFunding() public view returns (Funding[] memory) {
        return fundings[msg.sender];
    }

    function getUserCampaign() public view returns (Campaign[] memory) {
        Campaign[] memory userCampaigns = new Campaign[](campaignCount);
        uint256 count = 0;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].owner == msg.sender) {
                userCampaigns[count] = campaigns[i];
                count++;
            }
        }
        return userCampaigns;
    }
}
