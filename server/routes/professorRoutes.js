const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllProfessors, getProfessorById } = require('../controllers/professorController');

// Get all professors
router.route('/').get(authMiddleware, getAllProfessors);

// Get professor by ID
router.route('/:id').get(authMiddleware, getProfessorById);

module.exports = router; 