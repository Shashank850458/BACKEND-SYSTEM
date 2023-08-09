const express = require('express');
const router = express.Router(); // Create a router instance
const jwt = require('jsonwebtoken');
const secretKey = 'Mysecretkey123@';


// Generate Token API
router.post('/token', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        code: 'MISSING_FIELDS',
        message: 'Missing fields. Please provide both username and password.'
      });
    }
  
    const accessToken = generateAccessToken(username);
    const expiresIn = 3600; // seconds
  
    res.status(200).json({
      status: 'success',
      message: 'Access token generated successfully.',
      data: {
        access_token: accessToken,
        expires_in: expiresIn
      }
    });
  });
  
  function generateAccessToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  }
  
  // Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
  
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: 'Internal server error occurred. Please try again later.'
    });
  });
  
  // Handle invalid credentials
  router.use('/token', (req, res, next) => {
    // TODO: Check username and password against your user database
    // For demonstration purposes, let's assume the authentication fails
  
    res.status(401).json({
      status: 'error',
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid credentials. The provided username or password is incorrect.'
    });
  });
  

  module.exports = router;