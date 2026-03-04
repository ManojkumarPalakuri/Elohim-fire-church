import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-bg-dark)',
            borderTop: 'var(--border-thin)',
            paddingTop: '64px',
            paddingBottom: '32px'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px',
                    marginBottom: '64px'
                }}>

                    {/* Column 1: Brand & Mission */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <img src="/logo.png" alt="Elohim Fire Ministries Logo" style={{ height: '90px', objectFit: 'contain', borderRadius: '6px' }} />
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                            A global ministry dedicated to teaching the uncompromised Word of God, moving in the prophetic, and experiencing the power of His presence.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div style={{ paddingLeft: 'clamp(0px, 5vw, 40px)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '20px', letterSpacing: '1px' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link to="/about" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>About Us</Link></li>
                            <li><Link to="/services" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Service Times</Link></li>
                            <li><Link to="/media" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Watch Live</Link></li>
                            <li><Link to="/giving" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Give Online</Link></li>
                            <li><Link to="/contact" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Social */}
                    <div>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '20px', letterSpacing: '1px' }}>Connect</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                <MapPin size={18} style={{ color: 'var(--color-accent-primary)', marginTop: '2px' }} />
                                <span>Hyderabad, India</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                <Phone size={18} style={{ color: 'var(--color-accent-primary)' }} />
                                <span>+91 7095409118</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                <Mail size={18} style={{ color: 'var(--color-accent-primary)' }} />
                                <span>chevvaharish87@gmail.com</span>
                            </li>
                        </ul>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="https://www.facebook.com/profile.php?id=100076227227459&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}><Facebook size={20} /></a>
                            <a href="https://instagram.com/prophet_joshua_official?igshid=NGExMmI2YTkyZg==" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}><Instagram size={20} /></a>
                            <a href="https://youtube.com/@prophetjoshua6374?si=dGfgURVT4xawDOF_" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}><Youtube size={20} /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Line */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', letterSpacing: '1px', textAlign: 'center' }}>
                        &copy; {new Date().getFullYear()} Elohim Fire Ministries. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
