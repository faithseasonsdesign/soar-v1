

const express = require('express');
const router = express.Router();

const { registerUser } = require('../../controllers/usersController/usersController');

// Corrected route path with a leading '/'
router.post('/registerUser', registerUser);

module.exports = router;
