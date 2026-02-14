const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    influencer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Influencer Is Required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Is Required"],
    },

    appointmentDate: {
      type: Date,
      required: [true, "Appointment Date Is Required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Appointment Date Must Be In The Future",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
        message: "Status Must Be PENDING, CONFIRMED, COMPLETED Or CANCELLED",
      },
      default: "PENDING",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes Cannot Exceed 500 Characters"],
    },

    isActive: {
      type: Boolean,
      default: true, // Soft delete support
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

bookingSchema.index({ influencer: 1, appointmentDate: 1 }, { unique: true });

bookingSchema.index({ influencer: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
