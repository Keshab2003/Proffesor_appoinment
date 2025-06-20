import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = () => {
    const [professors, setProfessors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        professorId: '',
        courseId: '',
        date: '',
        startTime: '',
        endTime: '',
        purpose: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch professors and courses
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found. Please login again.');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                console.log('Fetching professors and courses...');
                
                const [professorsRes, coursesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/professors', config),
                    axios.get('http://localhost:5000/api/courses', config)
                ]);

                console.log('Professors response:', professorsRes.data);
                console.log('Courses response:', coursesRes.data);

                // Ensure we have arrays
                const professorsData = Array.isArray(professorsRes.data) ? professorsRes.data : [];
                const coursesData = Array.isArray(coursesRes.data) ? coursesRes.data : [];

                setProfessors(professorsData);
                setCourses(coursesData);
                
                console.log('Set professors:', professorsData);
                console.log('Set courses:', coursesData);
                
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    setError(`Failed to fetch data: ${error.response.data.message || 'Server error'}`);
                } else if (error.request) {
                    setError('Failed to connect to server. Please check your internet connection.');
                } else {
                    setError('Failed to fetch data. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Debug: log form data on change
        console.log('Form data:', {
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setSuccess('');
            
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please login again.');
                return;
            }

            console.log('Submitting appointment data:', formData);
            
            const response = await axios.post(
                'http://localhost:5000/api/appointments/create',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log('Appointment creation response:', response.data);

            if (response.data.success) {
                setSuccess('Appointment booked successfully!');
                setFormData({
                    professorId: '',
                    courseId: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    purpose: '',
                    notes: ''
                });
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.message || 'Failed to book appointment. Please try again.');
            } else if (error.request) {
                setError('Failed to connect to server. Please check your internet connection.');
            } else {
                setError('Failed to book appointment. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="appointment-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="appointment-container">
            <div className="appointment-card">
                <h2 className="appointment-title">Book an Appointment</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <label className="form-label">Professor</label>
                        <select
                            name="professorId"
                            value={formData.professorId}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select a professor</option>
                            {Array.isArray(professors) && professors.length > 0 ? (
                                professors.map(professor => (
                                    <option key={professor._id} value={professor._id}>
                                        {professor.name} - {professor.department}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No professors available</option>
                            )}
                        </select>
                        {Array.isArray(professors) && professors.length === 0 && (
                            <small style={{color: '#e53e3e', fontSize: '0.875rem'}}>
                                No professors found. Please contact your administrator.
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Course</label>
                        <select
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select a course</option>
                            {Array.isArray(courses) && courses.length > 0 ? (
                                courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.name} ({course.code})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>No courses available</option>
                            )}
                        </select>
                        {Array.isArray(courses) && courses.length === 0 && (
                            <small style={{color: '#e53e3e', fontSize: '0.875rem'}}>
                                No courses found. Please contact your administrator.
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Start Time</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Time</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Purpose</label>
                        <textarea
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="form-textarea"
                            placeholder="Please describe the purpose of your appointment"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Additional Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="2"
                            className="form-textarea"
                            placeholder="Any additional information you'd like to share"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Book Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment; 