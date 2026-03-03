import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Play, Calendar, MapPin, Users, Heart, Globe, Video, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
    { text: "I came broken and sick, but after Prophet Joshua prayed for me, I experienced complete healing. My life has never been the same since that encounter with the Holy Spirit.", author: "Sarah M.", tag: "Healing Testimony" },
    { text: "The prophetic word I received was accurate to the letter. It gave me direction when my business was failing, and now we are thriving!", author: "David K.", tag: "Prophetic Direction" },
    { text: "I was addicted to substances for 10 years. During the Night of Deliverance, the fire of God touched me. I've been completely free ever since.", author: "Michael T.", tag: "Deliverance" },
    { text: "I struggled to conceive for 5 years. Pastor prayed for me with the anointing oil, and this year, I am holding my miracle baby!", author: "Priya R.", tag: "Miraculous Conception" },
    { text: "My finances were under severe attack. I learned to tithe and partner through the teachings here. Today, I am debt-free and managing two companies.", author: "James O.", tag: "Financial Breakthrough" },
    { text: "The worship here is not just singing; it's an encounter. I feel the heavy presence of God the moment I step into the sanctuary.", author: "Emily C.", tag: "Encounter" },
    { text: "I attended the Kingdom Business Summit and applied the principles taught. My startup received unexpected funding within a month!", author: "Rahul P.", tag: "Business Success" },
    { text: "Generational curses broke off my family. The continuous sickness we used to experience suddenly vanished after the fasting service.", author: "Grace L.", tag: "Family Deliverance" },
    { text: "I was diagnosed with an incurable disease. Prophet Joshua declared 'It is finished', and my latest medical reports show absolutely no trace of it!", author: "Victor N.", tag: "Divine Healing" },
    { text: "My spiritual life was dead. Coming to Elohim Fire Ministries ignited a fresh hunger for God. Now I pray and read the Word for hours daily.", author: "Anna S.", tag: "Spiritual Revival" }
];

import axios from 'axios';
import API_BASE_URL from '../api/apiConfig.js';

