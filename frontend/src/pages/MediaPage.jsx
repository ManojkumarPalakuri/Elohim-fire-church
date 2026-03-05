import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Headphones, Image as ImageIcon, Facebook, Instagram, Youtube, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const imageModules = import.meta.glob('../assets/*.{jpeg,jpg,png,JPG,JPEG}', { eager: true });
const galleryImages = Object.values(imageModules).map(mod => mod.default || mod);

// Standalone cell with true photo crossfade dissolve
const GalleryCell = ({ startIndex, onOpenLightbox }) => {
    const INTERVAL_MS = 10000; // 10 seconds per photo
    const FADE_MS = 1400;      // crossfade duration
    const nextIdxRef = useRef((startIndex + 1) % galleryImages.length);
    const [bottom, setBottom] = useState(galleryImages[startIndex]);
    const [top, setTop] = useState(null);
    const [topOpacity, setTopOpacity] = useState(0);
    const currentBottomRef = useRef(galleryImages[startIndex]);

    useEffect(() => {
        const tick = () => {
            const incoming = galleryImages[nextIdxRef.current];
            // Place the incoming image on top, fully transparent
            setTop(incoming);
            setTopOpacity(0);
            // Give browser one frame then start fade-in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTopOpacity(1);
                });
            });
            // After fade completes: promote top → bottom, clear top
            setTimeout(() => {
                currentBottomRef.current = incoming;
                setBottom(incoming);
                setTop(null);
                setTopOpacity(0);
                nextIdxRef.current = (nextIdxRef.current + 1) % galleryImages.length;
            }, FADE_MS + 50);
        };
        const id = setInterval(tick, INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="gallery-item crossfade-cell"
            onClick={() => onOpenLightbox(nextIdxRef.current === 0 ? galleryImages.length - 1 : nextIdxRef.current - 1)}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* Bottom layer: current photo */}
            <img
                src={bottom}
                alt="Gallery"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
            />
            {/* Top layer: incoming photo crossfading in */}
            {top && (
                <img
                    src={top}
                    alt="Gallery incoming"
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        zIndex: 2,
                        opacity: topOpacity,
                        transition: `opacity ${FADE_MS}ms ease-in-out`,
                    }}
                />
            )}
            <div className="gallery-overlay" style={{ zIndex: 3 }}>
                <Maximize2 color="#fff" size={32} />
            </div>
        </div>
    );
};

