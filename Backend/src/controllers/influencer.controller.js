const Booking = require("../model/booking.model");
const User = require("../model/user.model");

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

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayAppointments = await Booking.find({
      influencer: influencerId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
      isActive: true,
    })
      .populate("user", "fullName")
      .populate("influencer", "fullName");

    return res.status(200).json({
      success: true,
      data: {
        totalBookings,
        upcomingBookings,
        cancelledBookings,
        completedBookings,
        todayAppointments
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

/**
 * =========================================
 * GET ALL ACTIVE INFLUENCERS
 * GET /api/influencers
 * ROLE: USER
 * =========================================
 */
const getAllInfluencers = async (req, res) => {
  try {
    // Fetch all users with role INFLUENCER and isActive true
    const influencers = await User.find({
      role: "INFLUENCER",
      "influencerProfile.isActive": true,
    })
      .populate("influencerProfile.category", "name") // populate category name
      .select(
        "fullName email influencerProfile createdAt" // select required fields
      );

    return res.status(200).json({
      success: true,
      influencers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching influencers",
      error: error.message,
    });
  }
};

module.exports = {
  getInfluencerDashboardStats,
  getAllInfluencers,
};
