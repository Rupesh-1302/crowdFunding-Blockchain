import React, { useState, useContext } from "react";
import { Box } from "@mui/system";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Web3Context } from "../web3context/Web3Provider";
import { useNavigate } from "react-router-dom";
import { AppProvider } from "../App";

function CreateCampaign() {
  const [goal, setGoal] = useState(0);
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  const { setOpenBackDrop, setOpenSnackbar } = useContext(AppProvider);
  const { createCampaign, contractAddress, abi, Moralis } =
    useContext(Web3Context);
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const options = {
        contractAddress: contractAddress,
        abi: abi,
        functionName: "createCampaign",
        params: {
          _title: title,
          _description: description,
          _image: image,
          _goal: Moralis.Units.ETH(goal),
          _deadline: endDate.valueOf() / 1000,
        },
      };
      setOpenBackDrop(true);
      const transaction = await createCampaign({ params: options });
      const transactionRecipt = await transaction
        .wait(1)
        .then((res) => res)
        .catch((err) => console.log(err));
      navigate(`/campaign/${transactionRecipt.events[0].args.id.toNumber()}`);
      setOpenBackDrop(false);
      setOpenSnackbar({
        open: true,
        message: "Campaign Created Successfully",
        severity: "success",
      });
    } catch (err) {
      setOpenBackDrop(false);
      setOpenSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
      console.log(err);
    }
  }

  return (
    <Paper
      sx={{
        width: "80%",
        mt: 4,
        p: 2,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ mb: 8 }}>
        Start a Campaign
      </Typography>
      <Box sx={{ width: "100%", display: "flex", mb: 4 }}>
        <TextField
          required
          fullWidth
          sx={{ mr: 4 }}
          variant="outlined"
          label="Your Name"
          placeholder="Rupesh Agarwal"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <TextField
          required
          fullWidth
          variant="outlined"
          label="Campaign Title"
          placeholder="Write a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <TextField
        required
        label="Story"
        variant="outlined"
        multiline
        rows={10}
        fullWidth
        placeholder="Write your story"
        sx={{ mb: 4 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box sx={{ width: "100%", display: "flex", mb: 4 }}>
        <TextField
          required
          fullWidth
          type="number"
          inputProps={{
            min: "0",
            step: "0.1",
          }}
          sx={{ mr: 4, pt: 1 }}
          variant="outlined"
          label="Goal"
          placeholder="2 ETH"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
          <DatePicker
            label="End Date"
            sx={{ width: "100%" }}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
          />
        </DemoContainer>
      </Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          required
          fullWidth
          sx={{ mr: 4 }}
          variant="outlined"
          label="Campaign Image"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ width: "20%", mt: 4 }}
        onClick={() => {
          handleClick();
        }}
      >
        Submit Campaign
      </Button>
    </Paper>
  );
}

export default CreateCampaign;
