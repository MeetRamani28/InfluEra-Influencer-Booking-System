const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");
const bookingController = require("../controllers/booking.controller");

router.post(
  "/",
  authMiddleware("USER", "ADMIN"),
  bookingController.createBooking
);
router.get("/my", authMiddleware("USER"), bookingController.getMyBookings);
router.get(
  "/influencer",
  authMiddleware("INFLUENCER"),
  bookingController.getInfluencerBookings
);
router.put(
  "/:id/status",
  authMiddleware("INFLUENCER"),
  bookingController.updateBookingStatusByInfluencer
);
router.put(
  "/:id/cancel",
  authMiddleware("USER"),
  bookingController.cancelBooking
);

router.get("/", authMiddleware("ADMIN"), bookingController.getAllBookings);
router.put("/:id", authMiddleware("ADMIN"), bookingController.updateBooking);
router.delete("/:id", authMiddleware("ADMIN"), bookingController.deleteBooking);

module.exports = router;
