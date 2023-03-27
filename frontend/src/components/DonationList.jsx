import React from "react";
import { Box, styled } from "@mui/system";
import { Typography, Paper } from "@mui/material";
import { CurrencyExchange } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(() => ({
  "&:hover": {
    background: "#353535",
    color: "#03C988",
    cursor: "pointer",
  },
  "&:hover .MuiTypography-p": {
    color: "#03C988",
  },
}));

function DonationList({ campaigns, title }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "80%" }}>
      <Typography
        variant="h5"
        component="h1"
        sx={{ my: 2, alignSelf: "flex-start" }}
      >
        {title} ({campaigns.length})
      </Typography>
      {campaigns.map((campaign, index) => {
        return (
          <StyledPaper
            key={index}
            elevation={2}
            sx={{
              display: "flex",
              px: 4,
              py: 2,
              borderRadius: "10px",
              my: 2,
              boxSizing: "border-box",
            }}
            onClick={() => navigate(`/campaign/${campaign.id}`)}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 4,
              }}
            >
              <CurrencyExchange fontSize="large" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                {campaign.title}
              </Typography>
              <Typography variant="p" sx={{ mb: 2 }} color="textSecondary">
                By : {campaign.owner}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="p" sx={{ mb: 2 }} color="textSecondary">
                {campaign.amountFunded} ETH
              </Typography>
            </Box>
          </StyledPaper>
        );
      })}
    </Box>
  );
}

export default DonationList;
