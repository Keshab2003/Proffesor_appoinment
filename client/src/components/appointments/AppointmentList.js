import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/appointments/professor', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(response.data.data);
        } catch (error) {
            setError('Failed to fetch appointments');
        }
    };

    const handleStatusUpdate = async (appointmentId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:5000/api/appointments/status/${appointmentId}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                setSuccess('Appointment status updated successfully');
                fetchAppointments(); // Refresh the list
            }
        } catch (error) {
            setError('Failed to update appointment status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold mb-6">Appointments</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                            {appointment.student.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Course: {appointment.course.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Date: {new Date(appointment.date).toLocaleDateString()}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Time: {appointment.startTime} - {appointment.endTime}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Purpose: {appointment.purpose}
                                        </p>
                                        {appointment.notes && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                Notes: {appointment.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                                {appointment.status === 'pending' && (
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => handleStatusUpdate(appointment._id, 'approved')}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                                {appointment.status === 'approved' && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleStatusUpdate(appointment._id, 'completed')}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Mark as Completed
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AppointmentList; 