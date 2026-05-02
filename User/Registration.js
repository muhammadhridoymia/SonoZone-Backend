import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name,email, phone, password, } = req.body;
    console.log('Registration request body:', req.body);

    // Validation
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    if (!email && !phone) {
      return res.status(400).json({ 
        message: 'Either email or phone number is required' 
      });
    }

    // Check if user already exists
    let existingUser;

    if (email) {
      existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
    }

    if (phone) {
      existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this phone number already exists' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name: name || '',
      email: email ? email.toLowerCase() : null,
      phone: phone || null,
      password: hashedPassword,
      // You can add more fields like role, isVerified, etc.
    });

    console.log('New user object before saving:', newUser);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response with user info and token
    res.status(201).json({
      success: true,
      user: {
        name: newUser.name,
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};