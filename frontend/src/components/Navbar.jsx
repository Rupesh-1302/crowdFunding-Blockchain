import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Web3ConnectButton from "./Web3ConnectButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useMoralis } from "react-moralis";

export default function Navbar() {
  const navigate = useNavigate();
  const { isWeb3Enabled } = useMoralis();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            CROWD FUNDING
          </Typography>
          <Web3ConnectButton />
          {isWeb3Enabled && (
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => {
                navigate("/createCampaign");
              }}
            >
              Create new campaign
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
