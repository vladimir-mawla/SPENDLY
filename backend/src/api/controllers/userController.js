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
    websiteAddress,
    country,
    city,
    phone,
    about,
    settings,
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
  user.websiteAddress = websiteAddress
  user.country = country
  user.city = city
  user.phone = phone
  user.about = about
  user.settings = settings ? settings : user.settings

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
  log(req, res, updatedUser)
})

// @desc    Reset a user password
// @route   POST /api/users/reset
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token, password } = req.body

  if (!userId || !token || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check token
  let passwordResetToken = await Token.findOne({ userId })
  if (!passwordResetToken) {
    res.status(400)
    throw new Error("Invalid or expired password reset token")
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token)
  if (!isValid) {
    res.status(400)
    throw new Error("Invalid or expired password reset token")
  }

  // Validate password
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

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Check for user and update
  const user = await User.findById({ _id: userId })
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  user.password = hashedPassword
  user.save()

  // Send success email
  const userName = `${user.first_name} ${user.last_name}`
  const link = `${process.env.CLIENT_URL}/login`
  sendEmail(
    user.email,
    "Password reset successfully",
    {
      name: userName,
      link: link,
    },
    "src/api/helpers/templates/resetDone.handlebars"
  )

  await passwordResetToken.deleteOne()

  res.status(201).json({ message: "Password reset successfully" })
  log(req, res, user)
})

// @desc    Request a reset user password
// @route   POST /api/users/request.reset
// @access  Public
const requestResetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error("Please add your email")
  }

  // Check for user email
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error("User not found")
  }

  // check for token and delete if exists
  let token = await Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  // create new token
  const resetToken = crypto.randomBytes(32).toString("hex")
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(resetToken, salt)

  // save token
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save()

  // send email with the reset link
  const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&id=${user._id}`
  const userName = `${user.first_name} ${user.last_name}`
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: userName, link: link },
    "src/api/helpers/templates/resetPassword.handlebars"
  )

  res.status(200).json({ message: "Email Sent" })
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
