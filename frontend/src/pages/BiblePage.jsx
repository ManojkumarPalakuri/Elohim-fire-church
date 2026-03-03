import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Loader2, AlertCircle, Globe } from 'lucide-react';

const TELUGU_MOCK = {
    'john 3:16': {
        reference: 'యోహాను 3:16',
        text: 'దేవుడు లోకమును ఎంతగా ప్రేమించెనంటే, తన అద్వితీయకుమారునిగా ఉన్నవానిని అనుగ్రహించెను; ఆయనయందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు అనుగ్రహించెను.',
        book_id: 'john', chapter: 3, verse: 16, book_name: 'యోహాను'
    },
    'psalm 23:1': {
        reference: 'కీర్తనలు 23:1',
        text: 'యెహోవా నా కాపరి; నాకు కొదువ కలుగదు.',
        book_id: 'psa', chapter: 23, verse: 1, book_name: 'కీర్తనలు'
    },
    'genesis 1:1': {
        reference: 'ఆదికాండము 1:1',
        text: 'ఆదియందు దేవుడు భూమ్యాకాశములను సృష్టించెను.',
        book_id: 'gen', chapter: 1, verse: 1, book_name: 'ఆదికాండము'
    },
    'romans 8:28': {
        reference: 'రోమీయులకు 8:28',
        text: 'దేవుని ప్రేమించువారికి, అనగా తన సంకల్పమునుబట్టి పిలువబడినవారికి, సమస్తమును మేలుకొఱకే జరుగునని మనకు తెలియును.',
        book_id: 'rom', chapter: 8, verse: 28, book_name: 'రోమీయులకు'
    },
    'philippians 4:13': {
        reference: 'ఫిలిప్పీయులకు 4:13',
        text: 'నన్ను బలపరచువాని ద్వారా సమస్తమును చేయగలను.',
        book_id: 'php', chapter: 4, verse: 13, book_name: 'ఫిలిప్పీయులకు'
    },
    'isaiah 40:31': {
        reference: 'యెషయా 40:31',
        text: 'యెహోవా కొఱకు ఆశగా ఎదురు చూచువారు నూతన బలమొందుదురు; గరుడపక్షివలె రెక్కలు చాచి పైకి ఎగిరెదరు; పరిగెత్తుచు అలయరు; నడిచియు మూర్ఛపోరు.',
        book_id: 'isa', chapter: 40, verse: 31, book_name: 'యెషయా'
    },
};

const SUGGESTED = [
    { label: 'John 3:16', ref: 'John 3:16' },
    { label: 'Psalm 23:1', ref: 'Psalm 23:1' },
    { label: 'Romans 8:28', ref: 'Romans 8:28' },
    { label: 'Philippians 4:13', ref: 'Philippians 4:13' },
    { label: 'Isaiah 40:31', ref: 'Isaiah 40:31' },
];

