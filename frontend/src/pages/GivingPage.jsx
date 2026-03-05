import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, CreditCard, Building, QrCode, Download, Smartphone, Copy, CheckCircle2 } from 'lucide-react';

const qrCodes = [
    {
        id: 'sbi',
        bank: 'State Bank of India',
        accountEnd: '9251',
        upiId: '7095409118@axl',
        image: '/qr/qr-sbi-9251.jpg',
        color: '#1a5fac',
        badge: 'SBI',
    },
    {
        id: 'kotak',
        bank: 'Kotak Mahindra Bank',
        accountEnd: '2726',
        upiId: 'chevva.harish@ibl',
        image: '/qr/qr-kotak-2726.jpg',
        color: '#e33a24',
        badge: 'Kotak',
    },
    {
        id: 'axis',
        bank: 'Axis Bank',
        accountEnd: '5775',
        upiId: '7095409118-2@ibl',
        image: '/qr/qr-axis-5775.jpg',
        color: '#97144d',
        badge: 'Axis',
    },
];

const QRCard = ({ qr }) => {
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = qr.image;
        a.download = `elohim-fire-upi-${qr.id}.jpg`;
        a.click();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qr.upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'linear-gradient(180deg, #121212, #0a0a0a)',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: hovered ? 'var(--glow-gold)' : '0 8px 30px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            }}
        >
            <div style={{
                width: '100%',
                margin: '0 auto',
            }} className="qr-card-inner-mobile">
                <style>{`
                    @media (min-width: 769px) {
                        .qr-card-inner-mobile {
                            max-width: 360px !important;
                        }
                    }
                `}</style>
                {/* Card Header */}
                <div style={{
                    width: '100%',
                    padding: '20px 22px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: qr.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.6rem', textAlign: 'center', lineHeight: 1 }}>{qr.badge}</span>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '1.1rem' }}>{qr.bank}</div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={{ padding: '0 22px 24px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* QR Image */}
                    <div style={{
                        width: '100%',
                        maxWidth: '220px',
                        height: 'auto',
                        aspectRatio: '1/1',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '3px solid rgba(212,175,55,0.15)',
                        boxShadow: hovered ? '0 0 20px rgba(212,175,55,0.15)' : 'none',
                        transition: 'box-shadow 0.3s ease',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginBottom: '20px',
                        margin: '0 auto 20px auto',
                    }}>
                        <img
                            src={qr.image}
                            alt={`UPI QR Code for ${qr.bank}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </div>

                    {/* UPI ID */}
                    <div style={{
                        width: '100%',
                        backgroundColor: 'rgba(212,175,55,0.05)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        borderRadius: '14px',
                        padding: '0.9rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        boxSizing: 'border-box',
                    }}>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>UPI ID</span>
                            <span style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.5px', wordBreak: 'break-all' }}>{qr.upiId}</span>
                        </div>
                        <button
                            onClick={handleCopy}
                            style={{
                                background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(212,175,55,0.1)',
                                border: 'none',
                                borderRadius: '0',
                                padding: '8px',
                                color: copied ? '#22c55e' : 'var(--color-gold)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                                marginLeft: '12px'
                            }}
                            title="Copy UPI ID"
                        >
                            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        </button>
                    </div>

                    {/* Scan with any UPI app info */}
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: '24px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                            {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                                <span key={app} style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(255,255,255,0.06)',
                                    color: '#ffffff',
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(255,255,255,0.08)'
                                }}>{app}</span>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleDownload}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-gold)',
                            color: 'var(--color-gold)',
                            padding: '0.85rem',
                            borderRadius: '0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.1)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <Download size={18} />
                        Save QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};

const GivingPage = () => {
    const qrScrollRef = useRef(null);

    return (
        <>
            <Helmet>
                <title>Online Giving | Elohim Fire Ministries</title>
                <meta name="description" content="Support the ministry through secure online giving. View our bank details and UPI QR codes." />
            </Helmet>

            {/* Page Header */}
            <section style={{
                padding: '3.5rem 20px 2.5rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, var(--color-bg-darker), var(--color-bg-dark))',
            }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '50%' }}>
                            <Heart color="#ffffff" size={48} fill="#ff0000" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }} />
                        </div>
                    </div>
                    <h1 style={{ marginBottom: '1rem', textShadow: 'var(--glow-gold)' }}>Give &amp; <span className="text-gold">Partner</span></h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                        "Give, and it will be given to you. A good measure, pressed down, shaken together and running over..." - Luke 6:38
                    </p>
                </div>
            </section>

            {/* Areas of Support */}
            <section className="container" style={{ padding: '2rem 20px 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: '12px', border: 'var(--border-thin)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>🤝 Sponsor a Church Member</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Partner to cover a church member's needs — transport, study materials, or ministry expenses. Every sponsor is a seed of grace.</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: '12px', border: 'var(--border-thin)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>🙏 General Giving</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Support the ministry with your tithes, offerings, and partnership gifts to fuel the Gospel of grace and power to the nations.</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: '12px', border: 'var(--border-thin)', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>🍽️ Poor Feeding</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Every 3rd Saturday of the month, we provide meals and support to the less privileged. Your gift feeds a life today.</p>
                    </div>
                </div>
            </section>

            {/* Giving Methods */}
            <section className="container giving-methods-container" style={{ padding: '2rem 20px 6rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>

                    {/* Secure Online Gateway */}
                    <div style={{
                        backgroundColor: 'var(--color-bg-card)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '2px solid var(--color-gold)',
                        boxShadow: 'var(--glow-gold)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: '1.5rem'
                    }}>
                        <CreditCard size={48} color="var(--color-gold)" />
                        <h2>Give Online — Secure & Instant</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Sponsor a church member, support poor feeding, or give a general offering using your Credit/Debit Card or Net Banking.</p>
                        <button style={{
                            backgroundColor: 'var(--color-accent-primary)',
                            color: '#000',
                            border: 'none',
                            padding: '16px 40px',
                            borderRadius: '0',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: 'var(--glow-gold)',
                            cursor: 'pointer',
                        }}>
                            Give Now
                        </button>
                    </div>

                    {/* UPI / PhonePe QR Section */}
                    <div style={{
                        backgroundColor: 'var(--color-bg-card)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '1px solid var(--color-gold-dark)',
                    }} className="qr-section-wrapper">
                        <style>{`
                            @media (max-width: 768px) {
                                .giving-methods-container {
                                    padding-left: 16px !important;
                                    padding-right: 16px !important;
                                    max-width: 100% !important;
                                    overflow: hidden;
                                }
                                .qr-section-wrapper {
                                    padding-left: 0 !important;
                                    padding-right: 0 !important;
                                    border-left: none !important;
                                    border-right: none !important;
                                    border-radius: 0 !important;
                                    /* Offset parent 16px padding for edge-to-edge UPI */
                                    margin-left: -16px;
                                    margin-right: -16px;
                                }
                                .qr-section-header-text {
                                    padding-left: 20px;
                                    padding-right: 20px;
                                }
                            }
                        `}</style>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="qr-section-header-text">
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                <Smartphone size={32} color="var(--color-gold)" />
                                <h2 style={{ margin: 0 }}>UPI / PhonePe Payment</h2>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', margin: '0 auto', maxWidth: '500px' }}>
                                Swipe left to see more bank options and scan to give instantly.
                            </p>
                        </div>

                        <div className="upi-scroll-container-wrapper" style={{ position: 'relative' }}>
                            <div
                                ref={qrScrollRef}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    width: '100%',
                                    overflowX: 'auto',
                                    padding: '10px 0 30px',
                                    WebkitOverflowScrolling: 'touch',
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    scrollSnapType: 'x mandatory',
                                    scrollBehavior: 'smooth',
                                    gap: '20px'
                                }} className="upi-scroll-container">
                                <style>{`
                                    .upi-scroll-container::-webkit-scrollbar {
                                        display: none;
                                    }
                                    .upi-card-fixed-wrapper {
                                        min-width: 300px;
                                        width: 300px;
                                        flex: 0 0 300px;
                                        scroll-snap-align: center;
                                        padding: 0 4px;
                                    }
                                    @media (max-width: 768px) {
                                        .upi-scroll-container {
                                            padding-left: 20px !important;
                                            padding-right: 20px !important;
                                        }
                                        .upi-card-fixed-wrapper {
                                            min-width: 280px;
                                            width: 280px;
                                            flex: 0 0 280px;
                                        }
                                    }
                                    /* Gradient hint for desktop/mobile */
                                    .upi-scroll-fade {
                                        position: absolute;
                                        top: 0;
                                        right: 0;
                                        bottom: 30px;
                                        width: 80px;
                                        background: linear-gradient(to left, var(--color-bg-card), transparent);
                                        pointer-events: none;
                                        z-index: 5;
                                    }
                                `}</style>
                                {qrCodes.map(qr => (
                                    <div key={qr.id} className="upi-card-fixed-wrapper">
                                        <QRCard qr={qr} />
                                    </div>
                                ))}
                            </div>
                            <div className="upi-scroll-fade"></div>
                        </div>
                    </div>

                    {/* Direct Bank Transfer — Clip Cards */}
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                                <Building size={32} color="var(--color-gold)" />
                                <h2 style={{ margin: 0 }}>Direct Bank Transfer</h2>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                Transfer directly to our bank accounts below.
                            </p>
                        </div>

                        <div>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                    gap: '60px',
                                    width: '100%',
                                }}
                                className="premium-bank-cards-grid"
                            >
                                <style>{`
                                    @media (max-width: 768px) {
                                        .premium-bank-cards-grid {
                                            grid-template-columns: 1fr !important;
                                            gap: 24px !important;
                                        }
                                        .bank-card-wrapper {
                                            width: 100%;
                                        }
                                        .bank-card-inner {
                                            width: 100% !important;
                                            max-width: 100% !important;
                                            height: auto !important;
                                            min-height: 260px;
                                            max-height: 83vh;
                                            overflow-y: auto !important;
                                        }
                                    }
                                `}</style>

                                <div className="bank-card-wrapper" style={{ padding: '0' }}>
                                    <div
                                        className="bank-card-inner"
                                        style={{
                                            padding: '32px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            minHeight: '260px',
                                            maxHeight: '83vh',
                                            overflowY: 'auto',
                                            background: 'linear-gradient(135deg, #1d5bbf, #2d74da)',
                                            borderRadius: '24px',
                                            position: 'relative',
                                            boxShadow: '0 16px 32px rgba(45,116,218,0.35)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(45,116,218,0.45)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(45,116,218,0.35)'; }}
                                    >
                                        <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '-50px', right: '-50px', pointerEvents: 'none', zIndex: 0 }}></div>
                                        <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', bottom: '-30px', right: '40px', pointerEvents: 'none', zIndex: 0 }}></div>

                                        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, gap: '12px' }}>
                                            <div style={{ background: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Building size={20} color="#1d5bbf" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '0.5px' }}>State Bank of India</h3>
                                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px', display: 'block' }}>The Banker to Every Indian</span>
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                            <strong style={{ fontSize: '26px', color: '#ffffff', letterSpacing: '4px', fontFamily: '"Courier New", Courier, monospace', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                                                2037 5309 251
                                            </strong>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Account Holder</div>
                                                    <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>CH. Harish</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Branch</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '500' }}>Beeramguda</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
                                                <div style={{ marginTop: 'auto' }}>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>IFSC Code</div>
                                                    <div style={{ fontSize: '1.1rem', color: '#ffffff', fontFamily: '"Courier New", Courier, monospace', letterSpacing: '1px' }}>SBIN0010689</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bank-card-wrapper" style={{ padding: '0' }}>
                                    <div
                                        className="bank-card-inner"
                                        style={{
                                            padding: '32px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            minHeight: '260px',
                                            maxHeight: '83vh',
                                            overflowY: 'auto',
                                            background: 'linear-gradient(135deg, #d61a00, #ff3b1a)',
                                            borderRadius: '24px',
                                            position: 'relative',
                                            boxShadow: '0 16px 32px rgba(255,59,26,0.35)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 48px rgba(255,59,26,0.45)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(255,59,26,0.35)'; }}
                                    >
                                        <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '-50px', right: '-50px', pointerEvents: 'none', zIndex: 0 }}></div>
                                        <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', bottom: '-30px', right: '40px', pointerEvents: 'none', zIndex: 0 }}></div>

                                        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1, gap: '12px' }}>
                                            <div style={{ background: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Building size={20} color="#d61a00" />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '0.5px' }}>Kotak Mahindra Bank</h3>
                                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px', display: 'block' }}>Let's make money simple</span>
                                            </div>
                                        </div>

                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                                            <strong style={{ fontSize: '26px', color: '#ffffff', letterSpacing: '4px', fontFamily: '"Courier New", Courier, monospace', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                                                1715 0727 26
                                            </strong>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Account Holder</div>
                                                    <div style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Ch. Harish (Joshua)</div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Branch</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '500' }}>Patancheru</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
                                                <div style={{ marginTop: 'auto' }}>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>IFSC Code</div>
                                                    <div style={{ fontSize: '1.1rem', color: '#ffffff', fontFamily: '"Courier New", Courier, monospace', letterSpacing: '1px' }}>KKBK0007454</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default GivingPage;
