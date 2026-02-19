import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfluencerDashboard } from "../../features/influencer/InfluencerActions";
import {
  Box,
  Typography,
  Alert,
  Container,
  Skeleton,
  Divider,
} from "@mui/material";

import InfluencerStatsSection from "../../components/atoms/InfluencerStatsSection";
import TodayAppointmentsTable from "../../components/atoms/TodayAppointmentsTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { stats, loadingStats, errorStats } = useSelector(
    (state) => state.influencer
  );

  useEffect(() => {
    dispatch(fetchInfluencerDashboard());
  }, [dispatch]);

  if (loadingStats) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton
          variant="rectangular"
          height={120}
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

  if (errorStats) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {errorStats}
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
        <Box mb={5}>
          <Typography variant="h4" fontWeight="700" sx={{ color: "#0f172a" }}>
            Influencer Dashboard
          </Typography>

          <Typography variant="body1" sx={{ color: "#64748b", mt: 1 }}>
            Track your bookings, performance, and upcoming appointments.
          </Typography>
        </Box>

        {/* Stats */}
        <InfluencerStatsSection stats={stats || {}} />

        <Divider sx={{ my: 6 }} />

        {/* Today's Appointments */}
        <TodayAppointmentsTable appointments={stats?.todayAppointments || []} />
      </Container>
    </Box>
  );
};

export default Dashboard;
