import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Us | Elohim Fire Ministries</title>
                <meta name="description" content="Learn about the vision, mission, and leadership of Elohim Fire Ministries led by Prophet Joshua." />
            </Helmet>

            {/* Page Header (Minimal Luxury) */}
            <section style={{
                padding: '90px 20px 50px',
                textAlign: 'center',
                backgroundColor: 'var(--color-bg-dark)',
                borderBottom: 'var(--border-thin)'
            }}>
                <div className="container animate-fade-in">
                    <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Our Identity</span>
                    <h1 style={{ marginBottom: '24px' }}>About <span className="text-accent" style={{ fontStyle: 'italic' }}>Us</span></h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 4vw, 1.2rem)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                        A cornerstone of faith, love, and miraculous encounters in the presence of God.
                    </p>
                </div>
            </section>

            {/* Prophet Joshua Profile (Moved to First Section) */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <div className="container delay-100 animate-fade-in">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '80px',
                        alignItems: 'center'
                    }}>
                        {/* Right: Bio (Text naturally on left or right, let's keep text left, portrait right for variety from homepage, or stay consistent. Let's do portrait left.) */}
                        <div style={{ position: 'relative', order: 1 }}>
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
                                    borderRadius: '8px',
                                    position: 'relative',
                                    zIndex: 1,
                                    filter: 'grayscale(10%) contrast(1.1)'
                                }}
                            />
                        </div>

                        <div style={{ order: 2 }}>
                            <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>
                                Senior Pastor & General Overseer
                            </span>
                            <h2 className="mb-32">Prophet <span className="text-secondary">Joshua</span></h2>

                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <p>
                                    Prophet Joshua is called, appointed, and anointed by the Lord Jesus Christ to serve the nations with a divine mission of winning souls for the Kingdom of God.
                                </p>
                                <p>
                                    He carries a powerful Prophetic Teaching Ministry and is anointed in prophecy, healing, miracles, and deliverance. Through the leading of the Holy Spirit, his ministry has impacted countless lives with the transforming power of Christ.
                                </p>
                                <p>
                                    He is the Founder of Elohim Fire Ministries, a ministry dedicated to spreading the Gospel and demonstrating the love and power of Jesus Christ.
                                </p>
                                <p>
                                    Through Elohim Fire Ministries, thousands have been blessed, saved, healed, and delivered.
                                </p>
                                <p>
                                    All glory to Jesus Christ of Nazareth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
                <div className="container delay-200 animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        <div className="modern-card">
                            <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Our Direction</span>
                            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>
                                The Vision
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                To raise a generation of believers who are burning with the fire of the Holy Spirit, walking in dominion, and demonstrating the power of God's Kingdom in every sphere of life.
                            </p>
                        </div>

                        <div className="modern-card">
                            <span style={{ color: 'var(--color-accent-secondary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Our Purpose</span>
                            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>
                                The Mission
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                Our purpose is to reach every corner of India, spreading the Word of God with faith and compassion, bringing healing, hope, and transformation through the power of Jesus Christ.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statement of Faith */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)' }}>
                <div className="container delay-300 animate-fade-in">
                    <div className="text-center mb-64">
                        <span style={{ color: 'var(--color-accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>Doctrine</span>
                        <h2>What We Believe</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {[
                            { title: 'The Trinity', text: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.' },
                            { title: 'The Bible', text: 'We believe the Bible is the inspired, infallible, and authoritative Word of God.' },
                            { title: 'Salvation', text: 'We believe that salvation is a gift from God, received by grace through faith in Jesus Christ.' },
                            { title: 'The Holy Spirit', text: 'We believe in the baptism of the Holy Spirit, empowering believers for witness and service.' },
                            { title: 'Divine Healing', text: 'We believe that divine healing is provided for in the atonement of Christ and is the privilege of all believers.' },
                            { title: 'The Return of Christ', text: 'We believe in the blessed hope—the imminent return of Jesus Christ for His victorious Church.' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                padding: '32px',
                                backgroundColor: 'var(--color-bg-dark)',
                                borderRadius: '12px',
                                border: 'var(--border-thin)',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255,106,0,0.3)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border-thin)';
                                    e.currentTarget.style.transform = 'none';
                                }}>
                                <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '16px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-accent-primary)' }}></div>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
};

export default AboutPage;