const HomePage = () => {
    // Media filtering state
    const [activeFilter, setActiveFilter] = useState('all');

    // Live events state
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    const [isLoaded, setIsLoaded] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Fetch live events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/events`);
                // get top 2 upcoming events
                setUpcomingEvents(res.data.slice(0, 2));
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setEventsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <>
            <Helmet>
                <title>Elohim Fire Ministries | Grace. Power. Fire.</title>
                <meta name="description" content="Join Prophet Joshua at Elohim Fire Ministries and experience the transformative presence of God." />
            </Helmet>

            {/* Hero Section Container */}
            <section style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden'
            }} className="hero-responsive-section">

                {/* --- PREMIUM MOBILE HERO (max-width 480px) --- */}
                <div className="mobile-only-hero d-md-none" style={{
                    position: 'relative',
                    height: '100vh',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#050505',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")', // Focused spiritual lighting/hand
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    color: '#fff',
                    overflow: 'hidden'
                }}>
                    {/* Cinematic Dark Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 30%, rgba(5,5,5,0.2) 60%, rgba(5,5,5,0.1) 100%)',
                        zIndex: 1
                    }}></div>

                    {/* Redundant Mobile Top Bar removed - now handled by global Header.jsx */}

                    {/* Centered Hero Content */}
                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '0 24px',
                        marginTop: '-40px' // Slight vertical lift
                    }} className={isLoaded ? 'animate-fade-in' : ''}>

                        <span style={{
                            display: 'block',
                            color: 'var(--color-accent-primary)',
                            fontSize: '0.7rem',
                            letterSpacing: '5px',
                            textTransform: 'uppercase',
                            fontWeight: '800',
                            marginBottom: '24px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }} className="delay-100 animate-fade-in">
                            The Presence of God
                        </span>

                        <h1 style={{
                            margin: 0,
                            padding: 0,
                            fontSize: 'clamp(4rem, 18vw, 5.5rem)',
                            lineHeight: 1.05,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            color: '#fff',
                            width: '100%',
                            maxWidth: '90%'
                        }} className="delay-200 animate-fade-in">
                            GRACE.<br />
                            POWER.<br />
                            <span style={{
                                background: 'linear-gradient(135deg, #FFB703 0%, #FF8C00 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>FIRE.</span>
                        </h1>

                        <div style={{ height: '40px' }}></div> {/* Balanced breathing space */}

                        <p style={{
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.85)',
                            maxWidth: '280px',
                            margin: 0,
                            fontWeight: '400',
                            textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                        }} className="delay-300 animate-fade-in">
                            Experience the life-transforming ministry of Prophet Joshua.
                        </p>

                        <div style={{ height: '48px' }}></div>

                        {/* Premium Flush Buttons */}
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }} className="delay-300 animate-fade-in">
                            <Link to="/contact#prayer" style={{
                                width: '100%',
                                height: '56px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #FFB703 0%, #FF6A00 100%)',
                                color: '#000',
                                borderRadius: '50px',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '0.85rem',
                                textDecoration: 'none',
                                border: 'none'
                            }}>
                                Prayer Request
                            </Link>

                            <a href="https://youtube.com/@prophetjoshua6374" target="_blank" rel="noopener noreferrer" style={{
                                width: '100%',
                                height: '56px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: '#fff',
                                borderRadius: '50px',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '0.85rem',
                                textDecoration: 'none'
                            }}>
                                Watch Live
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- DESKTOP HERO (Hides on Mobile) --- */}
                <div className="desktop-only-hero d-none d-md-flex" style={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '60px',
                    backgroundColor: 'var(--color-bg-dark)',
                    width: '100%'
                }}>
                    <div className="container hero-grid" style={{ zIndex: 10, paddingBottom: '40px' }}>
                        {/* Hero Left Content */}
                        <div className={`${isLoaded ? 'animate-fade-in' : ''} hero-content`} style={{ zIndex: 10 }}>
                            <span className="delay-100 animate-fade-in" style={{
                                display: 'inline-block',
                                color: 'var(--color-accent-primary)',
                                fontSize: '0.8rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                                fontWeight: '800'
                            }}>
                                Welcome to Elohim Fire Ministries
                            </span>

                            <h1 className="delay-200 animate-fade-in" style={{
                                margin: '0',
                                color: 'var(--color-text-primary)',
                                textTransform: 'uppercase',
                                fontSize: 'clamp(4rem, 10vw, 7.5rem)',
                                lineHeight: '0.9',
                                fontWeight: '900',
                                letterSpacing: '-3px',
                                marginBottom: '2rem'
                            }}>
                                Grace.<br />
                                Power.<br />
                                <span className="text-fire-pulse" style={{ display: 'inline', color: '#FFB703' }}>Fire.</span>
                            </h1>

                            <p className="delay-300 animate-fade-in" style={{
                                color: 'var(--color-text-secondary)',
                                maxWidth: '450px',
                                lineHeight: 1.5,
                                marginTop: '0',
                                marginBottom: '32px',
                                fontSize: '1.1rem'
                            }}>
                                Experience the transforming presence of God with Prophet Joshua.
                            </p>

                            <div className="delay-300 animate-fade-in hero-buttons">
                                <Link to="/contact#prayer" className="btn-primary">
                                    Prayer Request
                                </Link>
                                <a href="https://youtube.com/@prophetjoshua6374?si=dGfgURVT4xawDOF_" target="_blank" rel="noopener noreferrer" className="btn-outline">
                                    Watch Live
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hero Right Image Background */}
                    <div className={`hero-image-wrapper ${isLoaded ? 'animate-fade-in' : ''}`}>
                        <div className="hero-image-container"></div>
                        {/* Atmospheric Overlay Handle */}
                        <div className="hero-image-overlay"></div>
                    </div>
                </div>
            </section>

            {/* About Prophet Joshua Section (2-Column) */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '80px',
                        alignItems: 'center'
                    }}>
                        {/* Left: Professional Portrait */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px', left: '-20px',
                                width: '100px', height: '100px',
                                borderTop: '2px solid var(--color-accent-primary)',
                                borderLeft: '2px solid var(--color-accent-primary)',
                                zIndex: 0
                            }}></div>
                            <img
                                src="/IMG_8925.PNG"
                                alt="Prophet Joshua"
                                style={{
                                    width: '100%',
                                    aspectRatio: '3/4',
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    borderRadius: '4px',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'grayscale(20%) contrast(1.1)'
                                }}
                            />
                        </div>

                        {/* Right: Bio */}
                        <div>
                            <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>
                                Our Leadership
                            </span>
                            <h2 className="mb-24">Meet <span className="text-secondary">Prophet Joshua</span></h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                                Dedicated to teaching the uncompromised Word of God, moving in the prophetic and healing ministry.
                                Under his visionary leadership, Elohim Fire Ministries has grown into a beacon of hope and spiritual awakening.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}>
                                Our mission is to equip believers, empower the broken, and help you walk in your God-given destiny.
                            </p>
                            <Link to="/about" className="btn-outline">
                                Read Full Story
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* Service Times Section */}
            < section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <div className="container">
                    <div className="text-center mb-64">
                        <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Gatherings</span>
                        <h2>Join Us This Week</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { title: 'Sunday Morning Service', time: '10:30 AM', desc: 'Experience powerful worship and the prophetic word.', icon: Calendar },
                            { title: 'Fasting Service', time: 'Fridays, 6:00 PM', desc: 'Corporate prayer, fasting, and spiritual renewal.', icon: Heart },
                            { title: 'Oil Anointing Service', time: 'Every Month 1st', desc: 'Hyderabad, India.', icon: Users }
                        ].map((service, idx) => (
                            <div key={idx} className="modern-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <service.icon size={32} color="var(--color-accent-primary)" strokeWidth={1.5} />
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{service.title}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '16px' }}>{service.desc}</p>
                                    <span style={{ display: 'inline-block', backgroundColor: 'rgba(255,106,0,0.1)', color: 'var(--color-accent-primary)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                                        {service.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >


            {/* Upcoming Events Section (Horizontal Cards) */}
            < section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <div className="container">
                    <div className="text-center mb-64">
                        <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Mark Your Calendar</span>
                        <h2>Upcoming Events</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
                        {eventsLoading ? (
                            <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '2rem' }}>Loading upcoming events...</div>
                        ) : upcomingEvents.length > 0 ? (
                            upcomingEvents.map((event) => {
                                const eventDate = new Date(event.date);
                                const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                                const day = eventDate.getDate().toString().padStart(2, '0');
                                const displayDate = `${month} ${day}`;
                                const displayImg = event.imageUrl || 'https://images.unsplash.com/photo-1470229722913-7c092bb46961?w=800&q=80';

                                return (
                                    <div key={event._id} style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        backgroundColor: 'var(--color-bg-dark)',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: 'border-thin',
                                        transition: 'transform 0.3s ease',
                                        flexWrap: 'wrap'
                                    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                                        {/* Event Image */}
                                        <div style={{ flex: '1 1 250px', minHeight: '200px', backgroundImage: `url(${displayImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                                        {/* Event Details */}
                                        <div style={{ flex: '2 1 400px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                                <span style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-accent-primary)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                                                    {displayDate} {event.time && `| ${event.time}`}
                                                </span>
                                            </div>
                                            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{event.title}</h3>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '24px' }}>{event.description}</p>
                                            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Learn More <ChevronRight size={16} color="var(--color-accent-primary)" />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem', backgroundColor: 'var(--color-bg-dark)', borderRadius: '12px', border: '1px dashed var(--color-border-outline)' }}>
                                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No upcoming events currently scheduled.</p>
                                <p>Please check back later or join us for our regular Sunday services.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section >

            {/* Media Collection */}
            < section className="section-padding" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
                <div className="container">
                    <div className="mb-64" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Sermons & Teachings</span>
                            <h2>Recent Messages</h2>
                        </div>
                        <Link to="/media" className="btn-outline" style={{ padding: '10px 24px' }}>View All Sermons</Link>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            "https://www.youtube.com/embed/Wdb2nQyi9QU?si=F2M45NXiYX5H3i5h",
                            "https://www.youtube.com/embed/odpBYIqEeTk?si=80vUK42yv5UXlvMd",
                            "https://www.youtube.com/embed/UEBK2hKS504?si=SOMqcgCtLPLTcZVo"
                        ].map((videoSrc, idx) => (
                            <div key={idx} style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                backgroundColor: '#000',
                                border: 'var(--border-thin)',
                                cursor: 'default',
                                display: 'block',
                                width: '100%',
                                aspectRatio: '16/9',
                                position: 'relative'
                            }} className="media-card hover-glow">
                                <iframe
                                    src={videoSrc}
                                    title={`YouTube video player ${idx + 1}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }}
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Testimonials (Minimal Slider Style) */}
            < section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '40px' }}>Lives Transformed</span>

                    <div
                        style={{ padding: '0 20px', minHeight: '160px' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <p
                            key={currentTestimonial}
                            className="animate-fade-in"
                            style={{
                                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                                fontFamily: 'var(--font-heading)',
                                lineHeight: 1.6,
                                color: 'var(--color-text-primary)',
                                marginBottom: '32px',
                                fontStyle: 'italic',
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)' // Enhances legibility lightly against bright background cards
                            }}
                        >
                            "{testimonials[currentTestimonial].text}"
                        </p>
                        <div style={{ height: '2px', width: '40px', backgroundColor: 'var(--color-accent-primary)', margin: '0 auto 24px auto' }}></div>
                        <strong className="animate-fade-in" key={`author-${currentTestimonial}`} style={{ display: 'block', fontSize: '1rem', color: 'var(--color-text-primary)', fontWeight: '700' }}>
                            {testimonials[currentTestimonial].author}
                        </strong>
                        <span className="animate-fade-in" key={`tag-${currentTestimonial}`} style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                            {testimonials[currentTestimonial].tag}
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', flexWrap: 'wrap' }}>
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    backgroundColor: currentTestimonial === idx ? 'var(--color-accent-primary)' : 'var(--color-text-muted)',
                                    opacity: currentTestimonial === idx ? 1 : 0.3,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section >

            {/* Give Section */}
            < section className="section-padding" style={{ backgroundColor: 'var(--color-bg-dark)', borderTop: 'var(--border-thin)' }}>
                <div className="container text-center" style={{ maxWidth: '600px' }}>
                    <Heart size={40} color="var(--color-accent-primary)" strokeWidth={1} style={{ margin: '0 auto 24px auto' }} />
                    <h2 className="mb-24">Partner With Us</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '40px' }}>
                        Your generosity helps us take the Gospel of grace and power to the nations. Give securely and be a part of what God is doing.
                    </p>
                    <Link to="/giving" className="btn-primary" style={{ padding: '16px 40px' }}>
                        Give Securely Online
                    </Link>
                </div>
            </section >
        </>
    );
};

export default HomePage;
