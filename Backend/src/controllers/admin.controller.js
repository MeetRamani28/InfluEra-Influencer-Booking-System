const User = require("../model/user.model");
const Booking = require("../model/booking.model");

/**
 * =========================================
 * ADMIN DASHBOARD STATS
 * GET /api/admin/dashboard
 * ROLE: ADMIN
 * =========================================
 */
const getAdminDashboardStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const totalUsers = await User.countDocuments({
      role: "USER",
    });

    const totalInfluencers = await User.countDocuments({
      role: "INFLUENCER",
    });

    const totalBookingsToday = await Booking.countDocuments({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday },
      isActive: true,
    });

    const todayAppointments = await Booking.find({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday },
      isActive: true,
    })
      .populate("user", "fullName email")
      .populate("influencer", "fullName email")
      .sort({ appointmentDate: -1 });

    const confirmedToday = await Booking.countDocuments({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday },
      status: "CONFIRMED",
      isActive: true,
    });

    const pendingToday = await Booking.countDocuments({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday },
      status: "PENDING",
      isActive: true,
    });

    const cancelledToday = await Booking.countDocuments({
      appointmentDate: { $gte: startOfToday, $lte: endOfToday },
      status: "CANCELLED",
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalInfluencers,
        totalBookingsToday,
        confirmedToday,
        pendingToday,
        cancelledToday,
        todayAppointments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Admin Dashboard Stats",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminDashboardStats,
};
