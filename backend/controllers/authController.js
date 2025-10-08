const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password, skills, bio } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // 2. Create new user
    const result = await User.create({
      name,
      email,
      password,
        skills: skills || null,  // Handle undefined values
  bio: bio || null         // Handle undefined values
    //   skills,
      //bio
    });

    // 3. Generate JWT token
    const token = generateToken(result.insertId);

    // 4. Return success response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        skills,
        bio
      }
    });

  } catch (error) {
    console.log('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup'
    });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 2. Verify password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 3. Generate JWT token
    const token = generateToken(user.id);

    // 4. Return success response (exclude password)
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        bio: user.bio,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.log('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

module.exports = {
  signup,
  login
};