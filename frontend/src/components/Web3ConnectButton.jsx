import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useMoralis } from "react-moralis";

function Web3ConnectButton() {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3EnabledLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (window.localStorage.getItem("connection")) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    const listener = Moralis.onAccountChanged(async () => {
      console.log(account);
      if (account === null) {
        await deactivateWeb3();
        window.localStorage.removeItem("connection");
      }
    });

    return () => {
      listener().removeAllListeners();
    };
  }, []);
  return (
    <Button
      variant="contained"
      color={isWeb3Enabled ? "success" : "primary"}
      sx={{ color: "white" }}
      onClick={async () => {
        await enableWeb3();
        window.localStorage.setItem("connection", "web3");
      }}
      disabled={isWeb3Enabled}
    >
      {isWeb3Enabled ? "Wallet Connected" : "Connect Wallet"}
    </Button>
  );
}

export default Web3ConnectButton;
