import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboardStats } from "../../features/admin/AdminActions";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Skeleton,
} from "@mui/material";
import StatsSection from "../../components/atoms/StatsSection";
import TodayAppointmentsTable from "../../components/atoms/TodayAppointmentsTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Skeleton variant="text" width={250} height={40} />
        <Skeleton
          variant="rectangular"
          height={150}
          sx={{ mt: 4, borderRadius: 4 }}
        />
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ mt: 4, borderRadius: 4 }}
        />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box mb={5}>
          <Typography variant="h4" fontWeight="700" sx={{ color: "#0f172a" }}>
            Dashboard Overview
          </Typography>

          <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
            Welcome back, Admin. Here’s what’s happening today.
          </Typography>
        </Box>

        {/* Stats Section */}
        <StatsSection stats={dashboardStats} />

        {/* Table Section */}
        <Box mt={6}>
          <TodayAppointmentsTable
            appointments={dashboardStats?.todayAppointments}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