const BiblePage = () => {
    const [language, setLanguage] = useState('en');
    const [query, setQuery] = useState('');
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [langAnimating, setLangAnimating] = useState(false);
    const cardRef = useRef(null);

    const fetchVerse = async (ref) => {
        const searchRef = ref || query;
        if (!searchRef.trim()) return;
        setLoading(true);
        setError('');
        setVerse(null);

        try {
            if (language === 'te') {
                const key = searchRef.toLowerCase().trim();
                const mock = TELUGU_MOCK[key];
                if (mock) {
                    await new Promise(r => setTimeout(r, 600));
                    setVerse(mock);
                } else {
                    throw new Error('not_found');
                }
            } else {
                const res = await axios.get(`https://bible-api.com/${encodeURIComponent(searchRef)}`);
                if (res.data && res.data.text) {
                    setVerse({
                        reference: res.data.reference,
                        text: res.data.text.trim(),
                        book_name: res.data.verses?.[0]?.book_name || '',
                        chapter: res.data.verses?.[0]?.chapter || '',
                        verse: res.data.verses?.[0]?.verse || '',
                    });
                } else {
                    throw new Error('not_found');
                }
            }
            setTimeout(() => cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        } catch {
            setError(language === 'te'
                ? 'వచనం కనుగొనబడలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి. (e.g., John 3:16)'
                : 'Verse not found. Please check the reference and try again. (e.g., John 3:16)');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setLangAnimating(true);
        setTimeout(() => {
            setLanguage(l => l === 'en' ? 'te' : 'en');
            setVerse(null);
            setError('');
            setLangAnimating(false);
        }, 300);
    };

    const handleSuggestion = (ref) => {
        setQuery(ref);
        fetchVerse(ref);
    };

    return (
        <>
            <Helmet>
                <title>Holy Bible | Elohim Fire Ministries</title>
                <meta name="description" content="Search and read Bible verses in English and Telugu. Experience the living Word of God." />
            </Helmet>

            <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0d0d14 40%, #0f0a00 100%)' }}>

                {/* Ambient glow blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
                        style={{ background: 'radial-gradient(circle, #D4AF37, transparent 70%)' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.07]"
                        style={{ background: 'radial-gradient(circle, #FF6A00, transparent 70%)' }} />
                </div>

                <div className="relative px-4 pt-24 pb-20" style={{ zIndex: 1 }}>

                    {/* ─── HERO ─── */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
                            style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.06)' }}>
                            <BookOpen size={14} color="#D4AF37" />
                            <span className="text-xs tracking-widest uppercase" style={{ color: '#D4AF37', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                                The Living Word
                            </span>
                        </div>

                        <h1 className="mb-4" style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                            fontWeight: 900,
                            letterSpacing: '-2px',
                            lineHeight: 0.9,
                            background: 'linear-gradient(135deg, #fff 0%, #D4AF37 50%, #fff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Holy Bible
                        </h1>
                        <p className="text-lg tracking-wider" style={{
                            color: 'rgba(255,255,255,0.45)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem'
                        }}>
                            Read the Word of God
                        </p>
                    </div>

                    {/* ─── LANGUAGE TOGGLE ─── */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <span className="text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                            style={{ color: language === 'en' ? '#D4AF37' : 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                            English
                        </span>

                        <button
                            onClick={handleToggle}
                            className="relative flex items-center cursor-pointer rounded-full transition-all duration-300"
                            style={{
                                width: 60, height: 30,
                                background: language === 'te'
                                    ? 'linear-gradient(135deg, #D4AF37, #FF6A00)'
                                    : 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                padding: 3,
                            }}
                            aria-label="Toggle language"
                        >
                            <div className="absolute flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 shadow-lg"
                                style={{
                                    background: '#fff',
                                    transform: language === 'te' ? 'translateX(30px)' : 'translateX(0)',
                                }}>
                                <Globe size={12} color="#D4AF37" />
                            </div>
                        </button>

                        <span className="text-sm font-semibold tracking-wider uppercase transition-all duration-300"
                            style={{ color: language === 'te' ? '#D4AF37' : 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                            తెలుగు
                        </span>
                    </div>

                    {/* ─── SEARCH BOX ─── */}
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="relative flex items-center rounded-2xl overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                            }}>
                            <Search size={18} color="rgba(212,175,55,0.6)" className="ml-5 flex-shrink-0" />
                            <input
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && fetchVerse()}
                                placeholder={language === 'te' ? 'ఉదా: John 3:16' : 'e.g. John 3:16, Psalm 23:1'}
                                className="flex-1 bg-transparent outline-none px-4 py-5 text-base placeholder-white/20"
                                style={{ color: '#fff', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                            />
                            <button
                                onClick={() => fetchVerse()}
                                disabled={loading}
                                className="m-2 px-7 py-3 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                style={{
                                    background: loading ? 'rgba(212,175,55,0.3)' : 'linear-gradient(135deg, #D4AF37 0%, #FF6A00 100%)',
                                    color: '#000',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 700,
                                    boxShadow: loading ? 'none' : '0 4px 20px rgba(212,175,55,0.3)',
                                }}
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>

                    {/* ─── SUGGESTED VERSES ─── */}
                    <div className="flex flex-wrap justify-center gap-2 mb-16">
                        {SUGGESTED.map(s => (
                            <button key={s.ref} onClick={() => handleSuggestion(s.ref)}
                                className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{
                                    background: 'rgba(212,175,55,0.06)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    color: 'rgba(212,175,55,0.8)',
                                    fontFamily: 'var(--font-body)',
                                }}>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* ─── ERROR ─── */}
                    {error && (
                        <div className="max-w-2xl mx-auto mb-8 flex items-start gap-3 rounded-2xl p-5"
                            style={{
                                background: 'rgba(255,80,80,0.06)',
                                border: '1px solid rgba(255,80,80,0.2)',
                                animation: 'fadeIn 0.4s ease forwards',
                            }}>
                            <AlertCircle size={18} color="#FF5050" className="flex-shrink-0 mt-0.5" />
                            <p className="text-sm" style={{ color: '#FF8080', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>{error}</p>
                        </div>
                    )}

                    {/* ─── LOADING STATE ─── */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full border-2 animate-spin"
                                    style={{ borderColor: 'rgba(212,175,55,0.15)', borderTopColor: '#D4AF37' }} />
                                <BookOpen size={20} color="#D4AF37" className="absolute inset-0 m-auto" />
                            </div>
                            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(212,175,55,0.5)', fontFamily: 'var(--font-body)' }}>
                                Searching the scriptures...
                            </p>
                        </div>
                    )}

                    {/* ─── VERSE CARD ─── */}
                    {verse && !loading && (
                        <div ref={cardRef} className="max-w-3xl mx-auto"
                            style={{ animation: 'fadeIn 0.6s cubic-bezier(0.4,0,0.2,1) forwards' }}>
                            <div className="relative rounded-3xl p-10 md:p-14"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,106,0,0.04) 100%)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    backdropFilter: 'blur(30px)',
                                    boxShadow: '0 0 60px rgba(212,175,55,0.08), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                                }}>

                                {/* Decorative corner lines */}
                                <div className="absolute top-6 left-6 w-8 h-8" style={{
                                    borderTop: '2px solid rgba(212,175,55,0.4)',
                                    borderLeft: '2px solid rgba(212,175,55,0.4)',
                                    borderRadius: '2px 0 0 0'
                                }} />
                                <div className="absolute top-6 right-6 w-8 h-8" style={{
                                    borderTop: '2px solid rgba(212,175,55,0.4)',
                                    borderRight: '2px solid rgba(212,175,55,0.4)',
                                    borderRadius: '0 2px 0 0'
                                }} />
                                <div className="absolute bottom-6 left-6 w-8 h-8" style={{
                                    borderBottom: '2px solid rgba(212,175,55,0.4)',
                                    borderLeft: '2px solid rgba(212,175,55,0.4)',
                                    borderRadius: '0 0 0 2px'
                                }} />
                                <div className="absolute bottom-6 right-6 w-8 h-8" style={{
                                    borderBottom: '2px solid rgba(212,175,55,0.4)',
                                    borderRight: '2px solid rgba(212,175,55,0.4)',
                                    borderRadius: '0 0 2px 0'
                                }} />

                                {/* Reference badge */}
                                <div className="flex justify-center mb-8">
                                    <span className="px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,106,0,0.1))',
                                            border: '1px solid rgba(212,175,55,0.3)',
                                            color: '#D4AF37',
                                            fontFamily: 'var(--font-body)',
                                        }}>
                                        {verse.reference}
                                    </span>
                                </div>

                                {/* Quote mark */}
                                <div className="text-center mb-6"
                                    style={{ fontSize: '5rem', lineHeight: 0.8, color: 'rgba(212,175,55,0.15)', fontFamily: 'Georgia, serif' }}>
                                    "
                                </div>

                                {/* Verse text */}
                                <p className={`text-center leading-relaxed mb-8 ${langAnimating ? 'opacity-0' : 'opacity-100'}`}
                                    style={{
                                        fontFamily: language === 'te' ? '"Noto Serif Telugu", "Kalvika", serif' : 'var(--font-logo)',
                                        fontSize: language === 'te' ? 'clamp(1.1rem, 3vw, 1.5rem)' : 'clamp(1.2rem, 3vw, 1.75rem)',
                                        color: 'rgba(255,255,255,0.92)',
                                        lineHeight: 1.8,
                                        fontWeight: language === 'te' ? 400 : 400,
                                        fontStyle: language === 'te' ? 'normal' : 'italic',
                                        transition: 'opacity 0.3s ease',
                                    }}>
                                    {verse.text}
                                </p>

                                {/* Divider */}
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3))' }} />
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.3))' }} />
                                </div>

                                {/* Book / chapter / verse meta */}
                                <div className="flex justify-center items-center gap-6 flex-wrap">
                                    {verse.book_name && (
                                        <div className="text-center">
                                            <p className="text-xs tracking-widest uppercase mb-1"
                                                style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>Book</p>
                                            <p className="text-sm font-semibold" style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}>
                                                {verse.book_name}
                                            </p>
                                        </div>
                                    )}
                                    {verse.chapter && (
                                        <>
                                            <div className="w-px h-8" style={{ background: 'rgba(212,175,55,0.2)' }} />
                                            <div className="text-center">
                                                <p className="text-xs tracking-widest uppercase mb-1"
                                                    style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>Chapter</p>
                                                <p className="text-sm font-semibold" style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}>
                                                    {verse.chapter}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    {verse.verse && (
                                        <>
                                            <div className="w-px h-8" style={{ background: 'rgba(212,175,55,0.2)' }} />
                                            <div className="text-center">
                                                <p className="text-xs tracking-widest uppercase mb-1"
                                                    style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>Verse</p>
                                                <p className="text-sm font-semibold" style={{ color: '#D4AF37', fontFamily: 'var(--font-body)' }}>
                                                    {verse.verse}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Share nudge */}
                            <p className="text-center mt-6 text-xs tracking-widest uppercase"
                                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>
                                "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
                            </p>
                        </div>
                    )}

                    {/* ─── EMPTY STATE ─── */}
                    {!verse && !loading && !error && (
                        <div className="text-center py-10">
                            <BookOpen size={48} color="rgba(212,175,55,0.15)" className="mx-auto mb-4" />
                            <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)' }}>
                                Enter a verse reference above to begin
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BiblePage;
