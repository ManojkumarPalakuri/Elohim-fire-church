import React, { useState, useEffect } from 'react';
import { Video, Plus, Edit, Trash2, ExternalLink, X } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../api/apiConfig.js';

const AdminSermons = () => {
    const [sermons, setSermons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        speaker: 'Prophet Joshua',
        date: '',
        category: 'Revival',
        youtubeUrl: ''
    });

    const API_URL = `${API_BASE_URL}/sermons`;

    // Fetch Sermons on Load
    useEffect(() => {
        fetchSermons();
    }, []);

    const fetchSermons = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(API_URL);
            setSermons(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching sermons:', err);
            setError('Failed to load sermons.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openCreateModal = () => {
        setEditId(null);
        setFormData({
            title: '',
            speaker: 'Prophet Joshua',
            date: new Date().toISOString().split('T')[0],
            category: 'Revival',
            youtubeUrl: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (sermon) => {
        setEditId(sermon._id);
        setFormData({
            title: sermon.title,
            speaker: sermon.speaker,
            date: new Date(sermon.date).toISOString().split('T')[0],
            category: sermon.category,
            youtubeUrl: sermon.youtubeUrl || ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            fetchSermons();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving sermon:', err);
            alert('Failed to save sermon. Ensure you are logged in as admin.');
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = async () => {
        if (!deleteConfirmId) return;
        try {
            await axios.delete(`${API_URL}/${deleteConfirmId}`);
            setSermons(prev => prev.filter(s => s._id !== deleteConfirmId));
            setDeleteConfirmId(null);
        } catch (err) {
            console.error('Error deleting sermon:', err);
            setError('Failed to delete sermon.');
            setDeleteConfirmId(null);
        }
    };

    const categoryColors = {
        Revival: { bg: 'rgba(255, 69, 0, 0.1)', color: 'var(--color-fire)' },
        Prophetic: { bg: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold)' },
        Faith: { bg: 'rgba(40, 167, 69, 0.1)', color: '#28a745' },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Video color="var(--color-gold)" /> Manage Sermons
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, marginTop: '5px' }}>
                        Add and manage sermon recordings and teachings.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
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
                    <Plus size={18} /> Add Sermon
                </button>
            </div>

            {error && (
                <div style={{ padding: '15px', backgroundColor: 'rgba(255, 69, 0, 0.1)', border: '1px solid var(--color-fire)', color: 'var(--color-fire)', borderRadius: '8px' }}>
                    {error}
                </div>
            )}

            {/* Sermons Table */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--color-border-outline)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-darker)', borderBottom: '1px solid var(--color-border-outline)' }}>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Sermon Title</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Speaker</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Category</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    Loading sermons...
                                </td>
                            </tr>
                        ) : sermons.map((sermon) => {
                            const cat = categoryColors[sermon.category] || { bg: 'rgba(108,117,125,0.1)', color: '#6c757d' };
                            return (
                                <tr key={sermon._id} style={{ borderBottom: '1px solid var(--color-border-outline)' }}>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-primary)', fontWeight: '500' }}>{sermon.title}</td>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>{sermon.speaker}</td>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>
                                        {new Date(sermon.date).toLocaleDateString([], { dateStyle: 'medium' })}
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            backgroundColor: cat.bg,
                                            color: cat.color,
                                            padding: '3px 10px',
                                            borderRadius: '12px',
                                            fontSize: '0.82rem',
                                            fontWeight: '600'
                                        }}>{sermon.category}</span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                                        {sermon.youtubeUrl && (
                                            <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer"
                                                style={{ background: 'transparent', border: 'none', color: '#ff0000', cursor: 'pointer' }}>
                                                <ExternalLink size={17} />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => openEditModal(sermon)}
                                            style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', cursor: 'pointer' }}>
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(sermon._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-fire)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {!isLoading && sermons.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    No sermons added yet. Click "Add Sermon" to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding/Editing Sermon */}
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
                            <h2 style={{ color: 'var(--color-text-primary)', margin: 0 }}>{editId ? 'Edit Sermon' : 'Add New Sermon'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Sermon Title *</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Speaker</label>
                                    <input type="text" name="speaker" value={formData.speaker} onChange={handleInputChange} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Date *</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }}>
                                    <option value="Revival">Revival</option>
                                    <option value="Prophetic">Prophetic</option>
                                    <option value="Faith">Faith</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>YouTube URL</label>
                                <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleInputChange} placeholder="https://youtube.com/watch?v=..." style={{ width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '4px' }} />
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid var(--color-border-outline)', color: 'var(--color-text-primary)', borderRadius: '0', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--color-gold)', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '0', cursor: 'pointer' }}>{editId ? 'Update Sermon' : 'Save Sermon'}</button>
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
                        boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
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
                            Are you sure you want to delete this sermon? This action cannot be undone.
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
        </div>
    );
};

export default AdminSermons;
