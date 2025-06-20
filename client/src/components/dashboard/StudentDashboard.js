import React, { useState } from 'react';
import BookAppointment from '../appointments/BookAppointment';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [activeTab, setActiveTab] = useState('appointments');

    // Dummy data for upcoming appointments
    const upcomingAppointments = [
        {
            id: 1,
            professor: 'Dr. Sarah Johnson',
            subject: 'Computer Science',
            date: '2024-03-20',
            time: '10:00 AM',
            status: 'confirmed'
        },
        {
            id: 2,
            professor: 'Dr. Michael Brown',
            subject: 'Mathematics',
            date: '2024-03-22',
            time: '2:30 PM',
            status: 'pending'
        }
    ];

    // Dummy data for past appointments
    const pastAppointments = [
        {
            id: 3,
            professor: 'Dr. Emily Davis',
            subject: 'Physics',
            date: '2024-03-15',
            time: '11:00 AM',
            status: 'completed'
        }
    ];

    return (
        <div className="student-dashboard">
            <div className="dashboard-container">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <h1 className="welcome-title">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="welcome-subtitle">
                        Department of {user?.department || 'Computer Science'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                    <div className="tabs-nav">
                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                        >
                            Book Appointment
                        </button>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                        >
                            Upcoming Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
                        >
                            Past Appointments
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className={`content-container ${activeTab === 'appointments' ? 'book-appointment-container' : ''}`}>
                    {activeTab === 'appointments' && (
                        <div>
                            <h2 className="content-title">Book New Appointment</h2>
                            <BookAppointment />
                        </div>
                    )}

                    {activeTab === 'upcoming' && (
                        <div>
                            <h2 className="content-title">Upcoming Appointments</h2>
                            <div className="appointments-list">
                                {upcomingAppointments.map((appointment) => (
                                    <div key={appointment.id} className="appointment-card">
                                        <div className="appointment-header">
                                            <div className="appointment-info">
                                                <h3>{appointment.professor}</h3>
                                                <p>{appointment.subject}</p>
                                            </div>
                                            <span className={`appointment-status ${
                                                appointment.status === 'confirmed' 
                                                    ? 'status-confirmed'
                                                    : 'status-pending'
                                            }`}>
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <div className="appointment-time">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{appointment.date}</span>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginLeft: '16px', marginRight: '8px'}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{appointment.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'past' && (
                        <div>
                            <h2 className="content-title">Past Appointments</h2>
                            <div className="appointments-list">
                                {pastAppointments.map((appointment) => (
                                    <div key={appointment.id} className="appointment-card past">
                                        <div className="appointment-header">
                                            <div className="appointment-info">
                                                <h3>{appointment.professor}</h3>
                                                <p>{appointment.subject}</p>
                                            </div>
                                            <span className="appointment-status status-completed">
                                                completed
                                            </span>
                                        </div>
                                        <div className="appointment-time">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{appointment.date}</span>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{marginLeft: '16px', marginRight: '8px'}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{appointment.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard; 