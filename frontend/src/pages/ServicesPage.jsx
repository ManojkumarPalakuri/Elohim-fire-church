import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar as CalendarIcon, MapPin, Users, Star } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api/apiConfig.js';

const ServicesPage = () => {
    // Live events state
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    // Countdown Logic (Next Sunday 9:00 AM)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextSunday = new Date();
            nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
            nextSunday.setHours(9, 0, 0, 0);

            // If today is Sunday and past 9 AM, get next Sunday
            if (now.getDay() === 0 && now.getHours() >= 9) {
                nextSunday.setDate(nextSunday.getDate() + 7);
            }

            const difference = nextSunday - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, []);

    // Fetch live events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/events`);
                setUpcomingEvents(res.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setEventsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const EventCard = ({ title, time, day, desc, icon: Icon, isSpecial = false }) => (
        <div style={{
            backgroundColor: 'var(--color-bg-card)',
            padding: '2rem',
            borderRadius: '12px',
            borderLeft: `4px solid ${isSpecial ? 'var(--color-fire)' : 'var(--color-gold)'}`,
            transition: 'transform 0.3s ease',
            cursor: 'default'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{
                    backgroundColor: isSpecial ? 'rgba(255,69,0,0.1)' : 'rgba(212,175,55,0.1)',
                    padding: '12px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSpecial ? 'var(--color-fire)' : 'var(--color-gold)'
                }}>
                    <Icon size={24} />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontWeight: 'bold', color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>{day}</span>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{time}</span>
                </div>
            </div>
            <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{title}</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Services & Events | Elohim Fire Ministries</title>
                <meta name="description" content="View our service timings, weekly meetings, and upcoming special events at Elohim Fire Ministries." />
            </Helmet>

            {/* Page Header */}
            <section style={{
                padding: '3.5rem 20px 2.5rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, var(--color-bg-darker), var(--color-bg-dark))',
            }}>
                <div className="container">
                    <h1 style={{ marginBottom: '1rem', textShadow: 'var(--glow-fire)' }}>Worship <span className="text-fire">With Us</span></h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                        Experience the dynamic power of God in our Spirit-filled services. There is a place for everyone in the house of the Lord.
                    </p>
                </div>
            </section>

            {/* Countdown Timer */}
            <section style={{ padding: '2rem 20px', backgroundColor: 'var(--color-bg-dark)' }}>
                <div className="container" style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderRadius: '16px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    boxShadow: 'var(--glow-gold)',
                    border: '1px solid var(--color-gold-dark)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Subtle background glow */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'var(--color-gold)', filter: 'blur(100px)', opacity: 0.1, zIndex: 0 }}></div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text-primary)' }}>Next Sunday Service Begins In</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 3rem)', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{
                                        width: 'min(90px, 20vw)',
                                        height: 'min(90px, 20vw)',
                                        backgroundColor: 'var(--color-bg-darker)',
                                        border: '2px solid var(--color-gold)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                        fontWeight: 'bold',
                                        color: 'var(--color-text-primary)',
                                        marginBottom: '0.5rem',
                                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                                    }}>
                                        {item.value.toString().padStart(2, '0')}
                                    </div>
                                    <span style={{ color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <button style={{
                            marginTop: '3rem',
                            backgroundColor: 'var(--color-fire)',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 30px',
                            borderRadius: '30px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            boxShadow: 'var(--glow-fire)'
                        }}>Join Live Stream</button>
                    </div>
                </div>
            </section>

            {/* Weekly Schedule */}
            <section className="container" style={{ padding: '6rem 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2>Weekly <span className="text-gold">Schedule</span></h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--color-gold)', margin: '1.5rem auto 0' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <EventCard
                        title="First Service"
                        day="Sunday"
                        time="9:00 AM - 11:00 AM"
                        desc="Our early morning service featuring deep worship, corporate prayer, and an empowering message from the Word."
                        icon={Clock}
                    />
                    <EventCard
                        title="Second Service"
                        day="Sunday"
                        time="11:30 AM - 1:30 PM"
                        desc="Our mid-morning service designed for dynamic praise and prophetic teachings."
                        icon={Users}
                    />
                    <EventCard
                        title="Friday Fire Prayer"
                        day="Friday"
                        time="7:00 PM - 9:00 PM"
                        desc="A powerful time of intercession, spiritual warfare, and seeking the face of God for breakthroughs."
                        icon={Star}
                        isSpecial={true}
                    />
                    <EventCard
                        title="Youth ignite"
                        day="Saturday"
                        time="5:00 PM - 7:00 PM"
                        desc="A vibrant gathering for teenagers and young adults focusing on purpose, purity, and power."
                        icon={Users}
                    />
                </div>
            </section>

            {/* Upcoming Events Calendar (Static Preview) */}
            <section style={{ backgroundColor: 'var(--color-bg-darker)', padding: '5rem 20px' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CalendarIcon color="var(--color-fire)" /> Upcoming Events</h2>
                        <a href="#" style={{ color: 'var(--color-gold)', borderBottom: '1px solid var(--color-gold)', paddingBottom: '2px' }}>View Full Calendar</a>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {eventsLoading ? (
                            <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '2rem' }}>Loading events calendar...</div>
                        ) : upcomingEvents.length > 0 ? (
                            upcomingEvents.map((ev) => {
                                const eventDate = new Date(ev.date);
                                const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                                const day = eventDate.getDate().toString().padStart(2, '0');

                                return (
                                    <div key={ev._id} style={{
                                        display: 'flex',
                                        backgroundColor: 'var(--color-bg-card)',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid var(--color-border-outline)'
                                    }}>
                                        <div style={{
                                            backgroundColor: 'var(--color-fire)',
                                            color: '#fff',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '100px'
                                        }}>
                                            <span style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: 1 }}>{day}</span>
                                            <span style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>{month}</span>
                                        </div>
                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{ev.title}</h3>
                                            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                                                {ev.time && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {ev.time}</span>}
                                                {ev.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={16} /> {ev.location}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem', backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border-outline)' }}>
                                <p style={{ fontSize: '1.1rem' }}>No upcoming events currently scheduled.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
};

export default ServicesPage;
