const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const secretKey = 'Mysecretkey123@';

// Middleware to verify access token
function verifyAccessToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid access token provided.',
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        code: 'INVALID_TOKEN',
        message: 'Invalid access token provided.',
      });
    }
    req.userId = decoded.user_id;
    next();
  });
}

// Store Data API
router.post('/data', verifyAccessToken, async (req, res) => {
    const { key, value } = req.body;
  
    if (!key) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_KEY',
        message: 'Invalid key. Please provide a valid key.',
      });
    }

    if (!value) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_VALUE',
        message: 'Invalid value. Please provide a valid value.',
      });
    }

    try {
      // Check if the key already exists
      const [existingData] = await db.query('SELECT * FROM data WHERE `key` = ?', [key]);
      if (existingData.length > 0) {
        return res.status(409).json({
          status: 'error',
          code: 'KEY_EXISTS',
          message: 'The provided key already exists in the database. To update an existing key, use the update API.',
        });
      }

      // Insert or update data in the data table
      const [result] = await db.query(
        'INSERT INTO data (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
        [key, value, value]
      );
  
      return res.status(200).json({
        status: 'success',
        message: 'Data stored successfully.',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        code: 'SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  });
  
module.exports = router;

