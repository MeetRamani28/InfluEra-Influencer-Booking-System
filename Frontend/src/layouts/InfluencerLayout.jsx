import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/molecules/InfluencerSidebar";
import Topbar from "../components/molecules/InfluencerTopbar";

const InfluencerLayout = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#f8fafc" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar />

        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default InfluencerLayout;
