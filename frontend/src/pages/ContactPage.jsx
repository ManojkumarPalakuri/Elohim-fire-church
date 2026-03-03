import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api/apiConfig.js';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'contact', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });

        try {
            await axios.post(`${API_BASE_URL}/messages`, formData);
            setStatus({ loading: false, success: true, error: '' });
            setFormData({ name: '', email: '', phone: '', type: 'contact', message: '' });
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setStatus({ loading: false, success: false, error: msg });
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact & Prayer | Elohim Fire Ministries</title>
                <meta name="description" content="Get in touch with Elohim Fire Ministries or submit a prayer request." />
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
                    }}>Let's Connect</span>
                    <h1 style={{
                        marginBottom: '1rem',
                        color: 'var(--color-text-primary)',
                        fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                        lineHeight: '0.95',
                        fontWeight: '900',
                        letterSpacing: '-2px',
                        textTransform: 'uppercase'
                    }}>
                        Contact & <span className="text-secondary" style={{ fontStyle: 'italic' }}>Prayer</span>
                    </h1>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                        lineHeight: 1.5,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        We are here to agree with you in prayer and answer any questions you may have. Connect with us.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '64px'
                }}>

                    {/* Contact Details & Map */}
                    <div>
                        <h2 className="mb-48" style={{ fontSize: '2rem' }}>Get In Touch</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'rgba(255,106,0,0.1)', padding: '16px', borderRadius: '50%' }}>
                                    <MapPin size={24} color="var(--color-accent-primary)" />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>Our Locations</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Hyderabad, India</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'rgba(255,106,0,0.1)', padding: '16px', borderRadius: '50%' }}>
                                    <Phone size={24} color="var(--color-accent-primary)" />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>Call Us</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>+91 7095409118</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'rgba(255,106,0,0.1)', padding: '16px', borderRadius: '50%' }}>
                                    <Mail size={24} color="var(--color-accent-primary)" />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>Email Us</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>chevvaharish87@gmail.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ backgroundColor: 'rgba(37,211,102,0.1)', padding: '16px', borderRadius: '50%' }}>
                                    <MessageCircle size={24} color="#25D366" />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>WhatsApp Chat</h3>
                                    <a href="https://wa.me/917095409118" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>Chat with us now</a>
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Embed */}
                        <div style={{
                            width: '100%',
                            height: '300px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: 'var(--border-thin)',
                            boxShadow: 'var(--shadow-subtle)'
                        }}>
                            <iframe
                                src="https://maps.google.com/maps?q=Church&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Church Location Map">
                            </iframe>
                        </div>
                    </div>

                    {/* Contact & Prayer Form */}
                    <div className="modern-card">
                        <h2 className="mb-32" style={{ fontSize: '1.8rem' }}>Send a <span className="text-secondary" style={{ fontStyle: 'italic' }}>Message</span></h2>

                        {status.success ? (
                            <div style={{ backgroundColor: 'rgba(40,167,69,0.05)', border: '1px solid rgba(40,167,69,0.2)', padding: '32px', borderRadius: '8px', textAlign: 'center', color: '#28a745' }}>
                                <h3 style={{ marginBottom: '16px' }}>Message Sent!</h3>
                                <p style={{ marginBottom: '24px' }}>Thank you for reaching out. Our team will read your message and pray for your request.</p>
                                <button onClick={() => setStatus({ ...status, success: false })} className="btn-outline" style={{ color: '#28a745', borderColor: '#28a745' }}>Send Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label htmlFor="type" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Nature of Message</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        style={{
                                            padding: '14px 16px',
                                            backgroundColor: 'var(--color-bg-dark)',
                                            border: 'var(--border-thin)',
                                            color: 'var(--color-text-primary)',
                                            borderRadius: '8px',
                                            fontFamily: 'inherit',
                                            fontSize: '1rem',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        required
                                    >
                                        <option value="contact">General Inquiry / Contact</option>
                                        <option value="prayer">Prayer Request</option>
                                        <option value="testimony">Share a Testimony</option>
                                    </select>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label htmlFor="name" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Full Name <span className="text-accent">*</span></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        style={{ padding: '14px 16px', backgroundColor: 'var(--color-bg-dark)', border: 'var(--border-thin)', color: 'var(--color-text-primary)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.3s ease' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="email" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Email Address <span className="text-accent">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            style={{ padding: '14px 16px', backgroundColor: 'var(--color-bg-dark)', border: 'var(--border-thin)', color: 'var(--color-text-primary)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none' }}
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="phone" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            style={{ padding: '14px 16px', backgroundColor: 'var(--color-bg-dark)', border: 'var(--border-thin)', color: 'var(--color-text-primary)', borderRadius: '8px', fontFamily: 'inherit', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label htmlFor="message" style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>Message / Prayer Request <span className="text-accent">*</span></label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help or pray for you?"
                                        rows="6"
                                        style={{ padding: '14px 16px', backgroundColor: 'var(--color-bg-dark)', border: 'var(--border-thin)', color: 'var(--color-text-primary)', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
                                        required
                                    />
                                </div>

                                {status.error && (
                                    <div style={{ backgroundColor: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.3)', padding: '14px 16px', borderRadius: '8px', color: '#dc3545', fontSize: '0.9rem' }}>
                                        {status.error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status.loading}
                                    className="btn-primary"
                                    style={{
                                        marginTop: '16px',
                                        width: '100%',
                                        opacity: status.loading ? 0.7 : 1,
                                        cursor: status.loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {status.loading ? 'Sending...' : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
