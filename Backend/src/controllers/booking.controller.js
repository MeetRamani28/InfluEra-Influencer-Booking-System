const Booking = require("../model/booking.model");
const User = require("../model/user.model");
const emailService = require("../services/email.service");

/**
 * ----------------------------------------
 * CREATE BOOKING (USER + ADMIN)
 * POST /api/bookings
 * ----------------------------------------
 */
const createBooking = async (req, res) => {
  try {
    const { influencerId, appointmentDate, notes } = req.body;

    // Validate influencer exists
    const influencer = await User.findById(influencerId);

    if (!influencer || influencer.role !== "INFLUENCER") {
      return res.status(404).json({
        success: false,
        message: "Influencer Not Found",
      });
    }

    const booking = await Booking.create({
      influencer: influencerId,
      user: req.user._id,
      appointmentDate,
      notes,
    });

    // Email to influencer
    await emailService.sendBookingCreatedEmail(
      influencer.email,
      influencer.fullName,
      req.user.fullName,
      appointmentDate
    );

    return res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Creating Booking",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * GET MY BOOKINGS (USER)
 * GET /api/bookings/my
 * ----------------------------------------
 */
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
      isActive: true,
    })
      .populate("influencer", "fullName email")
      .sort({ appointmentDate: 1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Bookings",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * UPDATE BOOKING (ADMIN ONLY)
 * PUT /api/bookings/:id
 * ----------------------------------------
 */
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, appointmentDate, notes } = req.body;

    const booking = await Booking.findById(id);

    if (!booking || !booking.isActive) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (status) booking.status = status;
    if (appointmentDate) booking.appointmentDate = appointmentDate;
    if (notes) booking.notes = notes;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking Updated Successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Updating Booking",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * CANCEL BOOKING (USER)
 * PUT /api/bookings/:id/cancel
 * ----------------------------------------
 */
const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      user: req.user._id,
      isActive: true,
    }).populate("influencer", "fullName email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    if (booking.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Completed Booking Cannot Be Cancelled",
      });
    }

    booking.status = "CANCELLED";
    await booking.save();

    await emailService.sendBookingCancelledEmail(
      booking.influencer.email,
      booking.influencer.fullName,
      booking.appointmentDate
    );

    return res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error Cancelling Booking",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * DELETE BOOKING (ADMIN ONLY)
 * DELETE /api/bookings/:id
 * ----------------------------------------
 * Soft Delete
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    booking.isActive = false;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Deleting Booking",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * GET ALL BOOKINGS (ADMIN)
 * GET /api/bookings
 * ----------------------------------------
 */
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isActive: true })
      .populate("user", "fullName email")
      .populate("influencer", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Bookings",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * GET INFLUENCER BOOKINGS
 * GET /api/bookings/influencer
 * ROLE: INFLUENCER
 * ----------------------------------------
 */
const getInfluencerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      influencer: req.user._id,
      isActive: true,
    })
      .populate("user", "fullName email")
      .sort({ appointmentDate: 1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Fetching Influencer Bookings",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * UPDATE BOOKING STATUS (INFLUENCER)
 * PUT /api/bookings/:id/status
 * ROLE: INFLUENCER
 * ----------------------------------------
 */
const updateBookingStatusByInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["CONFIRMED", "COMPLETED", "CANCELLED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Status",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
      influencer: req.user._id,
      isActive: true,
    }).populate("user", "fullName email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    booking.status = status;
    await booking.save();

    if (status === "CONFIRMED") {
      await emailService.sendBookingConfirmedEmail(
        booking.user.email,
        booking.user.fullName,
        booking.appointmentDate
      );
    }

    return res.status(200).json({
      success: true,
      message: "Booking Status Updated Successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Updating Booking Status",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,
  getAllBookings,
  getInfluencerBookings,
  updateBookingStatusByInfluencer,
};
