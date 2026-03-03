import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const TELUGU_MOCK = {
    'john 3:16': { reference: 'యోహాను 3:16', book_name: 'యోహాను', chapter: 3, verses: [{ verse: 16, text: 'దేవుడు లోకమును ఎంతగా ప్రేమించెనంటే, తన అద్వితీయకుమారునిగా ఉన్నవానిని అనుగ్రహించెను; ఆయనయందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు అనుగ్రహించెను.' }] },
    'psalm 23:1': { reference: 'కీర్తనలు 23:1', book_name: 'కీర్తనలు', chapter: 23, verses: [{ verse: 1, text: 'యెహోవా నా కాపరి; నాకు కొదువ కలుగదు.' }] },
    'genesis 1:1': { reference: 'ఆదికాండము 1:1', book_name: 'ఆదికాండము', chapter: 1, verses: [{ verse: 1, text: 'ఆదియందు దేవుడు భూమ్యాకాశములను సృష్టించెను.' }] },
    'romans 8:28': { reference: 'రోమీయులకు 8:28', book_name: 'రోమీయులకు', chapter: 8, verses: [{ verse: 28, text: 'దేవుని ప్రేమించువారికి, అనగా తన సంకల్పమునుబట్టి పిలువబడినవారికి, సమస్తమును మేలుకొఱకే జరుగునని మనకు తెలియును.' }] },
    'philippians 4:13': { reference: 'ఫిలిప్పీయులకు 4:13', book_name: 'ఫిలిప్పీయులకు', chapter: 4, verses: [{ verse: 13, text: 'నన్ను బలపరచువాని ద్వారా సమస్తమును చేయగలను.' }] },
    'isaiah 40:31': { reference: 'యెషయా 40:31', book_name: 'యెషయా', chapter: 40, verses: [{ verse: 31, text: 'యెహోవా కొఱకు ఆశగా ఎదురు చూచువారు నూతన బలమొందుదురు; గరుడపక్షివలె రెక్కలు చాచి పైకి ఎగిరెదరు; పరిగెత్తుచు అలయరు; నడిచియు మూర్ఛపోరు.' }] },
    'proverbs 3:5': { reference: 'సామెతలు 3:5', book_name: 'సామెతలు', chapter: 3, verses: [{ verse: 5, text: 'నీ స్వబుద్ధిని ఆధారము చేసికొనక, నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మకముంచుము.' }] },
};

const SUGGESTED = [
    { label: 'John 3:16' }, { label: 'Psalm 23:1' }, { label: 'Romans 8:28' },
    { label: 'Philippians 4:13' }, { label: 'Isaiah 40:31' }, { label: 'Proverbs 3:5' },
];

