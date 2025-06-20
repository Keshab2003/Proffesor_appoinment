import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student'
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
            const response = await axiosInstance.post('/auth/login', formData);
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
                setError('An error occurred during login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <h2 className="login-title">Sign in to your account</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="login-error">{error}</div>
                    )}
                    <div className="login-fields">
                        <input
                            name="email"
                            type="email"
                            required
                            className="login-input"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            className="login-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <select
                            name="role"
                            required
                            className="login-input"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                    <div className="login-link">
                        <Link to="/register">Don't have an account? Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 