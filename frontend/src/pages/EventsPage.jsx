import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api/apiConfig.js';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/events`);
                // Sort by date soonest first
                const sortedEvents = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(sortedEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
            <Helmet>
                <title>Upcoming Events | Elohim Fire Ministries</title>
                <meta name="description" content="Stay updated with upcoming services, conferences, and special events at Elohim Fire Ministries." />
            </Helmet>

            {/* Page Header */}
            <section className="section-padding" style={{
                textAlign: 'center',
                backgroundColor: 'var(--color-bg-dark)',
                borderBottom: 'var(--border-thin)',
                paddingTop: 'clamp(50px, 10vw, 80px)',
                paddingBottom: 'clamp(24px, 6vw, 48px)'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span style={{
                        color: 'var(--color-accent-primary)',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '16px'
                    }}>Kingdom Gatherings</span>
                    <h1 style={{
                        marginBottom: '1rem',
                        color: 'var(--color-text-primary)',
                        fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                        lineHeight: '0.95',
                        fontWeight: '900',
                        letterSpacing: '-2px',
                        textTransform: 'uppercase'
                    }}>
                        Upcoming <span className="text-secondary" style={{ fontStyle: 'italic' }}>Events</span>
                    </h1>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                        lineHeight: 1.5,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Join us as we gather to experience the transformative power of God's presence and Word.
                    </p>
                </div>
            </section>

            {/* Events List Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)', minHeight: '400px' }}>
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem' }}>
                            <div className="animate-pulse" style={{ color: 'var(--color-gold)', fontSize: '1.2rem' }}>Loading Heaven's Calendar...</div>
                        </div>
                    ) : events.length > 0 ? (
                        <div className="mobile-swipe-section">
                            <div className="mobile-swipe-hint"><span className="mobile-swipe-hint-arrow">→</span></div>
                            <div className="mobile-swipe-container" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '2.5rem'
                            }}>
                                {events.map((event) => (
                                    <div key={event._id} className="modern-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{
                                            height: '240px',
                                            backgroundImage: `url(${event.imageUrl || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '20px',
                                                left: '20px',
                                                backgroundColor: 'var(--color-accent-primary)',
                                                color: '#fff',
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                fontWeight: '800',
                                                fontSize: '0.9rem',
                                                boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)'
                                            }}>
                                                {new Date(event.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </div>
                                        </div>
                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{event.title}</h3>
                                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>{event.description}</p>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                                    <Clock size={16} color="var(--color-gold)" />
                                                    <span>{event.time || 'TBA'}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                                    <MapPin size={16} color="var(--color-gold)" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>

                                            <button className="btn-outline" style={{ width: '100%', justifyContent: 'space-between' }}>
                                                Event Details <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            maxWidth: '700px',
                            margin: '0 auto',
                            padding: '4rem 2rem',
                            backgroundColor: 'var(--color-bg-dark)',
                            borderRadius: '24px',
                            border: '1px solid var(--color-border-outline)'
                        }}>
                            <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '20px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%' }}>
                                <Sparkles size={48} color="var(--color-gold)" />
                            </div>
                            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Be Patient, Be Ready</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                While no specific events are scheduled at this very moment, something powerful is always happening at Elohim Fire Ministries.
                                <strong> "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles..." (Isaiah 40:31)</strong>
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                Check back soon for announcements about revival fires, miracle services, and prophetic gatherings. In the meantime, join us for our regular Sunday Services.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default EventsPage;
