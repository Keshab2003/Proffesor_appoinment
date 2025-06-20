const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Professor = require('../models/Professor');
const Student = require('../models/Student');
const config = require('../config/config');

// Register a new professor
exports.registerProfessor = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        // Check if professor already exists
        let professor = await Professor.findOne({ email });
        if (professor) {
            return res.status(400).json({ success: false, message: 'Professor already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new professor
        professor = new Professor({
            name,
            email,
            password: hashedPassword,
            department
        });

        await professor.save();

        // Create JWT token
        const token = jwt.sign(
            { id: professor._id, role: 'professor' },
            config.jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: professor._id,
                name: professor.name,
                email: professor.email,
                role: 'professor'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const { name, email, password, studentId, department } = req.body;

        // Check if student already exists
        let student = await Student.findOne({ email });
        if (student) {
            return res.status(400).json({ success: false, message: 'Student already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new student
        student = new Student({
            name,
            email,
            password: hashedPassword,
            studentId,
            department
        });

        await student.save();

        // Create JWT token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            config.jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: student._id,
                name: student.name,
                email: student.email,
                role: 'student'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login user (both professor and student)
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        let user;
        if (role === 'professor') {
            user = await Professor.findOne({ email });
        } else {
            user = await Student.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role },
            config.jwtSecret,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const role = req.body.role;

        let user;
        if (role === 'professor') {
            user = await Professor.findById(userId).select('-password');
        } else {
            user = await Student.findById(userId).select('-password');
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}; 