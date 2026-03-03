import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Calendar, Video, MessageSquare, TrendingUp, RefreshCw } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../api/apiConfig.js';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div style={{
        backgroundColor: 'var(--color-bg-card)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--color-border-outline)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>{title}</h3>
            <div style={{ backgroundColor: `${color}22`, padding: '8px', borderRadius: '8px' }}>
                <Icon color={color} size={20} />
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-primary)', lineHeight: 1 }}>{value}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#28a745', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <TrendingUp size={14} /> +{trend}%
            </span>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [eventsCount, setEventsCount] = useState(0);
    const [stats, setStats] = useState({ totalVisits: 0, uniqueVisitors: 0, recentVisits: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [msgRes, evtRes, statsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/messages`, config).catch(() => ({ data: [] })),
                axios.get(`${API_BASE_URL}/events`).catch(() => ({ data: [] })),
                axios.get(`${API_BASE_URL}/analytics/stats`, config).catch(() => ({ data: { totalVisits: 0, uniqueVisitors: 0, recentVisits: 0 } }))
            ]);

            setMessages(msgRes.data);
            setEventsCount(evtRes.data.length);
            setStats(statsRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const newRequestsCount = messages.filter(m => !m.isRead).length;
    const recentMessages = messages.slice(0, 5); // Just grab the 5 most recent

    const getTimeAgo = (dateString) => {
        const diffInMinutes = Math.floor((new Date() - new Date(dateString)) / 60000);
        if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        return `${Math.floor(diffInHours / 24)} days ago`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Welcome Banner */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                padding: '2rem',
                borderRadius: '12px',
                borderLeft: '4px solid var(--color-gold)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.8rem', margin: 0 }}>Welcome back, <span className="text-gold">{user?.name || 'Admin'}</span></h1>
                <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Here is the summary of your website's activity for today.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                <StatCard title="Total Site Visits" value={isLoading ? '...' : stats.totalVisits.toLocaleString()} icon={Users} color="#17a2b8" trend={stats.recentVisits || 0} />
                <StatCard title="Unique Visitors" value={isLoading ? '...' : stats.uniqueVisitors.toLocaleString()} icon={Users} color="#28a745" trend={0} />
                <StatCard title="Upcoming Events" value={isLoading ? '...' : eventsCount} icon={Calendar} color="var(--color-gold)" trend={0} />
                <StatCard title="New Requests" value={isLoading ? '...' : newRequestsCount} icon={MessageSquare} color="var(--color-fire)" trend={0} />
            </div>

            {/* Recent Activity Mock */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--color-border-outline)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border-outline)' }}>
                    <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', margin: 0 }}>Recent Messages & Requests</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {isLoading ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                            <RefreshCw size={24} className="spin" />
                        </div>
                    ) : recentMessages.length > 0 ? (
                        recentMessages.map((item, idx) => (
                            <div key={idx} style={{
                                padding: '1rem 1.5rem',
                                borderBottom: '1px solid var(--color-border-outline)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: !item.isRead ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
                            }}>
                                <div>
                                    <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '4px' }}>
                                        {item.name} {!item.isRead && <span style={{ color: 'var(--color-fire)', fontSize: '0.7rem' }}>NEW</span>}
                                    </strong>
                                    <span style={{
                                        color: item.type === 'Prayer Request' ? 'var(--color-fire)' : 'var(--color-gold)',
                                        fontSize: '0.8rem',
                                        backgroundColor: item.type === 'Prayer Request' ? 'rgba(255,69,0,0.1)' : 'rgba(212,175,55,0.1)',
                                        padding: '2px 8px',
                                        borderRadius: '12px'
                                    }}>
                                        {item.type || 'Contact'}
                                    </span>
                                </div>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{getTimeAgo(item.createdAt)}</span>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            No messages or requests yet.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
