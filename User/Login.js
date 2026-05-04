import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    console.log('Login request body:', req.body);

    // Validation
    if (!password) {
      return res.status(201).json({ 
        success: false,
        message: 'Password is required' 
      });
    }

    if (!email && !phone) {
      return res.status(201).json({ 
        success: false,
        message: 'Either email or phone number is required' 
      });
    }
    // Find user by email or phone
    let user;
    
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    // Check if user exists
    if (!user) {
      console.log('User not found with email or phone:', email || phone);
      return res.status(201).json({ 
        success: false,
        message: 'User not found! try valid credentials or Register.' 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(201).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        phone: user.phone
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Send response with user info and token
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        // Add any other non-sensitive user data you want to return
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};