const LoadingCross = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '48px 0' }}>
        <div style={{
            width: 32, height: 32, border: '2px solid #c8b89a', borderTopColor: '#6b4f2d',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif', color: '#8b7355', fontSize: '0.9rem', letterSpacing: '2px' }}>
            Searching…
        </p>
    </div>
);

export default function BiblePage() {
    const [language, setLanguage] = useState('en');
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fadeIn, setFadeIn] = useState(false);
    const [langFade, setLangFade] = useState(false);
    const bookRef = useRef(null);

    const fetchVerse = async (ref) => {
        const searchRef = (ref || query).trim();
        if (!searchRef) return;
        setLoading(true); setError(''); setData(null); setFadeIn(false);
        try {
            let result;
            if (language === 'te') {
                const key = searchRef.toLowerCase();
                const mock = TELUGU_MOCK[key];
                if (!mock) throw new Error('not_found');
                await new Promise(r => setTimeout(r, 500));
                result = mock;
            } else {
                const res = await axios.get(`https://bible-api.com/${encodeURIComponent(searchRef)}`);
                const d = res.data;
                result = {
                    reference: d.reference,
                    book_name: d.verses?.[0]?.book_name || d.reference,
                    chapter: d.verses?.[0]?.chapter || '',
                    verses: d.verses?.length > 0
                        ? d.verses.map(v => ({ verse: v.verse, text: v.text.replace(/\n/g, ' ').trim() }))
                        : [{ verse: d.verses?.[0]?.verse || 1, text: d.text?.replace(/\n/g, ' ').trim() }]
                };
            }
            setData(result);
            setFadeIn(true);
            setTimeout(() => bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        } catch {
            setError(language === 'te'
                ? 'వచనం కనుగొనబడలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.'
                : 'Verse not found. Try a reference like "John 3:16" or "Psalm 23".');
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLangFade(true);
        setTimeout(() => {
            setLanguage(l => l === 'en' ? 'te' : 'en');
            setData(null); setError('');
            setLangFade(false);
        }, 250);
    };

    const isMultiVerse = data && data.verses && data.verses.length > 1;

    return (
        <>
            <Helmet>
                <title>Holy Bible | Elohim Fire Ministries</title>
                <meta name="description" content="Read the Word of God in English and Telugu." />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
            </Helmet>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes verseIn {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .verse-animate { animation: verseIn 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
                .lang-fade { opacity: 0; transition: opacity 0.25s ease; }
                .lang-visible { opacity: 1; transition: opacity 0.25s ease; }
                .suggestion-chip:hover { background: #e8dbc8 !important; color: #3d2b1f !important; }
                .search-input:focus { outline: none; border-color: #a08060 !important; box-shadow: 0 0 0 3px rgba(160,128,96,0.15); }
            `}</style>

            {/* Page Background */}
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(160deg, #0d0d14 0%, #111018 60%, #0a0a10 100%)',
                paddingTop: '80px',
                paddingBottom: '80px',
                paddingLeft: '16px',
                paddingRight: '16px',
            }}>

                {/* Search + Controls */}
                <div style={{ maxWidth: 680, margin: '0 auto 40px auto', textAlign: 'center' }}>
                    <p style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '0.8rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: '#a08060',
                        marginBottom: '20px',
                    }}>Holy Bible</p>

                    {/* Search Row */}
                    <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                        <input
                            type="text"
                            className="search-input"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && fetchVerse()}
                            placeholder={language === 'te' ? 'ఉదా: John 3:16' : 'e.g. John 3:16, Psalm 23'}
                            style={{
                                flex: 1, padding: '10px 16px',
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: '1rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8, color: '#e8dbc8',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                            }}
                        />
                        <button
                            onClick={() => fetchVerse()}
                            disabled={loading}
                            style={{
                                padding: '10px 22px',
                                background: loading ? 'rgba(160,128,96,0.3)' : '#6b4f2d',
                                color: '#fdf6e3', border: 'none', borderRadius: 8,
                                fontFamily: '"Cormorant Garamond", serif',
                                fontSize: '0.95rem', fontWeight: 600,
                                letterSpacing: '1px', cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s',
                            }}
                        >
                            {loading ? '…' : 'Open'}
                        </button>
                    </div>

                    {/* Suggestion chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
                        {SUGGESTED.map(s => (
                            <button key={s.label} className="suggestion-chip"
                                onClick={() => { setQuery(s.label); fetchVerse(s.label); }}
                                style={{
                                    padding: '4px 14px', borderRadius: 20,
                                    background: 'rgba(253,246,227,0.06)',
                                    border: '1px solid rgba(253,246,227,0.12)',
                                    color: '#c8b89a', cursor: 'pointer',
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: '0.85rem', transition: 'all 0.18s',
                                }}>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* Language toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                        <span style={{
                            fontFamily: '"Cormorant Garamond", serif', fontSize: '0.875rem',
                            letterSpacing: '1.5px', color: language === 'en' ? '#e8dbc8' : '#5a4535',
                            transition: 'color 0.25s',
                        }}>English</span>

                        <div onClick={toggleLanguage} style={{
                            width: 48, height: 24, borderRadius: 12, cursor: 'pointer',
                            background: language === 'te' ? '#6b4f2d' : 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(160,128,96,0.3)',
                            position: 'relative', transition: 'background 0.3s',
                        }}>
                            <div style={{
                                width: 18, height: 18, borderRadius: '50%',
                                background: '#fdf6e3',
                                position: 'absolute', top: 3,
                                left: language === 'te' ? 27 : 3,
                                transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                            }} />
                        </div>

                        <span style={{
                            fontFamily: '"Noto Serif Telugu", serif', fontSize: '0.875rem',
                            letterSpacing: '1px', color: language === 'te' ? '#e8dbc8' : '#5a4535',
                            transition: 'color 0.25s',
                        }}>తెలుగు</span>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        maxWidth: 680, margin: '0 auto 32px auto',
                        padding: '12px 20px', borderRadius: 8,
                        background: 'rgba(180,60,60,0.08)',
                        border: '1px solid rgba(180,60,60,0.2)',
                        color: '#c08080',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '0.95rem', textAlign: 'center',
                    }}>
                        {error}
                    </div>
                )}

                {/* Open Book */}
                {(data || loading) && (
                    <div ref={bookRef} style={{ maxWidth: 900, margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'clamp(180px, 25%, 220px) 1fr',
                            borderRadius: '4px 12px 12px 4px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                            className="bible-book-grid"
                        >
                            {/* Left spine page */}
                            <div style={{
                                background: 'linear-gradient(to right, #c9b89a, #ddd0b5, #e8dcc8)',
                                padding: '48px 24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRight: '3px solid rgba(90,60,30,0.25)',
                                boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.12)',
                                minHeight: 500,
                                position: 'relative',
                            }}>
                                {/* Book spine text */}
                                <div style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)',
                                    fontFamily: '"Cormorant Garamond", serif',
                                    fontSize: '0.8rem',
                                    letterSpacing: '4px',
                                    textTransform: 'uppercase',
                                    color: '#6b4f2d',
                                    fontWeight: 600,
                                    opacity: 0.6,
                                    marginBottom: 'auto',
                                }}>Holy Bible</div>
                                {/* Decorative cross */}
                                <div style={{ textAlign: 'center', opacity: 0.35 }}>
                                    <div style={{ width: 2, height: 30, background: '#6b4f2d', margin: '0 auto' }} />
                                    <div style={{ width: 20, height: 2, background: '#6b4f2d', margin: '-16px auto 0 auto' }} />
                                </div>
                                {/* Page lines */}
                                <div style={{ marginTop: 'auto', width: '100%' }}>
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} style={{ height: 1, background: 'rgba(90,60,30,0.12)', marginBottom: 10 }} />
                                    ))}
                                </div>
                            </div>

                            {/* Right reading page */}
                            <div style={{
                                background: 'linear-gradient(to bottom right, #fdf8ef, #fdf4e3, #fdf0d8)',
                                padding: 'clamp(32px, 6vw, 64px)',
                                boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.06)',
                                minHeight: 500,
                                position: 'relative',
                            }}>
                                {/* Page grain overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0, opacity: 0.025,
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                                    backgroundSize: '150px',
                                    pointerEvents: 'none', borderRadius: '0 12px 12px 0',
                                }} />

                                {loading && <LoadingCross />}

                                {data && !loading && (
                                    <div className={langFade ? 'lang-fade' : 'lang-visible'}>
                                        {/* Chapter heading */}
                                        <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid rgba(90,60,30,0.18)' }}>
                                            <p style={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: '0.7rem',
                                                letterSpacing: '4px',
                                                textTransform: 'uppercase',
                                                color: '#8b6840',
                                                marginBottom: 6,
                                                fontWeight: 600,
                                            }}>
                                                {data.book_name}
                                            </p>
                                            <h2 style={{
                                                fontFamily: '"Cormorant Garamond", serif',
                                                fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
                                                fontWeight: 700,
                                                color: '#2a1a0a',
                                                lineHeight: 1.1,
                                                letterSpacing: '-0.5px',
                                                margin: 0,
                                            }}>
                                                {language === 'te' ? data.book_name : data.book_name.toUpperCase()} {data.chapter}
                                            </h2>
                                        </div>

                                        {/* Verses */}
                                        <div className={fadeIn ? 'verse-animate' : ''}>
                                            <p style={{
                                                fontFamily: language === 'te'
                                                    ? '"Noto Serif Telugu", "Mandali", serif'
                                                    : '"Cormorant Garamond", serif',
                                                fontSize: language === 'te'
                                                    ? 'clamp(1rem, 3vw, 1.2rem)'
                                                    : 'clamp(1.1rem, 3vw, 1.35rem)',
                                                lineHeight: 1.9,
                                                color: '#2a1a0a',
                                                fontWeight: language === 'te' ? 400 : 400,
                                                margin: 0,
                                                textAlign: 'left',
                                            }}>
                                                {data.verses.map((v, i) => (
                                                    <span key={i}>
                                                        {isMultiVerse && (
                                                            <sup style={{
                                                                fontFamily: '"Cormorant Garamond", serif',
                                                                fontSize: '0.65em',
                                                                fontWeight: 700,
                                                                color: '#8b6840',
                                                                marginRight: '3px',
                                                                lineHeight: 0,
                                                                position: 'relative',
                                                                top: '-0.4em',
                                                            }}>{v.verse}</sup>
                                                        )}
                                                        {!isMultiVerse && (
                                                            <sup style={{
                                                                fontFamily: '"Cormorant Garamond", serif',
                                                                fontSize: '0.65em',
                                                                fontWeight: 700,
                                                                color: '#8b6840',
                                                                marginRight: '3px',
                                                                lineHeight: 0,
                                                                position: 'relative',
                                                                top: '-0.4em',
                                                            }}>{v.verse}</sup>
                                                        )}
                                                        {v.text}{' '}
                                                    </span>
                                                ))}
                                            </p>

                                            {/* Reference footer */}
                                            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.15)' }} />
                                                <span style={{
                                                    fontFamily: '"Cormorant Garamond", serif',
                                                    fontSize: '0.85rem',
                                                    color: '#8b6840',
                                                    fontStyle: 'italic',
                                                    letterSpacing: '0.5px',
                                                }}>
                                                    {data.reference}
                                                </span>
                                                <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.15)' }} />
                                            </div>
                                        </div>

                                        {/* Page number */}
                                        <p style={{
                                            position: 'absolute', bottom: 20, right: 32,
                                            fontFamily: '"Cormorant Garamond", serif',
                                            fontSize: '0.75rem', color: 'rgba(90,60,30,0.35)',
                                            fontStyle: 'italic',
                                        }}>
                                            {data.chapter}
                                        </p>
                                    </div>
                                )}

                                {/* Empty state inside book */}
                                {!data && !loading && !error && (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, gap: 16 }}>
                                        <p style={{
                                            fontFamily: '"Cormorant Garamond", serif',
                                            fontSize: '1.1rem', fontStyle: 'italic',
                                            color: 'rgba(90,60,30,0.35)', textAlign: 'center',
                                            lineHeight: 1.8,
                                        }}>
                                            "Your word is a lamp to my feet<br />and a light to my path."
                                        </p>
                                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.8rem', color: 'rgba(90,60,30,0.25)', letterSpacing: '2px' }}>
                                            — Psalm 119:105
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Book bottom shadow */}
                        <div style={{
                            height: 12,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                            borderRadius: '0 0 16px 16px',
                            marginTop: -2,
                        }} />
                    </div>
                )}

                {/* Empty state before any search */}
                {!data && !loading && !error && (
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'clamp(180px, 25%, 220px) 1fr',
                            borderRadius: '4px 12px 12px 4px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                            opacity: 0.6,
                        }}>
                            <div style={{ background: 'linear-gradient(to right, #c9b89a, #ddd0b5)', minHeight: 360 }} />
                            <div style={{
                                background: 'linear-gradient(to bottom right, #fdf8ef, #fdf4e3)',
                                padding: '48px 48px',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                minHeight: 360,
                            }}>
                                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(90,60,30,0.45)', textAlign: 'center', lineHeight: 1.9 }}>
                                    "Your word is a lamp to my feet<br />and a light to my path."
                                </p>
                                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.8rem', color: 'rgba(90,60,30,0.3)', letterSpacing: '2px', marginTop: 16 }}>
                                    — Psalm 119:105
                                </p>
                            </div>
                        </div>
                        <div style={{ height: 12, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)', borderRadius: '0 0 16px 16px', marginTop: -2 }} />
                    </div>
                )}

                {/* Mobile responsive style */}
                <style>{`
                    @media (max-width: 600px) {
                        .bible-book-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
