const express = require('express');
const router = express.Router(); // Create a router instance
const db = require('../db');


const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

// User registration API
router.post('/register', async (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body;

  if (!username || !email || !password || !full_name || !age || !gender) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please provide all required fields: username, email, password, full_name, age, gender.'
    });
  }

  if (!passwordValidator.test(password)) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_PASSWORD',
      message: 'The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.'
    });
  }

  try {
    // Check for existing username
    const [existingUsername] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUsername.length > 0) {
      return res.status(409).json({
        status: 'error',
        code: 'USERNAME_EXISTS',
        message: 'The provided username is already taken. Please choose a different username.'
      });
    }

    // Check for existing email
    const [existingEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      return res.status(409).json({
        status: 'error',
        code: 'EMAIL_EXISTS',
        message: 'The provided email is already registered. Please use a different email address.'
      });
    }

    // Validate age
    if (!Number.isInteger(age) || age <= 0) {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_AGE',
        message: 'Invalid age value. Age must be a positive integer.'
      });
    }

    // Insert new user into the database
    const newUser = {
      username,
      email,
      password, // Store the plain text password as provided
      full_name,
      age,
      gender
    };

    const [result] = await db.query('INSERT INTO users SET ?', newUser);

    return res.status(201).json({
      status: 'success',
      message: 'User successfully registered!',
      data: {
        user_id: result.insertId,
        username,
        email,
        full_name,
        age,
        gender
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
      message: 'An internal server error occurred.'
    });
  }
});

module.exports = router;