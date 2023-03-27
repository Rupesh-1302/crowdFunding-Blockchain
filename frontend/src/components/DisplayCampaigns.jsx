import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function DisplayCampaigns({ campaigns, title = "CAMPAIGNS" }) {
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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 8, lg: 12, xl: 16 }}
      >
        {campaigns.map((campaign) => {
          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={campaign.id}
              onClick={() => {
                navigate(`/campaign/${campaign.id}`);
              }}
            >
              <Card sx={{ maxWidth: 300, borderRadius: "10px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="150"
                    image={campaign.image}
                    sx={{ borderRadius: "10px" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {campaign.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {campaign.description.substring(0, 35).concat("...")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        my: 2,
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="body2">
                          {ethers.utils.formatEther(campaign.balance)} ETH
                        </Typography>
                        <Typography variant="body2" color={"text.secondary"}>
                          Raised of {ethers.utils.formatEther(campaign.goal)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          {campaign.daysLeft}
                        </Typography>
                        <Typography variant="body2" color={"text.secondary"}>
                          Days Left
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ display: "flex" }}>
                        <Typography
                          variant="body2"
                          color={"text.secondary"}
                          sx={{ mr: 1 }}
                        >
                          by
                        </Typography>{" "}
                        {campaign.owner.substring(0, 30).concat("...")}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DisplayCampaigns;
