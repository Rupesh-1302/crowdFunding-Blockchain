import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardCustomizeRounded,
  CampaignRounded,
  VolunteerActivismRounded,
  ArchiveRounded,
} from "@mui/icons-material";
import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";

const drawerWidth = 70;

const StyledListItemButton = styled(ListItemButton)(() => ({
  "&.Mui-selected": {
    color: "#03C988",
  },
  "&.Mui-selected .sidebar-icon": {
    color: "#03C988",
  },
}));

function Sidebar() {
  const [sideBarList, setSideBarList] = useState([
    {
      name: "Dashboard",
      icon: <DashboardCustomizeRounded />,
      active: true,
      path: "/",
    },
    {
      name: "My Campaigns",
      icon: <CampaignRounded />,
      active: false,
      path: "/mycampaigns",
    },
    {
      name: "My Donations",
      icon: <VolunteerActivismRounded />,
      active: false,
      path: "/mydonations",
    },
    {
      name: "Archive",
      icon: <ArchiveRounded />,
      active: false,
      path: "/archive",
    },
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const newList = sideBarList.map((item) => {
      item.path === location.pathname
        ? (item.active = true)
        : (item.active = false);
      return item;
    });
    setSideBarList(newList);
  }, [location]);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {sideBarList.map((item) => (
          <ListItem key={item.name} disablePadding>
            <StyledListItemButton
              selected={item.active}
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.5,
              }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <Tooltip title={item.name} placement="right">
                <ListItemIcon
                  className="sidebar-icon"
                  sx={{
                    minWidth: 0,
                    mr: "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
