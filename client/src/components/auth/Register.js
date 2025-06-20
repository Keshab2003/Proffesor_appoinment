import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        role: 'student',
        studentId: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            let endpoint = '/auth/register/student';
            let data = { ...formData };
            if (formData.role === 'professor') {
                endpoint = '/auth/register/professor';
                delete data.studentId;
            }
            const response = await axiosInstance.post(endpoint, data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate(formData.role === 'professor' ? '/professor/dashboard' : '/student/dashboard');
            }
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-bg">
            <div className="register-card">
                <h2 className="register-title">Create your account</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    {error && <div className="register-error">{error}</div>}
                    <div className="register-fields">
                        <input
                            name="name"
                            type="text"
                            required
                            className="register-input"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            className="register-input"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            className="register-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            name="department"
                            type="text"
                            required
                            className="register-input"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                        />
                        <select
                            name="role"
                            required
                            className="register-input"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                        {formData.role === 'student' && (
                            <input
                                name="studentId"
                                type="text"
                                required
                                className="register-input"
                                placeholder="Student ID"
                                value={formData.studentId}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="register-button"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <div className="register-link">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 