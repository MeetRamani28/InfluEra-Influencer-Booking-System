const User = require("../model/user.model");
const Category = require("../model/category.model");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../model/blackList.model");
const emailService = require("../services/email.service");

/**
 * Generate JWT Token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/**
 * ----------------------------------------
 * USER / INFLUENCER REGISTER
 * POST /api/auth/register
 * ----------------------------------------
 */
const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      city,
      price,
      followers,
      instagram,
      categoryName,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        status: "failed",
        message: "User Already Exists With This Email",
      });
    }

    let influencerProfile;

    if (role === "INFLUENCER") {
      if (!categoryName) {
        return res.status(400).json({
          message: "Category Name Is Required For Influencer",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Influencer Profile Image Is Required",
        });
      }

      const category = await Category.findOne({
        name: categoryName,
        isActive: true,
      });

      if (!category) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }

      influencerProfile = {
        influencerImage: req.file.buffer,
        city,
        price,
        followers,
        instagram,
        category: category._id,
      };
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      influencerProfile,
    });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    emailService
      .sendRegistrationEmail(user.email, user.fullName)
      .catch((err) => console.error("Registration Email Failed:", err.message));

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Registering User",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * LOGIN
 * POST /api/auth/login
 * ----------------------------------------
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email Or Password Is Invalid",
      });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return res.status(401).json({
        message: "Email Or Password Is Invalid",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Logging In User",
      error: error.message,
    });
  }
};

/**
 * ----------------------------------------
 * LOGOUT
 * POST /api/auth/logout
 * ----------------------------------------
 */
const logout = async (req, res) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(200).json({
        success: true,
        message: "User Logged Out Successfully",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expiresAt = new Date(decoded.exp * 1000);

    await tokenBlackListModel.create({
      token,
      expiresAt,
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  }
};

module.exports = { register, login, logout };
