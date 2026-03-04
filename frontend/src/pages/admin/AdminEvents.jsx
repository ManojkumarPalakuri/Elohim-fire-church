import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, X } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../api/apiConfig.js';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        imageUrl: ''
    });

    const API_URL = `${API_BASE_URL}/events`;

    // Fetch Events on Load
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(API_URL);
            setEvents(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL, formData);
            setEvents([...events, res.data].sort((a, b) => new Date(a.date) - new Date(b.date)));
            setIsModalOpen(false);
            setFormData({ title: '', description: '', date: '', time: '', location: '', imageUrl: '' });
        } catch (err) {
            console.error('Error creating event:', err);
            alert('Failed to create event. Please check the console.');
        }
    };

    const handleDelete = (id, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setDeleteConfirmId(id);
    };

    const confirmDelete = async () => {
        if (!deleteConfirmId) return;

        try {
            await axios.delete(`${API_URL}/${deleteConfirmId}`);
            setEvents(prevEvents => prevEvents.filter(eventObj => String(eventObj._id) !== String(deleteConfirmId)));
            setDeleteConfirmId(null);
        } catch (err) {
            console.error('Error deleting event:', err);
            setError('Failed to delete event. Please ensure the backend is running.');
            setDeleteConfirmId(null);
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CalendarIcon color="var(--color-gold)" /> Manage Events
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, marginTop: '5px' }}>
                        Add, update, or remove upcoming church events.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        backgroundColor: 'var(--color-gold)',
                        color: '#000',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '0',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: 'var(--glow-gold)'
                    }}>
                    <Plus size={18} /> Add New Event
                </button>
            </div>

            {error && (
                <div style={{ padding: '15px', backgroundColor: 'rgba(255, 69, 0, 0.1)', border: '1px solid var(--color-fire)', color: 'var(--color-fire)', borderRadius: '8px' }}>
                    {error}
                </div>
            )}

            {/* Events Table Container */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--color-border-outline)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-darker)', borderBottom: '1px solid var(--color-border-outline)' }}>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Event Title</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Date & Time</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Location</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    Loading events...
                                </td>
                            </tr>
                        ) : events.map((event) => (
                            <tr key={event._id} style={{ borderBottom: '1px solid var(--color-border-outline)' }}>
                                <td style={{ padding: '15px 20px', color: 'var(--color-text-primary)', fontWeight: '500' }}>{event.title}</td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>
                                    {new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}
                                </td>
                                <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>{event.location}</td>
                                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(event._id, e)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--color-fire)', cursor: 'pointer', padding: '5px' }}
                                        title="Delete Event"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && events.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    No upcoming events found. Create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding Event */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{
                        backgroundColor: 'var(--color-bg-card)',
                        width: '100%', maxWidth: '600px',
                        borderRadius: '12px',
                        border: '1px solid var(--color-gold-dark)',
                        padding: '2rem',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: 'var(--color-text-primary)', margin: 0 }}>Create New Event</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Event Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Short Description *</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={3} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px', resize: 'vertical' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Date *</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Time</label>
                                    <input type="text" name="time" value={formData.time} onChange={handleInputChange} placeholder="e.g. 7:00 PM" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Main Auditorium" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Image URL</label>
                                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '0', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--color-gold)', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '0', cursor: 'pointer' }}>Save Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal for Delete Confirmation */}
            {deleteConfirmId && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 200,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)'
                }}>
                    <div style={{
                        backgroundColor: 'var(--color-bg-card)',
                        width: '100%', maxWidth: '400px',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 69, 0, 0.3)',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
                        animation: 'modalFadeIn 0.3s ease-out'
                    }}>
                        <div style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            backgroundColor: 'rgba(255, 69, 0, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '1px solid rgba(255, 69, 0, 0.2)'
                        }}>
                            <Trash2 color="var(--color-fire)" size={30} />
                        </div>

                        <h2 style={{ color: 'var(--color-text-primary)', margin: '0 0 10px', fontSize: '1.4rem' }}>Confirm Deletion</h2>
                        <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 2rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Are you sure you want to delete this event? This action cannot be undone.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                style={{
                                    flex: 1, padding: '12px',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--color-border-outline)',
                                    color: 'var(--color-text-primary)',
                                    borderRadius: '0', cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    flex: 1, padding: '12px',
                                    backgroundColor: 'var(--color-fire)',
                                    border: 'none',
                                    color: '#fff',
                                    borderRadius: '0', cursor: 'pointer',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 15px rgba(255, 69, 0, 0.3)'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>
                {`
                    @keyframes modalFadeIn {
                        from { opacity: 0; transform: translateY(-20px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                `}
            </style>
        </div>
    );
};

export default AdminEvents;
