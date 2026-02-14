const User = require("../model/user.model");

/**
 * ========================================
 * GET MY PROFILE
 * ========================================
 */
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "influencerProfile.category",
      "name description"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ========================================
 * UPDATE MY PROFILE (USER / INFLUENCER)
 * ========================================
 */
const updateMyProfile = async (req, res) => {
  try {
    const { fullName, password, city, price, followers, instagram, category } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (fullName) user.fullName = fullName;
    if (password) user.password = password;

    if (user.role === "INFLUENCER") {
      if (!user.influencerProfile) user.influencerProfile = {};

      if (city) user.influencerProfile.city = city;
      if (price !== undefined) user.influencerProfile.price = price;
      if (followers !== undefined) user.influencerProfile.followers = followers;
      if (instagram) user.influencerProfile.instagram = instagram;
      if (category) user.influencerProfile.category = category;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ========================================
 * ADMIN: CREATE USER
 * ========================================
 */
const createUserByAdmin = async (req, res) => {
  try {
    const { fullName, email, password, role, influencerProfile } = req.body;

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      influencerProfile: role === "INFLUENCER" ? influencerProfile : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ========================================
 * ADMIN: GET ALL USERS
 * ========================================
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("influencerProfile.category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ========================================
 * ADMIN: UPDATE USER
 * ========================================
 */
const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, role, city, price, followers, instagram, category } =
      req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (fullName) user.fullName = fullName;
    if (role) user.role = role;

    if (role === "INFLUENCER") {
      if (!user.influencerProfile) user.influencerProfile = {};

      if (city) user.influencerProfile.city = city;
      if (price !== undefined) user.influencerProfile.price = price;
      if (followers !== undefined) user.influencerProfile.followers = followers;
      if (instagram) user.influencerProfile.instagram = instagram;
      if (category) user.influencerProfile.category = category;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ========================================
 * ADMIN: DELETE USER (SOFT DELETE RECOMMENDED)
 * ========================================
 */
const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "Admin Cannot Delete Himself",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  createUserByAdmin,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
};
