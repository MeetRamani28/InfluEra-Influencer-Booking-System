const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// ==============================
// 🔐 OAuth2 Configuration
// ==============================

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // MUST match what you used
);

// Set refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// ==============================
// 📧 Create Transporter
// ==============================
const createTransporter = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
};

// ==============================
// 📩 Generic Send Email Function
// ==============================

const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `"InfluEra Influencer-Booking-System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

// ==============================
// 🟢 Registration Email
// ==============================

const sendRegistrationEmail = async (userEmail, name) => {
  const subject = "Welcome to InfluEra Influencer-Booking-System!";
  const text = `Hello ${name},

Thank you for registering at InfluEra Influencer-Booking-System.

We're excited to have you on board!

Best regards,
The InfluEra Team`;

  const html = `
    <h2>Welcome ${name} 👋</h2>
    <p>Thank you for registering at <strong>InfluEra Influencer-Booking-System</strong>.</p>
    <p>We're excited to have you on board!</p>
    <br/>
    <p>Best regards,<br/>The InfluEra Team</p>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

/* ==============================
   BOOKING EMAILS
============================== */

const sendBookingCreatedEmail = async (
  influencerEmail,
  influencerName,
  userName,
  date
) => {
  await sendEmail(
    influencerEmail,
    "New Booking Request",
    `
      <h2>Hello ${influencerName}</h2>
      <p>You received a new booking request from <b>${userName}</b>.</p>
      <p><b>Date:</b> ${new Date(date).toLocaleString()}</p>
    `
  );
};

const sendBookingConfirmedEmail = async (userEmail, userName, date) => {
  await sendEmail(
    userEmail,
    "Booking Confirmed",
    `
      <h2>Hello ${userName}</h2>
      <p>Your booking has been <b>CONFIRMED</b>.</p>
      <p><b>Date:</b> ${new Date(date).toLocaleString()}</p>
    `
  );
};

const sendBookingCancelledEmail = async (
  influencerEmail,
  influencerName,
  date
) => {
  await sendEmail(
    influencerEmail,
    "Booking Cancelled",
    `
      <h2>Hello ${influencerName}</h2>
      <p>The booking scheduled on <b>${new Date(
        date
      ).toLocaleString()}</b> has been cancelled by the user.</p>
    `
  );
};

// ==============================
// 📦 Exports
// ==============================

module.exports = {
  sendRegistrationEmail,
  sendBookingCreatedEmail,
  sendBookingConfirmedEmail,
  sendBookingCancelledEmail,
};
