import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Heart, Info, Book, Clock, Radio, Hand } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: '#0a0a0a',
            borderTop: '1px solid rgba(255, 215, 0, 0.1)',
            paddingTop: 'var(--footer-pt, 80px)',
            paddingBottom: 'var(--footer-pb, 40px)',
            paddingLeft: '20px',
            paddingRight: '20px',
            position: 'relative',
            zIndex: 10
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
                    color: #FFFFFF;
                    transition: all 0.3s ease;
                    border: none;
                }
                .facebook-color { background: #1877F2; }
                .instagram-color { background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); }
                .youtube-color { background: #FF0000; }
                .social-icon-circle:hover {
                    transform: translateY(-5px);
                    filter: brightness(1.2);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }
                .social-icon-circle:hover {
                    background: rgba(212, 175, 55, 0.15);
                    color: var(--color-gold) !important;
                    border-color: rgba(212, 175, 55, 0.4);
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
                    transform: translateY(-3px);
                }

                .footer-link {
                    color: #FFFFFF;
                    font-size: 0.95rem;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .footer-link:hover {
                    color: var(--color-gold);
                    transform: translateX(4px);
                }

                /* Mobile Footer Cards */
                .mobile-footer-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 32px;
                }

                .quick-links-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .link-card {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                    text-align: center;
                }
                .link-card:active {
                    transform: scale(0.95);
                    background: rgba(212, 175, 55, 0.1);
                    border-color: var(--color-gold);
                }

                .contact-card-mobile {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                    margin-bottom: 12px;
                    text-align: left;
                }

                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 48px;
                    }
                }
                
                @media (max-width: 1024px) {
                    .footer-grid {
                        display: flex;
                        flex-direction: column;
                        gap: 0;
                        margin-bottom: 32px;
                    }
                    
                    .desktop-only-footer-content {
                        display: none;
                    }

                    .mobile-only-footer-content {
                        display: block;
                    }

                    .dynamic-footer-padding {
                        --footer-pt: 40px;
                        --footer-pb: 100px; /* Space for bottom nav */
                    }

                    .footer-section-title {
                        font-size: 1.25rem !important;
                        font-weight: 700 !important;
                        margin-bottom: 24px !important;
                        text-align: center;
                        color: #fff;
                    }
                }

                @media (min-width: 1025px) {
                    .mobile-only-footer-content { display: none; }
                }
            `}</style>

            <div className="container">
                {/* --- DESKTOP VIEW --- */}
                <div className="footer-grid desktop-only-footer-content">
                    {/* Column 1: Brand */}
                    <div className="footer-col-1">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <img src="/logo.png" alt="EFM" style={{ height: '40px' }} />
                            <div>
                                <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontFamily: 'var(--font-logo)' }}>ELOHIM FIRE</h2>
                                <span style={{ fontSize: '0.6rem', color: '#FFFFFF', letterSpacing: '2px' }}>MINISTRIES</span>
                            </div>
                        </div>
                        <p style={{ color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Global ministry dedicated to teaching the Word, prophetic movement, and the power of His presence.
                        </p>
                    </div>

                    {/* Column 2: Links */}
                    <div className="footer-col-2">
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px' }}>Quick Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><Link to="/about" className="footer-link">About Us</Link></li>
                            <li><Link to="/services" className="footer-link">Service Times</Link></li>
                            <li><Link to="/media" className="footer-link">Watch Live</Link></li>
                            <li><Link to="/bible" className="footer-link">Online Bible</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div className="footer-col-3">
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px' }}>Support</h3>
                        <p style={{ color: '#FFFFFF', fontSize: '0.9rem', marginBottom: '20px' }}>
                            Partner with us in spreading the Gospel worldwide.
                        </p>
                        <Link to="/giving" className="give-btn-desktop">
                            <Heart size={16} fill="#ff0000" stroke="#fff" /> Give Online
                        </Link>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="footer-col-4">
                        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px' }}>Contact</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', gap: '10px', color: '#FFFFFF', fontSize: '0.9rem' }}>
                                <MapPin size={16} color="var(--color-gold)" /> Hyderabad, India
                            </li>
                            <li style={{ display: 'flex', gap: '10px', color: '#FFFFFF', fontSize: '0.9rem' }}>
                                <Phone size={16} color="var(--color-gold)" /> +91 7095409118
                            </li>
                        </ul>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                            <a href="#" className="social-icon-circle facebook-color"><Facebook size={18} fill="#fff" /></a>
                            <a href="#" className="social-icon-circle instagram-color"><Instagram size={18} fill="#fff" /></a>
                            <a href="#" className="social-icon-circle youtube-color"><Youtube size={18} fill="#fff" /></a>
                        </div>
                    </div>
                </div>

                {/* --- MOBILE VIEW --- */}
                <div className="mobile-only-footer-content">
                    {/* Brand Card */}
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <img src="/logo.png" alt="EFM" style={{ height: '54px', marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '1.6rem', color: '#fff', margin: 0, fontFamily: 'var(--font-logo)' }}>ELOHIM <span style={{ color: 'var(--color-gold)' }}>FIRE</span></h2>
                        <span style={{ fontSize: '0.7rem', color: '#FFFFFF', letterSpacing: '4px' }}>MINISTRIES</span>
                    </div>

                    {/* Quick & Premium Links Card */}
                    <div className="mobile-footer-card">
                        <h3 className="footer-section-title">Quick Links</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link to="/about" className="footer-cta-btn" style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #EE5D00 100%)' }}>
                                <Info size={20} />
                                <span>About Us</span>
                            </Link>
                            <Link to="/services" className="footer-cta-btn" style={{ background: '#0056b3' }}>
                                <Clock size={20} />
                                <span>Service Times</span>
                            </Link>
                            <Link to="/media" className="footer-cta-btn" style={{ background: 'linear-gradient(135deg, #FF0000 0%, #B20000 100%)' }}>
                                <Radio size={20} />
                                <span>Watch Live</span>
                            </Link>
                            <Link to="/contact" className="footer-cta-btn" style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #EE5D00 100%)' }}>
                                <Hand size={20} />
                                <span>Prayer Request</span>
                            </Link>
                        </div>
                    </div>

                    <style>{`
                        .footer-cta-btn {
                            width: 100%;
                            height: 54px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 12px;
                            border-radius: 0;
                            color: #fff;
                            text-decoration: none;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-size: 0.85rem;
                            transition: all 0.2s ease;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                        }
                        .footer-cta-btn:active {
                            transform: scale(0.96);
                        }
                    `}</style>

                    {/* Support Card */}
                    <div className="mobile-footer-card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(255,106,0,0.05) 100%)', borderColor: 'rgba(212,175,55,0.1)' }}>
                        <h3 className="footer-section-title">Support The Ministry</h3>
                        <p style={{ color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>
                            Your generosity helps us spread the gospel message locally and globally.
                        </p>
                        <Link to="/giving" className="btn-primary" style={{ width: '100%', borderRadius: '12px', textDecoration: 'none' }}>
                            <Heart size={18} fill="#fff" /> Give Online
                        </Link>
                    </div>

                    {/* Contact Cards */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 className="footer-section-title">Get In Touch</h3>
                        <div className="contact-card-mobile" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <MapPin size={22} color="#fff" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Location</p>
                                <p style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: 600 }}>Hyderabad, India</p>
                            </div>
                        </div>
                        <div className="contact-card-mobile" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Phone size={22} color="#fff" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Us</p>
                                <p style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: 600 }}>+91 7095409118</p>
                            </div>
                        </div>
                        <div className="contact-card-mobile" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                            <div style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #EE5D00 100%)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Mail size={22} color="#fff" />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</p>
                                <p style={{ margin: 0, fontSize: '14px', color: '#fff', fontWeight: 600 }}>chevvaharish87@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Socials Mobile */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                        <a href="https://facebook.com" className="social-icon-circle facebook-color"><Facebook size={20} fill="#fff" /></a>
                        <a href="https://instagram.com" className="social-icon-circle instagram-color"><Instagram size={20} fill="#fff" /></a>
                        <a href="https://youtube.com" className="social-icon-circle youtube-color"><Youtube size={20} fill="#fff" /></a>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '24px',
                    textAlign: 'center'
                }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', margin: 0 }}>
                        &copy; {new Date().getFullYear()} Elohim Fire Ministries. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
