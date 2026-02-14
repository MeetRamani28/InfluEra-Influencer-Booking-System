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

// ==============================
// 💰 Transaction Success Email
// ==============================

const sendTransactionEmail = async (userEmail, name, amount, toAccount) => {
  const subject = "Transaction Successful!";
  const text = `Hello ${name},

Your transaction of $${amount} to account ${toAccount} was successful.

Best regards,
The InfluEra Team`;

  const html = `
    <h2>Transaction Successful ✅</h2>
    <p>Hello ${name},</p>
    <p>Your transaction of <strong>$${amount}</strong> to account 
    <strong>${toAccount}</strong> was successful.</p>
    <br/>
    <p>Best regards,<br/>The InfluEra Team</p>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

// ==============================
// ❌ Transaction Failure Email
// ==============================

const sendTransactionFailureEmail = async (
  userEmail,
  name,
  amount,
  toAccount
) => {
  const subject = "Transaction Failed";
  const text = `Hello ${name},

We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed.

Please try again later.

Best regards,
The InfluEra Team`;

  const html = `
    <h2>Transaction Failed ❌</h2>
    <p>Hello ${name},</p>
    <p>Your transaction of <strong>$${amount}</strong> to account 
    <strong>${toAccount}</strong> has failed.</p>
    <p>Please try again later.</p>
    <br/>
    <p>Best regards,<br/>The InfluEra Team</p>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

// ==============================
// 📦 Exports
// ==============================

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};
