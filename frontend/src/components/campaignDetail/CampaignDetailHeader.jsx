import React from "react";
import { Box } from "@mui/system";
import { LinearProgress, Stack, Paper, Typography } from "@mui/material";
import { ethers } from "ethers";
import { calcFundingPercentage } from "../../utils";

function CampaignDetailHeader({ campaign }) {
  return (
    <Box sx={{ width: "80%", height: 600, display: "flex" }}>
      <Box sx={{ width: "80%", height: 600 }}>
        <Box
          component={"img"}
          src={campaign.image}
          sx={{
            width: "100%",
            height: "95%",
            objectFit: "cover",
            borderRadius: "50px",
            boxSizing: "border-box",
            px: 2,
            pt: 1,
          }}
        />
        <LinearProgress
          variant="determinate"
          value={calcFundingPercentage(
            ethers.utils.formatEther(campaign.balance),
            ethers.utils.formatEther(campaign.goal)
          )}
          sx={{
            mx: 3,
            my: 1,
            boxSizing: "border-box",
          }}
        />
      </Box>
      <Box sx={{ width: "20%", height: 600 }}>
        <Stack
          spacing={8}
          sx={{
            mx: 2,
            my: 1,
            boxSizing: "border-box",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              textAlign: "center",
              borderRadius: "25px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{campaign.daysLeft}</Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "primary.main",
              }}
            >
              <Typography variant="h6">Days Left</Typography>
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              textAlign: "center",
              borderRadius: "25px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                {ethers.utils.formatEther(campaign.balance)} ETH
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "primary.main",
              }}
            >
              <Typography variant="h6">
                Raised of {ethers.utils.formatEther(campaign.goal)} ETH
              </Typography>
            </Box>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              textAlign: "center",
              borderRadius: "25px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{campaign.funders.length}</Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "primary.main",
              }}
            >
              <Typography variant="h6">Contributers</Typography>
            </Box>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}

export default CampaignDetailHeader;
