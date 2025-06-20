const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllCourses, getCourseById } = require('../controllers/courseController');

// Get all courses
router.route('/').get(authMiddleware, getAllCourses);

// Get course by ID
router.route('/:id').get(authMiddleware, getCourseById);

module.exports = router; 