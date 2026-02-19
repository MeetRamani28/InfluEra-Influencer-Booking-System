import { Grid } from "@mui/material";
import {
  People,
  PersonAdd,
  EventAvailable,
  CheckCircle,
  Schedule,
  Cancel,
} from "@mui/icons-material";
import StatCard from "./StatCard";

const StatsSection = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <People sx={{ color: "#2563eb" }} />,
      bgColor: "#dbeafe",
    },
    {
      title: "Total Influencers",
      value: stats?.totalInfluencers || 0,
      icon: <PersonAdd sx={{ color: "#16a34a" }} />,
      bgColor: "#dcfce7",
    },
    {
      title: "Total Bookings Today",
      value: stats?.totalBookingsToday || 0,
      icon: <EventAvailable sx={{ color: "#9333ea" }} />,
      bgColor: "#f3e8ff",
    },
    {
      title: "Confirmed Today",
      value: stats?.confirmedToday || 0,
      icon: <CheckCircle sx={{ color: "#059669" }} />,
      bgColor: "#d1fae5",
    },
    {
      title: "Pending Today",
      value: stats?.pendingToday || 0,
      icon: <Schedule sx={{ color: "#d97706" }} />,
      bgColor: "#fef3c7",
    },
    {
      title: "Cancelled Today",
      value: stats?.cancelledToday || 0,
      icon: <Cancel sx={{ color: "#dc2626" }} />,
      bgColor: "#fee2e2",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSection;
