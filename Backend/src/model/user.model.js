const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const influencerProfileSchema = new mongoose.Schema(
  {
    influencerImage: {
      type: Buffer,
    },

    city: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      min: [0, "Price Cannot Be Negative"],
    },

    followers: {
      type: Number,
      min: [0, "Followers Count Cannot Be Negative"],
    },

    instagram: {
      type: String,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name Is Required"],
      trim: true,
      minlength: [3, "Full Name Must Be At Least 3 Characters Long"],
    },

    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: [true, "Email Already Exists, Please Use Another Email Address"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please Provide A Valid Email Address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password Is Required"],
      minlength: [6, "Password Must Be At Least 6 Characters Long"],
      select: false,
    },

    role: {
      type: String,
      enum: {
        values: ["ADMIN", "INFLUENCER", "USER"],
        message: "Role Must Be ADMIN, INFLUENCER Or USER",
      },
      default: "USER",
      required: [true, "Role Is Required"],
    },

    influencerProfile: {
      type: influencerProfileSchema,
      required: function () {
        return this.role === "INFLUENCER";
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);