const MediaPage = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);
    const sliderRef = useRef(null);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    const GRID_SIZE = 9;
    const sliderImages = galleryImages.slice(GRID_SIZE);

    return (
        <>
            <Helmet>
                <title>Sermons & Media | Elohim Fire Ministries</title>
                <meta name="description" content="Watch live streams, past sermons, and view photo galleries from Elohim Fire Ministries." />
            </Helmet>



            {/* Live Stream Section */}
            <section className="section-padding container" style={{ paddingTop: 'clamp(40px, 10vw, 80px)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-accent-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        marginBottom: '12px'
                    }}>
                        <span style={{
                            width: '8px', height: '8px',
                            backgroundColor: 'var(--color-fire)',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px var(--color-fire)',
                            animation: 'pulseGlow 2s infinite'
                        }}></span>
                        Live Now
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', lineHeight: '1.1' }}>Sunday Service Broadcast</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Join our global community in worship and word.</p>
                </div>

                <div className="modern-card" style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    textAlign: 'center',
                    padding: 'clamp(2.5rem, 8vw, 4rem) 2rem',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                    borderRadius: '24px',
                    border: '1px solid var(--color-border-outline)',
                    overflow: 'hidden'
                }}>
                    {/* Atmospheric background glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%', left: '-20%',
                        width: '140%', height: '200%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.05) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        zIndex: 0
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: '1rem', fontWeight: '800' }}>Watch Prophet Joshua Live</h3>
                        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', fontSize: '1rem', marginBottom: '2rem' }}>
                            Experience powerful teachings, miraculous healings, and prophetic declarations from anywhere in the world.
                        </p>
                        <a href="https://youtube.com/@prophetjoshua6374?si=dGfgURVT4xawDOF_" target="_blank" rel="noopener noreferrer" style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            padding: '16px 40px',
                            borderRadius: '0',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(255, 0, 0, 0.3)',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9rem'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <Play size={20} fill="currentColor" /> Visit YouTube
                        </a>
                    </div>
                </div>
            </section>



            {/* Photo Gallery */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-dark)', paddingTop: 'clamp(40px, 10vw, 80px)' }}>
                <div className="container" style={{ position: 'relative' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span style={{
                            color: 'var(--color-accent-primary)',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            display: 'block',
                            marginBottom: '12px'
                        }}>Visual Journey</span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: '800' }}>Photo <span className="text-secondary" style={{ fontStyle: 'italic' }}>Gallery</span></h2>
                    </div>

                    <style>{`
                        .gallery-grid {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 1.5rem;
                            margin-bottom: 4rem;
                        }
                        .crossfade-cell {
                            aspect-ratio: 4/3;
                            border-radius: 16px;
                            overflow: hidden;
                            position: relative;
                            cursor: pointer;
                            border: 1px solid var(--color-border-outline);
                            transition: border-color 0.3s, box-shadow 0.3s;
                            background: var(--color-bg-card);
                        }
                        .crossfade-cell:hover {
                            border-color: var(--color-accent-primary);
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        }
                        .gallery-item {
                            border-radius: 16px;
                            overflow: hidden;
                            border: 1px solid var(--color-border-outline);
                            transition: all 0.4s ease;
                            position: relative;
                            cursor: pointer;
                            aspect-ratio: 4/3;
                            background-color: var(--color-bg-card);
                        }
                        .gallery-item img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        .gallery-item:hover img {
                            transform: scale(1.05);
                        }
                        .gallery-item:hover {
                            border-color: var(--color-accent-primary);
                            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        }
                        .gallery-overlay {
                            position: absolute;
                            inset: 0;
                            background: rgba(0,0,0,0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            opacity: 0;
                            transition: opacity 0.3s;
                        }
                        .gallery-item:hover .gallery-overlay {
                            opacity: 1;
                        }
                        .gallery-slider-container {
                            position: relative;
                            margin-top: 2rem;
                            overflow: hidden;
                        }
                        /* Fade masks on edges for premium look */
                        .gallery-slider-container::before,
                        .gallery-slider-container::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 2rem;
                            width: 80px;
                            z-index: 2;
                            pointer-events: none;
                        }
                        .gallery-slider-container::before {
                            left: 0;
                            background: linear-gradient(to right, var(--color-bg-dark), transparent);
                        }
                        .gallery-slider-container::after {
                            right: 0;
                            background: linear-gradient(to left, var(--color-bg-dark), transparent);
                        }
                        @keyframes marqueeScroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .marquee-track {
                            display: flex;
                            gap: 1.5rem;
                            width: max-content;
                            animation: marqueeScroll 70s linear infinite;
                            padding-bottom: 2rem;
                        }
                        .marquee-track.paused {
                            animation-play-state: paused;
                        }
                        .marquee-item {
                            flex: 0 0 320px;
                            aspect-ratio: 4/3;
                        }
                        .slider-nav-btn {
                            position: absolute;
                            top: calc(50% - 1rem);
                            transform: translateY(-50%);
                            width: 56px;
                            height: 56px;
                            border-radius: 50%;
                            background: var(--color-bg-darker);
                            border: 1px solid var(--color-border-outline);
                            color: var(--color-text-primary);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            z-index: 10;
                            transition: all 0.3s;
                            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
                        }
                        .slider-nav-btn:hover {
                            background: var(--color-accent-primary);
                            color: #fff;
                            border-color: var(--color-accent-primary);
                            transform: translateY(-50%) scale(1.05);
                        }
                        .slider-nav-btn.left { left: -28px; }
                        .slider-nav-btn.right { right: -28px; }
                        
                        /* Lightbox */
                        .lightbox {
                            position: fixed;
                            inset: 0;
                            z-index: 9999;
                            background: rgba(0,0,0,0.95);
                            backdrop-filter: blur(10px);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            animation: fadeIn 0.3s ease;
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .lightbox-content {
                            position: relative;
                            max-width: 90vw;
                            max-height: 90vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .lightbox-img {
                            max-width: 100%;
                            max-height: 85vh;
                            border-radius: 12px;
                            object-fit: contain;
                            box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                        }
                        .lightbox-nav {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            background: rgba(255,255,255,0.05);
                            border: 1px solid rgba(255,255,255,0.1);
                            color: #fff;
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.3s;
                        }
                        .lightbox-nav:hover { background: var(--color-accent-primary); border-color: var(--color-accent-primary); }
                        .lightbox-nav.prev { left: -80px; }
                        .lightbox-nav.next { right: -80px; }
                        .lightbox-close {
                            position: absolute;
                            top: 30px;
                            right: 30px;
                            background: rgba(255,255,255,0.1);
                            border: none;
                            color: #fff;
                            cursor: pointer;
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 10000;
                            transition: background 0.3s;
                        }
                        .lightbox-close:hover { background: rgba(255,0,0,0.6); }

                        /* Custom scrollbar for mobile slider */
                        @media (max-width: 768px) {
                            .gallery-grid {
                                display: flex;
                                overflow-x: auto;
                                scroll-snap-type: x mandatory;
                                flex-wrap: nowrap;
                                padding-bottom: 2rem;
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                            .gallery-grid::-webkit-scrollbar { display: none; }
                            .gallery-grid .gallery-item {
                                flex: 0 0 85vw;
                                scroll-snap-align: center;
                            }
                            .slider-nav-btn { display: none; }
                            .slider-item { flex: 0 0 85vw; scroll-snap-align: center; }
                            .lightbox-nav.prev { left: 10px; background: rgba(0,0,0,0.5); }
                            .lightbox-nav.next { right: 10px; background: rgba(0,0,0,0.5); }
                            .lightbox-close { top: 15px; right: 15px; }
                        }
                    `}</style>

                    {galleryImages.length > 0 ? (
                        <>
                            {/* 3x3 Crossfade Dissolve Grid */}
                            <div className="gallery-grid">
                                {Array.from({ length: GRID_SIZE }, (_, i) => (
                                    <GalleryCell
                                        key={i}
                                        startIndex={i % galleryImages.length}
                                        onOpenLightbox={openLightbox}
                                    />
                                ))}
                            </div>

                            {/* Infinite Marquee Slider for remaining images */}
                            {sliderImages.length > 0 && (
                                <div className="gallery-slider-container">
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>More Moments</h3>
                                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{sliderImages.length} additional images</span>
                                    </div>

                                    <div
                                        className={`marquee-track ${isMarqueePaused ? 'paused' : ''}`}
                                        onMouseEnter={() => setIsMarqueePaused(true)}
                                        onMouseLeave={() => setIsMarqueePaused(false)}
                                    >
                                        {/* Duplicated for seamless loop */}
                                        {[...sliderImages, ...sliderImages].map((src, idx) => {
                                            const realIdx = (idx % sliderImages.length) + 8;
                                            return (
                                                <div
                                                    key={`marquee-${idx}`}
                                                    className="gallery-item marquee-item"
                                                    onClick={() => {
                                                        setIsMarqueePaused(true);
                                                        openLightbox(realIdx);
                                                    }}
                                                >
                                                    <img src={src} alt={`Church moment ${realIdx + 1}`} loading="lazy" />
                                                    <div className="gallery-overlay">
                                                        <Maximize2 color="#fff" size={32} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '4rem', border: '1px dashed var(--color-border-outline)', borderRadius: '16px' }}>
                            <ImageIcon size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                            <p style={{ fontSize: '1.1rem' }}>No gallery images currently available.</p>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                {lightboxOpen && galleryImages.length > 0 && (
                    <div className="lightbox" onClick={closeLightbox}>
                        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
                            <X size={24} />
                        </button>
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <img src={galleryImages[currentImageIndex]} alt="Enlarged gallery view" className="lightbox-img" />
                            <button className="lightbox-nav prev" onClick={prevImage} aria-label="Previous image">
                                <ChevronLeft size={36} />
                            </button>
                            <button className="lightbox-nav next" onClick={nextImage} aria-label="Next image">
                                <ChevronRight size={36} />
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* Connect With Us - Social Media */}
            <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-darker)', paddingTop: 'clamp(40px, 10vw, 80px)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            color: 'var(--color-accent-primary)',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            display: 'block',
                            marginBottom: '12px'
                        }}>Stay Connected</span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: '800' }}>Follow Us <span className="text-secondary" style={{ fontStyle: 'italic' }}>Online</span></h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>
                            Stay updated with the latest messages, events, and prophetic words.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>

                        {/* Facebook Card */}
                        <a href="https://www.facebook.com/profile.php?id=100076227227459&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #1877F2 0%, #0d5cbf 100%)',
                                borderRadius: '0',
                                padding: '2rem',
                                color: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 32px rgba(24, 119, 242, 0.3)',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(24, 119, 242, 0.4)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(24, 119, 242, 0.3)'; }}
                            >
                                <Facebook size={48} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>Facebook</div>
                                    <div style={{ opacity: 1, fontSize: '0.85rem' }}>Prophet Joshua Official</div>
                                </div>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Follow Us</span>
                            </div>
                        </a>

                        {/* Instagram Card */}
                        <a href="https://instagram.com/prophet_joshua_official?igshid=NGExMmI2YTkyZg==" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
                                borderRadius: '0',
                                padding: '2rem',
                                color: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 32px rgba(225, 48, 108, 0.3)',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(225, 48, 108, 0.4)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(225, 48, 108, 0.3)'; }}
                            >
                                <Instagram size={48} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>Instagram</div>
                                    <div style={{ opacity: 1, fontSize: '0.85rem' }}>@prophet_joshua_official</div>
                                </div>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Follow Us</span>
                            </div>
                        </a>

                        {/* YouTube Card */}
                        <a href="https://youtube.com/@prophetjoshua6374?si=dGfgURVT4xawDOF_" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
                                borderRadius: '0',
                                padding: '2rem',
                                color: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 32px rgba(255, 0, 0, 0.3)',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(255, 0, 0, 0.4)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 0, 0, 0.3)'; }}
                            >
                                <Youtube size={48} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '4px' }}>YouTube</div>
                                    <div style={{ opacity: 0.8, fontSize: '0.85rem' }}>Prophet Joshua</div>
                                </div>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '8px 24px', borderRadius: '0', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Subscribe</span>
                            </div>
                        </a>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MediaPage;
