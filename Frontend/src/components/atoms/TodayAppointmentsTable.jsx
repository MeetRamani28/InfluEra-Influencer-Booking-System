import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const getStatusColor = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "success";
    case "PENDING":
      return "warning";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
};

const TodayAppointmentsTable = ({ appointments }) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Today's Appointments
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Influencer</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {appointments && appointments.length > 0 ? (
              appointments.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.user?.fullName}</TableCell>
                  <TableCell>{booking.influencer?.fullName}</TableCell>
                  <TableCell>
                    {new Date(booking.appointmentDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No Appointments Today
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TodayAppointmentsTable;
