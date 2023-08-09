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

// Retrieve Data API
router.get('/data/:key', verifyAccessToken, async (req, res) => {
  const { key } = req.params;

  if (!key) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please provide a valid key.',
    });
  }

  try {
    // Retrieve data from the data table based on the key
    const [result] = await db.query('SELECT value FROM data WHERE `key` = ?', [key]);

    if (result.length === 0) {
      return res.status(404).json({
        status: 'error',
        code: 'KEY_NOT_FOUND',
        message: 'The provided key does not exist in the database.',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        key,
        value: result[0].value,
      },
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
