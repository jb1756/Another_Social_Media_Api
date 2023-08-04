const express = require('express');
const router = express.Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

// This is for API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;