import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: '#0a0a0a',
            borderTop: '1px solid rgba(255, 215, 0, 0.1)',
            paddingTop: 'var(--footer-pt, 80px)',
            paddingBottom: 'var(--footer-pb, 40px)',
            paddingLeft: '20px',
            paddingRight: '20px'
        }} className="dynamic-footer-padding">
            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
                    gap: 60px;
                    margin-bottom: 64px;
                }
                
                .footer-col-1 { order: 1; }
                .footer-col-2 { order: 2; }
                .footer-col-3 { order: 3; }
                .footer-col-4 { order: 4; }

                .social-icon-circle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.3s ease;
                }
                .social-icon-circle:hover {
                    background: rgba(212, 175, 55, 0.15);
                    color: var(--color-gold) !important;
                    border-color: rgba(212, 175, 55, 0.4);
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
                    transform: translateY(-3px);
                }

                .footer-link {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.95rem;
                    transition: color 0.2s ease, transform 0.2s ease;
                    display: inline-block;
                }
                .footer-link:hover {
                    color: var(--color-gold);
                    transform: translateX(4px);
                }

                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 48px;
                    }
                }
                
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                        text-align: center;
                    }
                    /* Mobile Order: Logo -> Give -> Links -> Contact & Social */
                    .footer-col-1 { order: 1; }
                    .footer-col-2 { order: 2; }
                    .footer-col-3 { order: 3; }
                    .footer-col-4 { order: 4; }

                    /* Contact & Social Grouping */
                    .footer-contact-list {
                        align-items: center !important;
                        gap: 12px !important;
                        margin-bottom: 20px !important;
                    }
                    .social-icons-wrapper {
                        justify-content: center !important;
                    }
                    
                    /* Dynamic Padding */
                    .dynamic-footer-padding {
                        --footer-pt: 48px;
                        --footer-pb: 32px;
                    }
                    
                    /* Visual Dividers */
                    .mobile-divider {
                        display: block;
                        width: 100%;
                        height: 1px;
                        background: rgba(255,255,255,0.06);
                        margin: 32px 0;
                    }
                }
                @media (min-width: 769px) {
                    .mobile-divider { display: none; }
                }
            `}</style>
            <div className="container">
                <div className="footer-grid">

                    {/* Column 1: Brand & Mission */}
                    <div className="footer-col-1">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'inherit' }} className="mobile-center-flex">
                            <style>{`
                                @media (max-width: 768px) {
                                    .mobile-center-flex { justify-content: center !important; }
                                    .mobile-center-text { text-align: center !important; }
                                }
                            `}</style>
                            <img src="/logo.png" alt="Elohim Fire Ministries Logo" style={{ height: '45px', objectFit: 'contain' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }} className="mobile-center-text">
                                <h2 style={{ fontSize: '1.4rem', color: '#ffffff', margin: 0, letterSpacing: '1px', fontFamily: 'var(--font-logo)' }}>
                                    ELOHIM <span style={{ color: 'var(--color-gold)' }}>FIRE</span>
                                </h2>
                                <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '3px', marginTop: '2px' }}>MINISTRIES</span>
                            </div>
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }} className="mobile-center-margin">
                            <style>{`@media (max-width: 768px) { .mobile-center-margin { margin: 0 auto; } }`}</style>
                            A global ministry dedicated to teaching the uncompromised Word of God, moving in the prophetic, and experiencing the power of His presence.
                        </p>
                    </div>

                    <div className="mobile-divider"></div>

                    {/* Column 3: Quick Links */}
                    <div className="footer-col-2">
                        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '20px', letterSpacing: '0.5px' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><Link to="/about" className="footer-link" style={{ padding: '4px 0' }}>About Us</Link></li>
                            <li><Link to="/services" className="footer-link" style={{ padding: '4px 0' }}>Service Times</Link></li>
                            <li><Link to="/media" className="footer-link" style={{ padding: '4px 0' }}>Watch Live</Link></li>
                            <li><Link to="/bible" className="footer-link" style={{ padding: '4px 0' }}>Online Bible</Link></li>
                        </ul>
                    </div>

                    <div className="mobile-divider"></div>

                    {/* Column 3: Support Ministry */}
                    <div className="footer-col-3">
                        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.5px' }}>Support The Ministry</h3>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                            Partner with us to spread the gospel message worldwide through your generous giving.
                        </p>
                        <Link
                            to="/giving"
                            className="give-btn-desktop"
                            style={{ textDecoration: 'none' }}
                        >
                            <Heart size={16} fill="#ff0000" stroke="#ffffff" strokeWidth={2} /> Give Online
                        </Link>
                    </div>

                    <div className="mobile-divider"></div>

                    {/* Column 4: Contact & Social */}
                    <div className="footer-col-4">
                        <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '24px', letterSpacing: '0.5px' }}>Get In Touch</h3>
                        <ul className="footer-contact-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', alignItems: 'flex-start' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)' }}>
                                    <MapPin size={16} color="var(--color-gold)" />
                                </div>
                                <span>Hyderabad, India</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)' }}>
                                    <Phone size={16} color="var(--color-gold)" />
                                </div>
                                <span>+91 7095409118</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.1)' }}>
                                    <Mail size={16} color="var(--color-gold)" />
                                </div>
                                <span>chevvaharish87@gmail.com</span>
                            </li>
                        </ul>

                        <div className="social-icons-wrapper" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start' }}>
                            <a href="https://www.facebook.com/profile.php?id=100076227227459&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><Facebook size={18} /></a>
                            <a href="https://instagram.com/prophet_joshua_official?igshid=NGExMmI2YTkyZg==" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><Instagram size={18} /></a>
                            <a href="https://youtube.com/@prophetjoshua6374?si=dGfgURVT4xawDOF_" target="_blank" rel="noopener noreferrer" className="social-icon-circle"><Youtube size={18} /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Line */}
                <div style={{
                    borderTop: 'none',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    paddingBottom: '0'
                }}>
                    <img src="/logo.png" alt="EFM Logo Mark" style={{ height: '24px', opacity: 0.3 }} />
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', letterSpacing: '0.5px', textAlign: 'center', margin: 0 }}>
                        &copy; {new Date().getFullYear()} Elohim Fire Ministries. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
