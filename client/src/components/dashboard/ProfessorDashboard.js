import React, { useState } from 'react';
import AppointmentList from '../appointments/AppointmentList';
import './ProfessorDashboard.css';

const ProfessorDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [activeTab, setActiveTab] = useState('appointments');

    // Dummy data for today's appointments
    const todayAppointments = [
        {
            id: 1,
            student: 'John Smith',
            studentId: 'CS2024001',
            subject: 'Data Structures',
            date: '2024-03-20',
            time: '10:00 AM',
            status: 'confirmed',
            purpose: 'Project Discussion'
        },
        {
            id: 2,
            student: 'Emma Wilson',
            studentId: 'CS2024002',
            subject: 'Algorithms',
            date: '2024-03-20',
            time: '2:30 PM',
            status: 'pending',
            purpose: 'Assignment Help'
        }
    ];

    // Dummy data for upcoming appointments
    const upcomingAppointments = [
        {
            id: 3,
            student: 'Michael Brown',
            studentId: 'CS2024003',
            subject: 'Database Systems',
            date: '2024-03-22',
            time: '11:00 AM',
            status: 'confirmed',
            purpose: 'Research Discussion'
        }
    ];

    // Dummy statistics
    const stats = {
        totalAppointments: 45,
        completedAppointments: 38,
        pendingAppointments: 7,
        averageRating: 4.8
    };

    return (
        <div className="professor-dashboard">
            <div className="dashboard-container">
                {/* Welcome Section */}
                <div className="welcome-section">
                    <h1 className="welcome-title">
                        Welcome, Professor {user?.name}!
                    </h1>
                    <p className="welcome-subtitle">
                        Department of {user?.department || 'Computer Science'}
                    </p>
                </div>

                {/* Statistics */}
                <div className="stats-grid">
                    <div className="stat-card total">
                        <h3 className="stat-title">Total Appointments</h3>
                        <p className="stat-value">{stats.totalAppointments}</p>
                    </div>
                    <div className="stat-card completed">
                        <h3 className="stat-title">Completed</h3>
                        <p className="stat-value">{stats.completedAppointments}</p>
                    </div>
                    <div className="stat-card pending">
                        <h3 className="stat-title">Pending</h3>
                        <p className="stat-value">{stats.pendingAppointments}</p>
                    </div>
                    <div className="stat-card rating">
                        <h3 className="stat-title">Average Rating</h3>
                        <p className="stat-value">{stats.averageRating}/5.0</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-container">
                    <div className="tabs-nav">
                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
                        >
                            Today's Appointments
                        </button>
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                        >
                            Upcoming Appointments
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="content-container">
                    {activeTab === 'appointments' && (
                        <div>
                            <h2 className="content-title">Today's Appointments</h2>
                            <div className="appointments-list">
                                {todayAppointments.map((appointment) => (
                                    <div key={appointment.id} className="appointment-card">
                                        <div className="appointment-header">
                                            <div className="appointment-info">
                                                <h3>{appointment.student}</h3>
                                                <p>ID: {appointment.studentId}</p>
                                                <p>Subject: {appointment.subject}</p>
                                                <p>Purpose: {appointment.purpose}</p>
                                            </div>
                                            <div>
                                                <span className={`appointment-status ${
                                                    appointment.status === 'confirmed' 
                                                        ? 'status-confirmed'
                                                        : 'status-pending'
                                                }`}>
                                                    {appointment.status}
                                                </span>
                                                <div className="appointment-time">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{appointment.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                                                <h3>{appointment.student}</h3>
                                                <p>ID: {appointment.studentId}</p>
                                                <p>Subject: {appointment.subject}</p>
                                                <p>Purpose: {appointment.purpose}</p>
                                            </div>
                                            <div>
                                                <span className="appointment-status status-confirmed">
                                                    {appointment.status}
                                                </span>
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

export default ProfessorDashboard; 