import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, CreditCard, Building, QrCode, Download, Smartphone } from 'lucide-react';

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

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = qr.image;
        a.download = `elohim-fire-upi-${qr.id}.jpg`;
        a.click();
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: 'var(--color-bg-darker)',
                borderRadius: '20px',
                border: hovered ? '1px solid var(--color-gold)' : '1px solid var(--color-gold-dark)',
                boxShadow: hovered ? 'var(--glow-gold)' : 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                width: '100%',
            }}
        >
            {/* Card Header */}
            <div style={{
                width: '100%',
                background: `linear-gradient(135deg, ${qr.color}22, ${qr.color}44)`,
                borderBottom: `1px solid ${qr.color}55`,
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: qr.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.65rem', textAlign: 'center', lineHeight: 1 }}>{qr.badge}</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>{qr.bank}</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>A/C ending ••• {qr.accountEnd}</div>
                </div>
            </div>

            {/* QR Image */}
            <div style={{ padding: '1.5rem', width: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    width: '240px',
                    height: '240px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '3px solid rgba(212,175,55,0.2)',
                    boxShadow: hovered ? '0 0 20px rgba(212,175,55,0.15)' : 'none',
                    transition: 'box-shadow 0.3s ease',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <img
                        src={qr.image}
                        alt={`UPI QR Code for ${qr.bank}`}
                        style={{
                            width: '240px',
                            height: '240px',
                            objectFit: 'contain',
                            transform: 'none',
                            display: 'block',
                        }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '0 1.5rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
                {/* UPI ID */}
                <div style={{
                    backgroundColor: 'rgba(212,175,55,0.07)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    textAlign: 'center',
                    marginBottom: '0.75rem',
                }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.72rem', display: 'block', marginBottom: '3px' }}>UPI ID</span>
                    <span style={{ color: 'var(--color-gold)', fontWeight: '600', fontSize: '0.88rem', letterSpacing: '0.5px', wordBreak: 'break-all' }}>{qr.upiId}</span>
                </div>
                <div style={{
                    backgroundColor: 'rgba(212,175,55,0.04)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    textAlign: 'center',
                    marginBottom: '0.75rem',
                }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.72rem' }}>Scan with any UPI app</span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                        {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(app => (
                            <span key={app} style={{
                                fontSize: '0.65rem',
                                backgroundColor: 'rgba(255,255,255,0.06)',
                                color: 'var(--color-text-secondary)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                            }}>{app}</span>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleDownload}
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(212,175,55,0.3)',
                        color: 'var(--color-gold)',
                        padding: '0.6rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <Download size={14} />
                    Save QR
                </button>
            </div>
        </div>
    );
};

const GivingPage = () => {
    const qrScrollRef = useRef(null);
    const bankScrollRef = useRef(null);
    const [activeQrIndex, setActiveQrIndex] = useState(1); // Default to middle (Kotak)
    const [activeBankIndex, setActiveBankIndex] = useState(0);

    const handleScroll = (ref, setIndex) => {
        if (!ref.current) return;
        const scrollLeft = ref.current.scrollLeft;
        const width = ref.current.offsetWidth;
        if (width === 0) return;
        const newIndex = Math.round(scrollLeft / width);
        setIndex(newIndex);
    };

    useEffect(() => {
        // Scroll to middle card on mobile load
        if (window.innerWidth <= 768 && qrScrollRef.current) {
            const container = qrScrollRef.current;
            // Center the middle (index 1) card
            container.scrollLeft = container.offsetWidth;
        }
    }, []);

    const PaginationDots = ({ count, activeIndex }) => (
        <div className="pagination-dots">
            {[...Array(count)].map((_, i) => (
                <div key={i} className={`dot ${i === activeIndex ? 'active' : ''}`} />
            ))}
        </div>
    );

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
                            <Heart color="var(--color-fire)" size={48} fill="var(--color-fire)" style={{ filter: 'drop-shadow(var(--glow-fire))' }} />
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
            <section className="container" style={{ padding: '2rem 20px 6rem' }}>
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
                            backgroundColor: 'var(--color-gold)',
                            color: '#000',
                            border: 'none',
                            padding: '16px 40px',
                            borderRadius: '8px',
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
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                <Smartphone size={32} color="var(--color-gold)" />
                                <h2 style={{ margin: 0 }}>UPI / PhonePe Payment</h2>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', margin: '0 auto', maxWidth: '500px' }}>
                                Scan any QR code below using PhonePe, Google Pay, Paytm, or any UPI app to give instantly.
                            </p>
                        </div>

                        <div
                            ref={qrScrollRef}
                            onScroll={() => handleScroll(qrScrollRef, setActiveQrIndex)}
                            style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                overflowX: 'auto',
                                paddingBottom: '10px',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                scrollSnapType: 'x mandatory'
                            }} className="qr-container-mobile">
                            <style>{`
                                .qr-container-mobile::-webkit-scrollbar {
                                    display: none;
                                }
                                @media (min-width: 769px) {
                                    .qr-container-mobile {
                                        display: grid !important;
                                        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
                                        gap: 2rem !important;
                                        overflow-x: visible !important;
                                        padding: 0 !important;
                                        scroll-snap-type: none !important;
                                    }
                                    .mobile-pagination { display: none !important; }
                                }
                                @media (max-width: 768px) {
                                    .qr-card-wrapper {
                                        min-width: 100%;
                                        flex-shrink: 0;
                                        scroll-snap-align: center;
                                        padding: 0 10px;
                                        box-sizing: border-box;
                                    }
                                }
                            `}</style>
                            {qrCodes.map(qr => (
                                <div key={qr.id} className="qr-card-wrapper">
                                    <QRCard qr={qr} />
                                </div>
                            ))}
                        </div>
                        <div className="mobile-pagination">
                            <PaginationDots count={qrCodes.length} activeIndex={activeQrIndex} />
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

                        <div
                            ref={bankScrollRef}
                            onScroll={() => handleScroll(bankScrollRef, setActiveBankIndex)}
                            style={{
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '1rem',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch'
                            }} className="bank-container-mobile">
                            <style>{`
                                .bank-container-mobile::-webkit-scrollbar { display: none; }
                                @media (min-width: 769px) {
                                    .bank-container-mobile {
                                        display: grid !important;
                                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
                                        gap: 1.5rem !important;
                                        overflow-x: visible !important;
                                        scroll-snap-type: none !important;
                                    }
                                }
                                @media (max-width: 768px) {
                                    .bank-card-wrapper {
                                        min-width: 100%;
                                        flex-shrink: 0;
                                        scroll-snap-align: center;
                                        padding: 0 5px;
                                        box-sizing: border-box;
                                    }
                                }
                            `}</style>

                            <div className="bank-card-wrapper">
                                {/* SBI Card */}
                                <div style={{
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    background: 'linear-gradient(135deg, #0a3d8f 0%, #1a6fdc 50%, #0d4fa8 100%)',
                                    boxShadow: '0 8px 32px rgba(26, 95, 172, 0.4)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: '#fff',
                                    height: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    {/* Decorative circles */}
                                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                                    <div style={{ position: 'absolute', bottom: '-40px', right: '40px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

                                    {/* Bank name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: '#0a3d8f', fontWeight: '900', fontSize: '0.7rem' }}>SBI</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '0.5px' }}>State Bank of India</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>The Banker to Every Indian</div>
                                        </div>
                                    </div>

                                    {/* Account Number */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Account Number</div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: '700', letterSpacing: '3px' }}>
                                            2037 5309 251
                                        </div>
                                    </div>

                                    {/* Holder & details */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Account Holder</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>CH. Harish</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>IFSC Code</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', fontFamily: 'monospace' }}>SBIN0010689</div>
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Branch</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Beeramguda</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bank-card-wrapper">
                                {/* Kotak Card */}
                                <div style={{
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    background: 'linear-gradient(135deg, #b22000 0%, #e63900 50%, #c42800 100%)',
                                    boxShadow: '0 8px 32px rgba(200, 40, 0, 0.4)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: '#fff',
                                    height: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    {/* Decorative circles */}
                                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                                    <div style={{ position: 'absolute', bottom: '-40px', right: '40px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

                                    {/* Bank name */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: '#b22000', fontWeight: '900', fontSize: '0.7rem' }}>KOTAK</span>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '0.5px' }}>Kotak Mahindra Bank</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Let's Make Money Simple</div>
                                        </div>
                                    </div>

                                    {/* Account Number */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Account Number</div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: '700', letterSpacing: '3px' }}>
                                            1715 072 726
                                        </div>
                                    </div>

                                    {/* Holder & details */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Account Holder</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Ch. Harish (Joshua)</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>IFSC Code</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', fontFamily: 'monospace' }}>KKBK0007454</div>
                                        </div>
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <div style={{ fontSize: '0.65rem', opacity: 0.7, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '3px' }}>Branch</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Patancheru</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mobile-pagination">
                            <PaginationDots count={2} activeIndex={activeBankIndex} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default GivingPage;
