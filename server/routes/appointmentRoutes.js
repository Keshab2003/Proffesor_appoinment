const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const {
    createAppointment,
    getStudentAppointments,
    getProfessorAppointments,
    updateAppointmentStatus,
    cancelAppointment
} = require('../controllers/appointmentController');

// Student routes
router.post('/create', authMiddleware, createAppointment);
router.get('/student', authMiddleware, getStudentAppointments);
router.delete('/cancel/:appointmentId', authMiddleware, cancelAppointment);

// Professor routes
router.get('/professor', authMiddleware, getProfessorAppointments);
router.patch('/status/:appointmentId', authMiddleware, updateAppointmentStatus);

module.exports = router; 