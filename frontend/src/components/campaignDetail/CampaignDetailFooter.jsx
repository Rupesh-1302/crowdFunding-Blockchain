import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Stack, Paper, TextField, Button } from "@mui/material";
import { Web3Context } from "../../web3context/Web3Provider";
import { AppProvider } from "../../App";

function CampaignDetailFooter({ campaign, setFunders }) {
  const { setOpenBackDrop, setOpenSnackbar } = useContext(AppProvider);
  const { fundCampaign, contractAddress, abi, Moralis } =
    useContext(Web3Context);
  const [amount, setAmount] = useState("");

  const handleFund = async () => {
    try {
      const options = {
        contractAddress: contractAddress,
        abi: abi,
        functionName: "fundCampaign",
        params: {
          _id: campaign.id,
        },
        msgValue: Moralis.Units.ETH(amount),
      };
      setOpenBackDrop(true);
      const transaction = await fundCampaign({ params: options });
      const transactionReciept = await transaction.wait(1);
      setOpenBackDrop(false);
      setOpenSnackbar({
        open: true,
        message: "Funded Successfully",
        severity: "success",
      });
      setAmount("0");
      setFunders((prev) => prev + 1);
    } catch (error) {
      setOpenBackDrop(false);
      setOpenSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
      console.log(error);
    }
  };

  return (
    <Box sx={{ px: 2, width: "80%" }}>
      {campaign.daysLeft === 0 && (
        <Typography variant="h6" sx={{ mt: 1 }} color="error">
          This Campaign is closed
        </Typography>
      )}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", width: "70%", mt: 4 }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            CREATOR
          </Typography>
          <Typography variant="p" sx={{ mb: 2 }} color="textSecondary">
            {campaign.owner}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            STORY
          </Typography>
          <Typography variant="p" sx={{ mb: 2 }} color="textSecondary">
            {campaign.description}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            DONATORS
          </Typography>
          <Stack spacing={1}>
            {campaign.funders.map((funder, index) => (
              <Box sx={{ display: "flex" }} key={index}>
                <Typography
                  variant="p"
                  sx={{ mb: 2, flexGrow: 1 }}
                  color="textSecondary"
                >
                  {index + 1}. {funder}
                </Typography>
                <Typography variant="p" sx={{ mb: 2 }} color="textSecondary">
                  {campaign.amounts[index]}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            mt: 4,
            ml: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            FUND
          </Typography>
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Typography variant="p" color={"textSecondary"} sx={{ pb: 2 }}>
              Pledge without reward
            </Typography>
            <TextField
              fullWidth
              type="number"
              inputProps={{
                min: "0",
                step: "0.01",
              }}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              label="ETH"
              variant="outlined"
              sx={{ mb: 2 }}
            ></TextField>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
                p: 2,
                backgroundColor: "#283149",
                borderRadius: "5px",
              }}
            >
              <Typography variant="body2" sx={{ mb: 2 }}>
                Back it because you belive in it
              </Typography>
              <Typography variant="body2" color={"textSecondary"}>
                Support the project for no reward because it speaks to you
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleFund}
              disabled={
                campaign.daysLeft === 0 || amount <= "0" || amount === ""
              }
            >
              FUND
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default CampaignDetailFooter;
