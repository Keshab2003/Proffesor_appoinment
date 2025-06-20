const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const Professor = require('../models/Professor');
const Course = require('../models/Course');
const Student = require('../models/Student');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

async function getHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const seed = async () => {
    try {
        await Professor.deleteMany();
        await Course.deleteMany();
        await Student.deleteMany();

        // Professors
        const professor1 = new Professor({
            name: "Dr. Sarah Johnson",
            email: "sarah.johnson@university.edu",
            password: await getHashedPassword("password123"),
            department: "Computer Science",
            bio: "Expert in Artificial Intelligence and Machine Learning"
        });
        const professor2 = new Professor({
            name: "Prof. Michael Chen",
            email: "michael.chen@university.edu",
            password: await getHashedPassword("password123"),
            department: "Computer Science",
            bio: "Specialist in Data Structures and Algorithms"
        });
        const professor3 = new Professor({
            name: "Dr. Emily Davis",
            email: "emily.davis@university.edu",
            password: await getHashedPassword("password123"),
            department: "Mathematics",
            bio: "Expert in Calculus and Mathematical Analysis"
        });
        const professor4 = new Professor({
            name: "Prof. Robert Wilson",
            email: "robert.wilson@university.edu",
            password: await getHashedPassword("password123"),
            department: "Physics",
            bio: "Specialist in Quantum Mechanics and Modern Physics"
        });
        await Professor.insertMany([professor1, professor2, professor3, professor4]);

        // Courses
        const course1 = new Course({
            name: "Introduction to Programming",
            code: "CS101",
            description: "Fundamental concepts of programming and problem solving",
            department: "Computer Science",
            professors: [professor1._id]
        });
        const course2 = new Course({
            name: "Data Structures and Algorithms",
            code: "CS201",
            description: "Advanced data structures and algorithmic techniques",
            department: "Computer Science",
            professors: [professor2._id]
        });
        const course3 = new Course({
            name: "Calculus I",
            code: "MATH101",
            description: "Introduction to differential and integral calculus",
            department: "Mathematics",
            professors: [professor3._id]
        });
        const course4 = new Course({
            name: "Physics Fundamentals",
            code: "PHY101",
            description: "Basic principles of classical physics",
            department: "Physics",
            professors: [professor4._id]
        });
        await Course.insertMany([course1, course2, course3, course4]);

        // Student
        const student = new Student({
            name: "Test Student",
            email: "student@example.com",
            password: await getHashedPassword("password123"),
            studentId: "S1001",
            department: "Computer Science",
            enrolledCourses: [course1._id, course2._id]
        });
        await student.save();

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

seed(); 