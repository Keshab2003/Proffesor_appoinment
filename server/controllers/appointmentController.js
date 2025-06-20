const Appointment = require('../models/Appointment');
const Professor = require('../models/Professor');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { professorId, courseId, date, startTime, endTime, purpose, notes } = req.body;
        const studentId = req.body.userId; // From auth middleware

        // Check if professor exists
        const professor = await Professor.findById(professorId);
        if (!professor) {
            return res.status(404).json({ success: false, message: 'Professor not found' });
        }

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Create new appointment
        const appointment = new Appointment({
            student: studentId,
            professor: professorId,
            course: courseId,
            date,
            startTime,
            endTime,
            purpose,
            notes
        });

        await appointment.save();
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all appointments for a student
exports.getStudentAppointments = async (req, res) => {
    try {
        const studentId = req.body.userId;
        const appointments = await Appointment.find({ student: studentId })
            .populate('professor', 'name email department')
            .populate('course', 'name code')
            .sort({ date: -1 });
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all appointments for a professor
exports.getProfessorAppointments = async (req, res) => {
    try {
        const professorId = req.body.userId;
        const appointments = await Appointment.find({ professor: professorId })
            .populate('student', 'name email studentId')
            .populate('course', 'name code')
            .sort({ date: -1 });
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;
        const professorId = req.body.userId;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        if (appointment.professor.toString() !== professorId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.body.userId;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        if (appointment.student.toString() !== userId && appointment.professor.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to cancel this appointment' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 