import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../api/apiConfig.js';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${API_BASE_URL}/messages`);
            setMessages(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id) => {
        try {
            await axios.put(`${API_BASE_URL}/messages/${id}/read`);
            setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
        } catch (error) {
            console.error('Error marking message as read:', error);
            alert('Failed to mark as read.');
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Delete this message permanently?')) {
            try {
                await axios.delete(`${API_BASE_URL}/messages/${id}`);
                setMessages(messages.filter(m => m._id !== id));
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message.');
            }
        }
    };

    const getBadgeColor = (type) => {
        switch (type) {
            case 'Prayer Request': return { bg: 'rgba(255, 69, 0, 0.1)', color: 'var(--color-fire)', border: 'var(--color-fire-dark)' };
            case 'Testimony': return { bg: 'rgba(40, 167, 69, 0.1)', color: '#28a745', border: '#1e7e34' };
            default: return { bg: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold)', border: 'var(--color-gold-dark)' };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MessageSquare color="var(--color-gold)" /> Inbox & Requests
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, marginTop: '5px' }}>
                        View contact form submissions, prayer requests, and testimonies.
                    </p>
                </div>
                <button
                    onClick={fetchMessages}
                    disabled={isLoading}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border-outline)',
                        color: 'var(--color-text-primary)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}>
                    <RefreshCw size={16} className={isLoading ? "spin" : ""} />
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {error && (
                <div style={{ backgroundColor: 'rgba(255, 69, 0, 0.1)', color: 'var(--color-fire)', padding: '12px', border: '1px solid var(--color-fire-dark)', borderRadius: '6px' }}>
                    {error}
                </div>
            )}

            {/* Messages List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isLoading && messages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                        <RefreshCw size={32} className="spin" style={{ marginBottom: '1rem' }} />
                        <p>Loading messages...</p>
                    </div>
                ) : messages.map((msg) => {
                    const badge = getBadgeColor(msg.type);

                    return (
                        <div key={msg._id} style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: '12px',
                            border: `1px solid ${!msg.isRead ? 'var(--color-gold)' : 'var(--color-border-outline)'}`,
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            position: 'relative'
                        }}>
                            {/* Top Row: Info & Badges */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <h3 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.2rem' }}>{msg.name}</h3>
                                        {!msg.isRead && (
                                            <span style={{ backgroundColor: 'var(--color-fire)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold' }}>NEW</span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {msg.email}</span>
                                        {msg.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {msg.phone}</span>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                                    <span style={{
                                        backgroundColor: badge.bg,
                                        color: badge.color,
                                        border: `1px solid ${badge.border}`,
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {msg.type || 'Contact'}
                                    </span>
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                        {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div style={{ backgroundColor: 'var(--color-bg-darker)', padding: '1rem', borderRadius: '8px', color: 'var(--color-text-primary)', borderLeft: `3px solid ${badge.color}` }}>
                                <p style={{ margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                                {!msg.isRead && (
                                    <button onClick={() => markAsRead(msg._id)} style={{ background: 'transparent', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '6px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                        Mark as Read <CheckCircle size={16} />
                                    </button>
                                )}
                                <button onClick={() => deleteMessage(msg._id)} style={{ background: 'transparent', border: '1px solid var(--color-fire-dark)', color: 'var(--color-fire)', padding: '6px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    Delete <Trash2 size={16} />
                                </button>
                            </div>

                        </div>
                    );
                })}

                {!isLoading && messages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>
                        <MessageSquare size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
                        <p>Your inbox is entirely clean. No new messages.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminMessages;
