import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 1,
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Content */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#64748b", fontWeight: 500 }}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            sx={{ mt: 1, fontWeight: 700, color: "#0f172a" }}
          >
            {value}
          </Typography>
        </Box>

        {/* Icon Box */}
        <Box
          sx={{
            width: 55,
            height: 55,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
