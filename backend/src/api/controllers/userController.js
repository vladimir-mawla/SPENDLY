const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const crypto = require("crypto")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if ( !first_name || !last_name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Validate email and password
  if (
    !validator.isStrongPassword(password, [
      {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      },
    ])
  ) {
    res.status(400)
    throw new Error("Password is not valid")
  }

  if (!validator.isEmail(email)) {
    res.status(400)
    throw new Error("Email is not valid")
  }

  // Check if user exists
  const userExists = await User.exists({
    $or: [{ email: email }],
  })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  })

  // Send user info and token
  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;

  // return new user
  res.status(201).json(user);

})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check for user email
  const user = await User.findOne(
    { email },
    { password: 1, first_name: 1, last_name: 1, email: 1 }
  )
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  // Check password and respond
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
  
    // return new user
    res.status(201).json(user);
  } else {
    res.status(400)
    throw new Error("Invalid Credentials")
  }
})

// @desc    Update a user
// @route   PUT /api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  const {
    first_name,
    last_name,
    email,
  } = req.body

  // check email
  if (email && email != user.email) {
    const userExists = await User.exists({ email: email })
    if (userExists) {
      res.status(400)
      throw new Error("Email Taken")
    }
  }

  // validate and update inputs
  user.first_name = first_name ? first_name : user.first_name
  user.last_name = last_name ? last_name : user.last_name
  user.email = email ? email : user.email

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
  log(req, res, updatedUser)
})

// @desc    Get user data
// @route   GET /api/users
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    upload user image
// @route   POST /api/users/upload
// @access  Private
const uploadProfilePic = asyncHandler(async (req, res) => {
  const user = req.user
  const link = req.file.location

  if (!link) {
    res.status(400)
    throw new Error("Please Try Again")
  }

  user.logoURL = link

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
  log(req, res, updatedUser)
})

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  getCurrentUser,
  requestResetPassword,
  uploadProfilePic,
}
