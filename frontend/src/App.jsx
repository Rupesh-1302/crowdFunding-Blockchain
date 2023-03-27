import React, { useState } from "react";
import { Navbar, Sidebar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Dashboard,
  MyCampaigns,
  MyDonations,
  CampaignDetail,
  CreateCampaign,
  Archive,
} from "./pages";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Backdrop,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { PageWrapper } from "./components";
import { Web3Provider } from "./web3context";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    success: {
      main: "#03C988",
    },
  },
});

export const AppProvider = React.createContext();

function App() {
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  return (
    <AppProvider.Provider value={{ setOpenBackDrop, setOpenSnackbar }}>
      <Web3Provider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar />
            <PageWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/mycampaigns" element={<MyCampaigns />} />
                  <Route path="/mydonations" element={<MyDonations />} />
                  <Route path="/campaign/:id" element={<CampaignDetail />} />
                  <Route path="/createCampaign" element={<CreateCampaign />} />
                  <Route path="/archive" element={<Archive />} />
                </Routes>
              </LocalizationProvider>
            </PageWrapper>
          </Box>
          <Backdrop
            open={openBackDrop}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="success" />
              <Typography variant="h5">Transaction Under Progress</Typography>
            </Box>
          </Backdrop>
          <Snackbar
            open={openSnackbar.open}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
          >
            <Alert
              onClose={() => setOpenSnackbar({ ...openSnackbar, open: false })}
              severity={openSnackbar.severity}
              sx={{ width: "100%" }}
            >
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </Web3Provider>
    </AppProvider.Provider>
  );
}

export default App;
