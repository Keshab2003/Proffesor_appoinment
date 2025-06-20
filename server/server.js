const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const professorRoutes = require('./routes/professorRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Connect to Database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/courses', courseRoutes);

// Root Route for testing
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Professor Appointment API is running...',
        environment: config.nodeEnv,
        port: config.port
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: err.message || 'An internal server error occurred.' 
    });
});

// Start Server
const server = app.listen(config.port, () => {
    console.log(`Server is running in ${config.nodeEnv} mode on port ${config.port}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:'.red.bold, err);
    // Close server & exit process
    server.close(() => process.exit(1));
});




