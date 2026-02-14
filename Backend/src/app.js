const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");

const authRouter = require("./routes/auth.routes");
const categoryRouter = require("./routes/category.routes");
const bookingRouter = require("./routes/booking.routes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("InfluEra Backend is up and running!✨");
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  if (err instanceof multer.MulterError) {
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
