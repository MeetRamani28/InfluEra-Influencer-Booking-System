const Booking = require("../model/booking.model");

/**
 * =========================================
 * INFLUENCER DASHBOARD STATS
 * GET /api/influencer/dashboard
 * ROLE: INFLUENCER
 * =========================================
 */
const getInfluencerDashboardStats = async (req, res) => {
  try {
    const influencerId = req.user._id;

    const now = new Date();

    const totalBookings = await Booking.countDocuments({
      influencer: influencerId,
      isActive: true,
    });

    const upcomingBookings = await Booking.countDocuments({
      influencer: influencerId,
      appointmentDate: { $gt: now },
      status: { $in: ["PENDING", "CONFIRMED"] },
      isActive: true,
    });

    const cancelledBookings = await Booking.countDocuments({
      influencer: influencerId,
      status: "CANCELLED",
      isActive: true,
    });

    const completedBookings = await Booking.countDocuments({
      influencer: influencerId,
      status: "COMPLETED",
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        totalBookings,
        upcomingBookings,
        cancelledBookings,
        completedBookings,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Influencer Dashboard Stats",
      error: error.message,
    });
  }
};

module.exports = {
  getInfluencerDashboardStats,
};
