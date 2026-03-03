import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { getTeluguChapter } from '../data/teluguBible.js';

const BOOKS = [
    { id: 'genesis', en: 'Genesis', te: 'ఆదికాండము', ch: 50, t: 'OT' },
    { id: 'exodus', en: 'Exodus', te: 'నిర్గమకాండము', ch: 40, t: 'OT' },
    { id: 'leviticus', en: 'Leviticus', te: 'లేవీయకాండము', ch: 27, t: 'OT' },
    { id: 'numbers', en: 'Numbers', te: 'సంఖ్యాకాండము', ch: 36, t: 'OT' },
    { id: 'deuteronomy', en: 'Deuteronomy', te: 'ద్వితీయోపదేశకాండము', ch: 34, t: 'OT' },
    { id: 'joshua', en: 'Joshua', te: 'యెహోషువ', ch: 24, t: 'OT' },
    { id: 'judges', en: 'Judges', te: 'న్యాయాధిపతులు', ch: 21, t: 'OT' },
    { id: 'ruth', en: 'Ruth', te: 'రూతు', ch: 4, t: 'OT' },
    { id: '1 samuel', en: '1 Samuel', te: '1 సమూయేలు', ch: 31, t: 'OT' },
    { id: '2 samuel', en: '2 Samuel', te: '2 సమూయేలు', ch: 24, t: 'OT' },
    { id: '1 kings', en: '1 Kings', te: '1 రాజులు', ch: 22, t: 'OT' },
    { id: '2 kings', en: '2 Kings', te: '2 రాజులు', ch: 25, t: 'OT' },
    { id: '1 chronicles', en: '1 Chronicles', te: '1 దినవృత్తాంతములు', ch: 29, t: 'OT' },
    { id: '2 chronicles', en: '2 Chronicles', te: '2 దినవృత్తాంతములు', ch: 36, t: 'OT' },
    { id: 'ezra', en: 'Ezra', te: 'ఎజ్రా', ch: 10, t: 'OT' },
    { id: 'nehemiah', en: 'Nehemiah', te: 'నెహెమ్యా', ch: 13, t: 'OT' },
    { id: 'esther', en: 'Esther', te: 'ఎస్తేరు', ch: 10, t: 'OT' },
    { id: 'job', en: 'Job', te: 'యోబు', ch: 42, t: 'OT' },
    { id: 'psalms', en: 'Psalms', te: 'కీర్తనలు', ch: 150, t: 'OT' },
    { id: 'proverbs', en: 'Proverbs', te: 'సామెతలు', ch: 31, t: 'OT' },
    { id: 'ecclesiastes', en: 'Ecclesiastes', te: 'ప్రసంగి', ch: 12, t: 'OT' },
    { id: 'song of solomon', en: 'Song of Solomon', te: 'పరమగీతము', ch: 8, t: 'OT' },
    { id: 'isaiah', en: 'Isaiah', te: 'యెషయా', ch: 66, t: 'OT' },
    { id: 'jeremiah', en: 'Jeremiah', te: 'యిర్మీయా', ch: 52, t: 'OT' },
    { id: 'lamentations', en: 'Lamentations', te: 'విలాపవాక్యములు', ch: 5, t: 'OT' },
    { id: 'ezekiel', en: 'Ezekiel', te: 'యెహెజ్కేలు', ch: 48, t: 'OT' },
    { id: 'daniel', en: 'Daniel', te: 'దానియేలు', ch: 12, t: 'OT' },
    { id: 'hosea', en: 'Hosea', te: 'హోషేయ', ch: 14, t: 'OT' },
    { id: 'joel', en: 'Joel', te: 'యోవేలు', ch: 3, t: 'OT' },
    { id: 'amos', en: 'Amos', te: 'ఆమోసు', ch: 9, t: 'OT' },
    { id: 'obadiah', en: 'Obadiah', te: 'ఓబద్యా', ch: 1, t: 'OT' },
    { id: 'jonah', en: 'Jonah', te: 'యోనా', ch: 4, t: 'OT' },
    { id: 'micah', en: 'Micah', te: 'మీకా', ch: 7, t: 'OT' },
    { id: 'nahum', en: 'Nahum', te: 'నాహూము', ch: 3, t: 'OT' },
    { id: 'habakkuk', en: 'Habakkuk', te: 'హబక్కూకు', ch: 3, t: 'OT' },
    { id: 'zephaniah', en: 'Zephaniah', te: 'జెఫన్యా', ch: 3, t: 'OT' },
    { id: 'haggai', en: 'Haggai', te: 'హగ్గయి', ch: 2, t: 'OT' },
    { id: 'zechariah', en: 'Zechariah', te: 'జెకర్యా', ch: 14, t: 'OT' },
    { id: 'malachi', en: 'Malachi', te: 'మలాకీ', ch: 4, t: 'OT' },
    { id: 'matthew', en: 'Matthew', te: 'మత్తయి', ch: 28, t: 'NT' },
    { id: 'mark', en: 'Mark', te: 'మార్కు', ch: 16, t: 'NT' },
    { id: 'luke', en: 'Luke', te: 'లూకా', ch: 24, t: 'NT' },
    { id: 'john', en: 'John', te: 'యోహాను', ch: 21, t: 'NT' },
    { id: 'acts', en: 'Acts', te: 'అపొస్తలుల కార్యములు', ch: 28, t: 'NT' },
    { id: 'romans', en: 'Romans', te: 'రోమీయులకు', ch: 16, t: 'NT' },
    { id: '1 corinthians', en: '1 Corinthians', te: '1 కొరింథీయులకు', ch: 16, t: 'NT' },
    { id: '2 corinthians', en: '2 Corinthians', te: '2 కొరింథీయులకు', ch: 13, t: 'NT' },
    { id: 'galatians', en: 'Galatians', te: 'గలతీయులకు', ch: 6, t: 'NT' },
    { id: 'ephesians', en: 'Ephesians', te: 'ఎఫెసీయులకు', ch: 6, t: 'NT' },
    { id: 'philippians', en: 'Philippians', te: 'ఫిలిప్పీయులకు', ch: 4, t: 'NT' },
    { id: 'colossians', en: 'Colossians', te: 'కొలొస్సయులకు', ch: 4, t: 'NT' },
    { id: '1 thessalonians', en: '1 Thessalonians', te: '1 థెస్సలొనీకయులకు', ch: 5, t: 'NT' },
    { id: '2 thessalonians', en: '2 Thessalonians', te: '2 థెస్సలొనీకయులకు', ch: 3, t: 'NT' },
    { id: '1 timothy', en: '1 Timothy', te: '1 తిమోతికి', ch: 6, t: 'NT' },
    { id: '2 timothy', en: '2 Timothy', te: '2 తిమోతికి', ch: 4, t: 'NT' },
    { id: 'titus', en: 'Titus', te: 'తీతుకు', ch: 3, t: 'NT' },
    { id: 'philemon', en: 'Philemon', te: 'ఫిలేమోనుకు', ch: 1, t: 'NT' },
    { id: 'hebrews', en: 'Hebrews', te: 'హెబ్రీయులకు', ch: 13, t: 'NT' },
    { id: 'james', en: 'James', te: 'యాకోబు', ch: 5, t: 'NT' },
    { id: '1 peter', en: '1 Peter', te: '1 పేతురు', ch: 5, t: 'NT' },
    { id: '2 peter', en: '2 Peter', te: '2 పేతురు', ch: 3, t: 'NT' },
    { id: '1 john', en: '1 John', te: '1 యోహాను', ch: 5, t: 'NT' },
    { id: '2 john', en: '2 John', te: '2 యోహాను', ch: 1, t: 'NT' },
    { id: '3 john', en: '3 John', te: '3 యోహాను', ch: 1, t: 'NT' },
    { id: 'jude', en: 'Jude', te: 'యూదా', ch: 1, t: 'NT' },
    { id: 'revelation', en: 'Revelation', te: 'ప్రకటన గ్రంథము', ch: 22, t: 'NT' },
];



