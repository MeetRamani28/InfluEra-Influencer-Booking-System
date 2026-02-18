const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const { initializeGoogleStrategy } = require("./services/googleAuth.service");

const authRouter = require("./routes/auth.routes");
const categoryRouter = require("./routes/category.routes");
const bookingRouter = require("./routes/booking.routes");
const userRouter = require("./routes/user.routes");
const influencerRouter = require("./routes/influencer.routes");
const adminRouter = require("./routes/admin.routes");

// ==============================
// 🌍 CORS
// ==============================

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ==============================
// 🔧 Middlewares
// ==============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==============================
// 🛡 Session (Required for Passport)
// ==============================

app.use(
  session({
    name: "influera.sid",
    secret:
      process.env.EXPRESS_SESSION_SECRET ||
      "INFLUERAINFLUENCERBOOKINGSYSTEMSESSIONSECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ==============================
// 🔥 Passport Init
// ==============================

initializeGoogleStrategy();
app.use(passport.initialize());
app.use(passport.session());

// ==============================
// 📌 Routes
// ==============================

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/influencer", influencerRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("InfluEra Backend is up and running! ✨");
});

// ==============================
// ❌ Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Only image files are allowed!") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

module.exports = app;
