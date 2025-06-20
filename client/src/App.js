import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/dashboard/StudentDashboard';
import ProfessorDashboard from './components/dashboard/ProfessorDashboard';

// Protected Route component
const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-900 text-white">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Student Routes */}
                    <Route
                        path="/student/dashboard"
                        element={
                            <ProtectedRoute role="student">
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Professor Routes */}
                    <Route
                        path="/professor/dashboard"
                        element={
                            <ProtectedRoute role="professor">
                                <ProfessorDashboard />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Default Route */}
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to={
                                    localStorage.getItem('user')
                                        ? JSON.parse(localStorage.getItem('user')).role === 'professor'
                                            ? '/professor/dashboard'
                                            : '/student/dashboard'
                                        : '/login'
                                }
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