export default function BiblePage() {
    const [testament, setTestament] = useState('NT');
    const [lang, setLang] = useState('en');
    const [book, setBook] = useState(BOOKS.find(b => b.id === 'john'));
    const [chapter, setChapter] = useState(3);
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fadeIn, setFadeIn] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const panelRef = useRef(null);
    const verseRefs = useRef({});

    const loadChapter = useCallback(async (b, ch, language, highlightIdx = null) => {
        setLoading(true); setError(''); setFadeIn(false); setSelectedIdx(null);
        try {
            let result;
            if (language === 'te') {
                const fileMap = { 'Song of Solomon': 'Song of Songs' };
                const fileName = encodeURIComponent((fileMap[b.en] || b.en) + '.json');
                const teRes = await axios.get(
                    `https://raw.githubusercontent.com/aruljohn/Bible-telugu/main/${fileName}`
                );
                const chapterObj = (teRes.data.chapters || []).find(c => parseInt(c.chapter) === ch);
                if (chapterObj && chapterObj.verses?.length) {
                    result = chapterObj.verses.map(v => ({
                        v: parseInt(v.verse),
                        t: v.text.trim(),
                    }));
                } else {
                    result = getTeluguChapter(b.id, ch);
                }
                if (result.length === 0) {
                    setError('ఈ అధ్యాయానికి తెలుగు అందుబాటులో లేదు.');
                    setLoading(false); setFadeIn(true); return;
                }
            } else {
                const res = await axios.get(`https://bible-api.com/${encodeURIComponent(b.en + ' ' + ch)}`);
                result = (res.data.verses || []).map(v => ({
                    v: v.verse,
                    t: v.text.replace(/\n/g, ' ').trim()
                }));
            }
            setVerses(result);
            setTimeout(() => {
                setFadeIn(true);
                if (highlightIdx !== null) {
                    setSelectedIdx(highlightIdx);
                    setTimeout(() => {
                        verseRefs.current[highlightIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                } else {
                    panelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 50);
        } catch {
            setError('Could not load this chapter. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadChapter(book, chapter, lang); }, []);

    const selectBook = (b) => {
        setBook(b); setChapter(1);
        setTestament(b.t);
        loadChapter(b, 1, lang);
        setSidebarOpen(false);
    };

    const selectChapter = (ch) => {
        setChapter(ch);
        loadChapter(book, ch, lang);
    };

    const toggleLang = () => {
        const next = lang === 'en' ? 'te' : 'en';
        setLang(next);
        loadChapter(book, chapter, next);
    };

    const clickVerse = (idx) => {
        setSelectedIdx(idx === selectedIdx ? null : idx);
        if (idx !== selectedIdx) {
            setTimeout(() => verseRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        }
    };

    const goNext = () => {
        if (selectedIdx !== null && selectedIdx < verses.length - 1) {
            const next = selectedIdx + 1;
            setSelectedIdx(next);
            setTimeout(() => verseRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        } else if (chapter < book.ch) {
            const nextCh = chapter + 1;
            setChapter(nextCh);
            loadChapter(book, nextCh, lang, 0);
        }
    };

    const goPrev = () => {
        if (selectedIdx !== null && selectedIdx > 0) {
            const prev = selectedIdx - 1;
            setSelectedIdx(prev);
            setTimeout(() => verseRefs.current[prev]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        } else if (chapter > 1) {
            const prevCh = chapter - 1;
            setChapter(prevCh);
            loadChapter(book, prevCh, lang, null);
        }
    };

    const bookName = lang === 'te' ? book.te : book.en;
    const filteredBooks = BOOKS.filter(b => b.t === testament);

    return (
        <>
            <Helmet>
                <title>{`${bookName} ${chapter} | Holy Bible`}</title>
            </Helmet>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
                .bible-fade { transition: opacity 0.3s ease; }
                .bible-fade-in { opacity: 1; }
                .bible-fade-out { opacity: 0; }
                ::-webkit-scrollbar { width: 4px; height: 4px; }
                ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                .verse-row { transition: background 0.25s ease, border-left 0.25s ease; border-left: 3px solid transparent; }
                .verse-row:hover { background: rgba(251,243,219,0.8) !important; }
                .verse-row.active { background: #fef9c3 !important; border-left: 3px solid #b45309 !important; border-radius: 0 6px 6px 0; }
                .chapter-btn:hover { background: #f0e4d0 !important; }
                .book-item:hover { background: #fdf4e3 !important; }
                .verse-nav-btn:hover { background: #f0e4d0 !important; }
                @media (max-width: 768px) {
                    .bible-sidebar { position: fixed !important; top: 60px; left: 0; bottom: 0; z-index: 200; transform: translateX(-100%); transition: transform 0.3s ease; box-shadow: 4px 0 20px rgba(0,0,0,0.12); }
                    .bible-sidebar.open { transform: translateX(0) !important; }
                    .bible-chapters { width: 100px !important; }
                    .sidebar-overlay { display: block !important; }
                }
                @media (max-width: 640px) {
                    .bible-verses-col { display: none !important; }
                }
                @media (max-width: 520px) {
                    .bible-chapters { display: none !important; }
                }
            `}</style>

            {/* Sidebar overlay (mobile) */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)}
                    style={{ display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 150 }}
                    className="sidebar-overlay"
                />
            )}

            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f5f0e8' }}>

                {/* ── TOP HEADER BAR ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 50, borderBottom: '1px solid #e0d8cc', background: '#ffffff', flexShrink: 0, zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button onClick={() => setSidebarOpen(o => !o)}
                            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 6 }}
                            className="mobile-menu-btn">
                            ☰
                        </button>
                        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 600, color: '#2a1a0a', letterSpacing: '1px' }}>
                            ✝ Holy Bible
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#a08060', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                            {bookName} {chapter}
                        </span>
                    </div>

                    {/* EN / TE toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: lang === 'en' ? '#4a3728' : '#bbb', transition: 'color 0.2s' }}>EN</span>
                        <button onClick={toggleLang} style={{ width: 42, height: 24, borderRadius: 12, background: lang === 'te' ? '#6b4f2d' : '#ddd0b5', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                            <span style={{ position: 'absolute', top: 3, left: lang === 'te' ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.25)', transition: 'left 0.3s', display: 'block' }} />
                        </button>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: lang === 'te' ? '#4a3728' : '#bbb', transition: 'color 0.2s', fontFamily: 'serif' }}>తె</span>
                    </div>
                </div>

                {/* ── THREE-COLUMN BODY ── */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* LEFT: Book Sidebar */}
                    <div className={`bible-sidebar${sidebarOpen ? ' open' : ''}`} style={{ width: 220, flexShrink: 0, borderRight: '1px solid #e0d8cc', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {/* OT / NT */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #e0d8cc', flexShrink: 0 }}>
                            {['OT', 'NT'].map(tab => (
                                <button key={tab} onClick={() => setTestament(tab)} style={{
                                    flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer',
                                    fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2px',
                                    background: testament === tab ? '#fdf4e3' : '#fff',
                                    color: testament === tab ? '#6b4f2d' : '#aaa',
                                    borderBottom: `2px solid ${testament === tab ? '#6b4f2d' : 'transparent'}`,
                                    transition: 'all 0.2s',
                                }}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Book list */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {filteredBooks.map(b => {
                                const active = b.id === book.id;
                                return (
                                    <div key={b.id} className="book-item" onClick={() => selectBook(b)} style={{
                                        padding: '9px 14px', cursor: 'pointer', borderBottom: '1px solid #f0e8d8',
                                        background: active ? '#fdf4e3' : 'transparent',
                                        borderLeft: `3px solid ${active ? '#6b4f2d' : 'transparent'}`,
                                        transition: 'all 0.15s',
                                    }}>
                                        <p style={{ margin: 0, fontSize: '0.79rem', fontWeight: active ? 700 : 500, color: active ? '#4a3728' : '#555', lineHeight: 1.3 }}>{b.en}</p>
                                        <p style={{ margin: 0, fontSize: '0.68rem', color: active ? '#8b6840' : '#bbb', fontFamily: 'serif', lineHeight: 1.3 }}>{b.te}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CENTER: Chapters */}
                    <div className="bible-chapters" style={{ width: 68, flexShrink: 0, borderRight: '1px solid #e0d8cc', background: '#faf7f2', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '10px 12px', borderBottom: '1px solid #e0d8cc', flexShrink: 0 }}>
                            <p style={{ margin: 0, fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#a08060', fontWeight: 700, textAlign: 'center' }}>Ch</p>
                            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', fontWeight: 700, color: '#2a1a0a', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1.2, wordBreak: 'break-word' }}>
                                {lang === 'te' ? book.te : book.en}
                            </p>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 4px' }}>
                            {Array.from({ length: book.ch }, (_, i) => i + 1).map(ch => (
                                <button key={ch} className="verse-nav-btn" onClick={() => selectChapter(ch)} style={{
                                    display: 'block', width: '100%', padding: '5px 2px',
                                    border: 'none', borderRadius: 5, cursor: 'pointer',
                                    fontSize: '0.72rem', fontWeight: ch === chapter ? 700 : 400,
                                    background: ch === chapter ? '#6b4f2d' : 'transparent',
                                    color: ch === chapter ? '#fff' : '#5a432a',
                                    transition: 'all 0.15s', marginBottom: 1,
                                }}>
                                    {ch}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* VERSE NAVIGATOR column */}
                    <div className="bible-verses-col" style={{ width: 68, flexShrink: 0, borderRight: '1px solid #e0d8cc', background: '#faf7f2', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={{ padding: '10px 8px', borderBottom: '1px solid #e0d8cc', flexShrink: 0 }}>
                            <p style={{ margin: 0, fontSize: '0.58rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#a08060', fontWeight: 700, textAlign: 'center' }}>Verse</p>
                            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', fontWeight: 700, color: '#2a1a0a', textAlign: 'center' }}>{chapter}</p>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 4px' }}>
                            {verses.map((v, idx) => {
                                const isActive = selectedIdx === idx;
                                return (
                                    <button
                                        key={v.v}
                                        className="verse-nav-btn"
                                        onClick={() => {
                                            setSelectedIdx(idx);
                                            const el = document.getElementById(`verse-${v.v}`);
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        style={{
                                            display: 'block', width: '100%', padding: '5px 2px',
                                            border: 'none', borderRadius: 5, cursor: 'pointer',
                                            fontSize: '0.72rem', fontWeight: isActive ? 700 : 400,
                                            background: isActive ? '#6b4f2d' : 'transparent',
                                            color: isActive ? '#fff' : '#5a432a',
                                            transition: 'all 0.15s', marginBottom: 1,
                                        }}
                                    >
                                        {v.v}
                                    </button>
                                );
                            })}
                            {verses.length === 0 && !loading && (
                                <p style={{ fontSize: '0.6rem', color: '#ccc', textAlign: 'center', padding: '8px 0' }}>—</p>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Reading Panel */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8f1e4' }}>
                        <div ref={panelRef} style={{ flex: 1, overflowY: 'auto', padding: 'clamp(20px, 4vw, 48px)' }}>
                            {/* Chapter heading */}
                            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(90,60,30,0.14)', maxWidth: 720 }}>
                                <p style={{ margin: '0 0 3px', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#a08060', fontWeight: 700 }}>
                                    {book.t === 'OT' ? 'Old Testament' : 'New Testament'}
                                </p>
                                <h2 style={{ margin: 0, fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 700, color: '#1e1208', lineHeight: 1.1 }}>
                                    {lang === 'te' ? book.te : book.en.toUpperCase()} {chapter}
                                </h2>
                                {selectedIdx !== null && (
                                    <p style={{ margin: '6px 0 0', fontSize: '0.7rem', color: '#b45309', letterSpacing: '1px', fontStyle: 'italic' }}>
                                        Verse {verses[selectedIdx]?.v} selected — click again to deselect
                                    </p>
                                )}
                            </div>

                            {/* Loading */}
                            {loading && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '40px 0', maxWidth: 720 }}>
                                    <div style={{ width: 22, height: 22, border: '2px solid #e0d0b8', borderTopColor: '#6b4f2d', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
                                    <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#a08060', fontSize: '1.05rem', fontStyle: 'italic' }}>Loading chapter…</span>
                                </div>
                            )}

                            {/* Error */}
                            {error && (
                                <p style={{ maxWidth: 720, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#b91c1c', fontSize: '0.9rem', fontFamily: '"Cormorant Garamond", serif' }}>
                                    {error}
                                </p>
                            )}

                            {/* Verses */}
                            {!loading && verses.length > 0 && (
                                <div className={`bible-fade ${fadeIn ? 'bible-fade-in' : 'bible-fade-out'}`} style={{ maxWidth: 720 }}>
                                    {verses.map((v, idx) => (
                                        <div
                                            key={idx}
                                            id={`verse-${v.v}`}
                                            data-vidx={idx}
                                            ref={el => verseRefs.current[idx] = el}
                                            className={`verse-row${selectedIdx === idx ? ' active' : ''}`}
                                            onClick={() => clickVerse(idx)}
                                            style={{
                                                padding: '6px 10px 6px 12px',
                                                marginBottom: 2,
                                                cursor: 'pointer',
                                                borderRadius: '0 6px 6px 0',
                                            }}
                                        >
                                            <span style={{
                                                fontFamily: lang === 'te' ? '"Noto Serif Telugu", serif' : '"Cormorant Garamond", serif',
                                                fontSize: lang === 'te' ? 'clamp(0.95rem,2vw,1.1rem)' : 'clamp(1.05rem,2vw,1.2rem)',
                                                lineHeight: 1.9, color: '#1e1208',
                                            }}>
                                                <sup style={{ fontSize: '0.58em', color: '#8b6840', fontWeight: 700, verticalAlign: 'super', marginRight: 3, lineHeight: 0 }}>
                                                    {v.v}
                                                </sup>
                                                {v.t}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Chapter footer */}
                                    <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.12)' }} />
                                        <span style={{ fontSize: '0.75rem', color: '#a08060', fontStyle: 'italic', fontFamily: '"Cormorant Garamond", serif' }}>
                                            {lang === 'te' ? book.te : book.en} {chapter}
                                        </span>
                                        <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.12)' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ── BOTTOM NAV ── */}
                        <div style={{ flexShrink: 0, borderTop: '1px solid #e0d8cc', background: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <button onClick={goPrev}
                                disabled={chapter === 1 && (selectedIdx === null || selectedIdx === 0)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '7px 16px', borderRadius: 8, border: '1px solid #e0d8cc',
                                    background: 'transparent', cursor: 'pointer', fontSize: '0.8rem',
                                    fontWeight: 600, color: '#5a432a', fontFamily: 'Inter, sans-serif',
                                    opacity: chapter === 1 && (selectedIdx === null || selectedIdx === 0) ? 0.3 : 1,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fdf4e3'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                ← Prev
                            </button>

                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '0.7rem', color: '#a08060', letterSpacing: '1px', fontWeight: 600 }}>
                                    {selectedIdx !== null
                                        ? `Verse ${verses[selectedIdx]?.v} of ${verses.length}`
                                        : `${verses.length} verses`}
                                </p>
                            </div>

                            <button onClick={goNext}
                                disabled={chapter === book.ch && selectedIdx === verses.length - 1}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '7px 16px', borderRadius: 8, border: '1px solid #e0d8cc',
                                    background: 'transparent', cursor: 'pointer', fontSize: '0.8rem',
                                    fontWeight: 600, color: '#5a432a', fontFamily: 'Inter, sans-serif',
                                    opacity: chapter === book.ch && selectedIdx === verses.length - 1 ? 0.3 : 1,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fdf4e3'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
