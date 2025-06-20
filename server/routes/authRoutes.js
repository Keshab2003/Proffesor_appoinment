const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
    registerProfessor,
    registerStudent,
    login,
    getCurrentUser
} = require('../controllers/authController');

// Public routes
router.post('/register/professor', registerProfessor);
router.post('/register/student', registerStudent);
router.post('/login', login);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router; 