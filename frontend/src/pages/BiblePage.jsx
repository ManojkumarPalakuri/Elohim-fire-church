import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const BOOKS = [
    // OT
    { id: 'genesis', en: 'Genesis', te: 'ఆదికాండము', ch: 50, t: 'OT' },
    { id: 'exodus', en: 'Exodus', te: 'నిర్గమకాండము', ch: 40, t: 'OT' },
    { id: 'leviticus', en: 'Leviticus', te: 'లేవీయకాండము', ch: 27, t: 'OT' },
    { id: 'numbers', en: 'Numbers', te: 'సంఖ్యాకాండము', ch: 36, t: 'OT' },
    { id: 'deuteronomy', en: 'Deuteronomy', te: 'ద్వితీయోపదేశకాండము', ch: 34, t: 'OT' },
    { id: 'joshua', en: 'Joshua', te: 'యెహోషువ', ch: 24, t: 'OT' },
    { id: 'judges', en: 'Judges', te: 'న్యాయాధిపతులు', ch: 21, t: 'OT' },
    { id: 'ruth', en: 'Ruth', te: 'రూతు', ch: 4, t: 'OT' },
    { id: '1samuel', en: '1 Samuel', te: '1 సమూయేలు', ch: 31, t: 'OT' },
    { id: '2samuel', en: '2 Samuel', te: '2 సమూయేలు', ch: 24, t: 'OT' },
    { id: '1kings', en: '1 Kings', te: '1 రాజులు', ch: 22, t: 'OT' },
    { id: '2kings', en: '2 Kings', te: '2 రాజులు', ch: 25, t: 'OT' },
    { id: '1chronicles', en: '1 Chronicles', te: '1 దినవృత్తాంతములు', ch: 29, t: 'OT' },
    { id: '2chronicles', en: '2 Chronicles', te: '2 దినవృత్తాంతములు', ch: 36, t: 'OT' },
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
    // NT
    { id: 'matthew', en: 'Matthew', te: 'మత్తయి', ch: 28, t: 'NT' },
    { id: 'mark', en: 'Mark', te: 'మార్కు', ch: 16, t: 'NT' },
    { id: 'luke', en: 'Luke', te: 'లూకా', ch: 24, t: 'NT' },
    { id: 'john', en: 'John', te: 'యోహాను', ch: 21, t: 'NT' },
    { id: 'acts', en: 'Acts', te: 'అపొస్తలుల కార్యములు', ch: 28, t: 'NT' },
    { id: 'romans', en: 'Romans', te: 'రోమీయులకు', ch: 16, t: 'NT' },
    { id: '1corinthians', en: '1 Corinthians', te: '1 కొరింథీయులకు', ch: 16, t: 'NT' },
    { id: '2corinthians', en: '2 Corinthians', te: '2 కొరింథీయులకు', ch: 13, t: 'NT' },
    { id: 'galatians', en: 'Galatians', te: 'గలతీయులకు', ch: 6, t: 'NT' },
    { id: 'ephesians', en: 'Ephesians', te: 'ఎఫెసీయులకు', ch: 6, t: 'NT' },
    { id: 'philippians', en: 'Philippians', te: 'ఫిలిప్పీయులకు', ch: 4, t: 'NT' },
    { id: 'colossians', en: 'Colossians', te: 'కొలొస్సయులకు', ch: 4, t: 'NT' },
    { id: '1thessalonians', en: '1 Thessalonians', te: '1 థెస్సలొనీకయులకు', ch: 5, t: 'NT' },
    { id: '2thessalonians', en: '2 Thessalonians', te: '2 థెస్సలొనీకయులకు', ch: 3, t: 'NT' },
    { id: '1timothy', en: '1 Timothy', te: '1 తిమోతికి', ch: 6, t: 'NT' },
    { id: '2timothy', en: '2 Timothy', te: '2 తిమోతికి', ch: 4, t: 'NT' },
    { id: 'titus', en: 'Titus', te: 'తీతుకు', ch: 3, t: 'NT' },
    { id: 'philemon', en: 'Philemon', te: 'ఫిలేమోనుకు', ch: 1, t: 'NT' },
    { id: 'hebrews', en: 'Hebrews', te: 'హెబ్రీయులకు', ch: 13, t: 'NT' },
    { id: 'james', en: 'James', te: 'యాకోబు', ch: 5, t: 'NT' },
    { id: '1peter', en: '1 Peter', te: '1 పేతురు', ch: 5, t: 'NT' },
    { id: '2peter', en: '2 Peter', te: '2 పేతురు', ch: 3, t: 'NT' },
    { id: '1john', en: '1 John', te: '1 యోహాను', ch: 5, t: 'NT' },
    { id: '2john', en: '2 John', te: '2 యోహాను', ch: 1, t: 'NT' },
    { id: '3john', en: '3 John', te: '3 యోహాను', ch: 1, t: 'NT' },
    { id: 'jude', en: 'Jude', te: 'యూదా', ch: 1, t: 'NT' },
    { id: 'revelation', en: 'Revelation', te: 'ప్రకటన గ్రంథము', ch: 22, t: 'NT' },
];

const TELUGU_CHAPTERS = {
    'john-3': [
        { v: 1, t: 'అప్పుడు ఫరిసీయులలో నికొదేము అనువాడొకడుండెను; అతడు యూదుల అధికారి.' },
        { v: 2, t: 'అతడు రాత్రివేళ యేసు దగ్గరకు వచ్చి — రబ్బీ, నీవు దేవుని యొద్ద నుండి వచ్చిన బోధకుడవని మేమెరుగుదుము.' },
        { v: 3, t: 'యేసు అతనికి ఇట్లు చెప్పెను — నేను నిన్ను నిజముగా నిజముగా చెప్పుచున్నాను, తిరిగి జన్మింపకపోతే ఏ మనుష్యుడైనను దేవుని రాజ్యమును చూడలేడు.' },
        { v: 4, t: 'నికొదేము ఆయనతో — ముసలివాడైన మనుష్యుడు ఏ విధముగా జన్మింపగలడు?' },
        { v: 5, t: 'యేసు జవాబిచ్చెను — నీళ్ళవలనను ఆత్మవలనను జన్మింపకపోతే దేవుని రాజ్యమున ప్రవేశింపలేడు.' },
        { v: 16, t: 'దేవుడు లోకమును ఎంతగా ప్రేమించెనంటే, తన అద్వితీయకుమారునిగా ఉన్నవానిని అనుగ్రహించెను; ఆయనయందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు అనుగ్రహించెను.' },
        { v: 17, t: 'ఎందుకనగా దేవుడు తన కుమారుని లోకమును తీర్పు తీర్చుటకు లోకలోనికి పంపలేదు గాని దానివలన లోకము రక్షింపబడుటకు పంపెను.' },
    ],
    'psalms-23': [
        { v: 1, t: 'యెహోవా నా కాపరి; నాకు కొదువ కలుగదు.' },
        { v: 2, t: 'ఆయన నన్ను పచ్చిక బయళ్ళలో పరుండబెట్టును; విశ్రాంతికరమైన జలాల దగ్గరకు నన్ను నడిపించును.' },
        { v: 3, t: 'ఆయన నా ప్రాణమును తేల్చును; తన నామమునుబట్టి నీతిమార్గములలో నన్ను నడిపించును.' },
        { v: 4, t: 'మృత్యుచ్ఛాయా లోయలో నేను నడచినను అపాయమేదియు భయపడను; నీవు నాతోఉన్నావు; నీ దండమును నీ కఱ్ఱయు నన్ను ఆదరించుచున్నవి.' },
        { v: 5, t: 'నా శత్రువుల యెదుట నీవు నాకు బల్లపరచుచున్నావు; నా తలకు నూనె పూయుచున్నావు; నా పాత్ర నిండి పొర్లుచున్నది.' },
        { v: 6, t: 'నా జీవితకాలమంతటను మేలును కృపయు నన్ను అనుసరించును; నేను యెహోవా మందిరములో చిరకాలము నివసింతును.' },
    ],
    'romans-8': [
        { v: 1, t: 'కాగా క్రీస్తుయేసునందున్నవారికి ఇప్పుడు శిక్షావిధి లేదు.' },
        { v: 2, t: 'ఎందుకనగా క్రీస్తుయేసునందున్న జీవాత్మ అను నియమము పాపమరణముల నియమము నుండి నన్ను విడిపించెను.' },
        { v: 28, t: 'దేవుని ప్రేమించువారికి, అనగా తన సంకల్పమునుబట్టి పిలువబడినవారికి, సమస్తమును మేలుకొఱకే జరుగునని మనకు తెలియును.' },
        { v: 38, t: 'ఏలయనగా మరణమైనను జీవమైనను దేవుని ప్రేమను విడిచి మనలను వేరు పరచలేదు.' },
    ],
    'philippians-4': [
        { v: 4, t: 'ప్రభువునందు సదా సంతోషించుడి; మరల చెప్తాను సంతోషించుడి.' },
        { v: 6, t: 'దేనిగురించియు చింతపడకుడి గాని ప్రతి విషయమందు కృతజ్ఞతాస్తుతులతో కూడిన మీ విజ్ఞాపనలు దేవునికి తెలియజేయుడి.' },
        { v: 7, t: 'అప్పుడు సమస్త జ్ఞానమును మించిన దేవుని సమాధానము మీ హృదయములను మీ మనస్సులను క్రీస్తుయేసు ద్వారా కాపాడును.' },
        { v: 13, t: 'నన్ను బలపరచువాని ద్వారా సమస్తమును చేయగలను.' },
    ],
};

const teluguMock = (bookId, chapterNum) => {
    const key = `${bookId}-${chapterNum}`;
    const verses = TELUGU_CHAPTERS[key];
    if (verses) return verses;
    return [{ v: 1, t: 'ఈ అధ్యాయానికి తెలుగు అనువాదం త్వరలో అందుబాటులోకి వస్తుంది. (Telugu translation for this chapter coming soon.)' }];
};

export default function BiblePage() {
    const [testament, setTestament] = useState('NT');
    const [language, setLanguage] = useState('en');
    const [book, setBook] = useState(BOOKS.find(b => b.id === 'john'));
    const [chapter, setChapter] = useState(3);
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const verseRef = useRef(null);

    const filteredBooks = BOOKS.filter(b => b.t === testament);

    const fetchChapter = async (b, ch, lang) => {
        setLoading(true); setError(''); setVerses([]);
        try {
            if (lang === 'te') {
                await new Promise(r => setTimeout(r, 400));
                setVerses(teluguMock(b.id, ch));
            } else {
                const ref = encodeURIComponent(`${b.en} ${ch}`);
                const res = await axios.get(`https://bible-api.com/${ref}`);
                const raw = res.data.verses || [];
                setVerses(raw.map(v => ({ v: v.verse, t: v.text.replace(/\n/g, ' ').trim() })));
            }
            setTimeout(() => verseRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 50);
        } catch {
            setError('Could not load chapter. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchChapter(book, chapter, language); }, []);

    const selectBook = (b) => {
        setBook(b); setChapter(1);
        fetchChapter(b, 1, language);
        setSidebarOpen(false);
    };

    const selectChapter = (ch) => {
        setChapter(ch);
        fetchChapter(book, ch, language);
    };

    const toggleLanguage = () => {
        const next = language === 'en' ? 'te' : 'en';
        setLanguage(next);
        fetchChapter(book, chapter, next);
    };

    const bookName = language === 'te' ? book.te : book.en;

    return (
        <>
            <Helmet>
                <title>{bookName} {chapter} | Holy Bible</title>
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
            </Helmet>

            <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .verse-enter { animation: fadeUp 0.4s ease forwards; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>

            {/* Full-height wrapper, offset for navbar */}
            <div style={{ height: 'calc(100vh - 60px)', marginTop: 60, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}>

                {/* ─── TOP BAR ─── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 48, borderBottom: '1px solid #e0d8cc', background: '#fff', flexShrink: 0, zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Mobile menu toggle */}
                        <button onClick={() => setSidebarOpen(o => !o)}
                            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                            className="mobile-menu-btn">
                            <div style={{ width: 20, height: 2, background: '#4a3728', marginBottom: 4, borderRadius: 2 }} />
                            <div style={{ width: 20, height: 2, background: '#4a3728', marginBottom: 4, borderRadius: 2 }} />
                            <div style={{ width: 20, height: 2, background: '#4a3728', borderRadius: 2 }} />
                        </button>
                        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#2a1a0a', letterSpacing: '1px' }}>
                            Holy Bible
                        </span>
                    </div>

                    {/* Language toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', color: language === 'en' ? '#4a3728' : '#bbb' }}>EN</span>
                        <div onClick={toggleLanguage} style={{ width: 40, height: 22, borderRadius: 11, background: language === 'te' ? '#6b4f2d' : '#ddd0b5', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', border: '1px solid rgba(0,0,0,0.1)' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', position: 'absolute', top: 3, left: language === 'te' ? 21 : 3, transition: 'left 0.3s' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', color: language === 'te' ? '#4a3728' : '#bbb', fontFamily: '"Noto Serif Telugu", serif' }}>తె</span>
                    </div>
                </div>

                {/* ─── MAIN 3-COLUMN ─── */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

                    {/* ── LEFT: Book Sidebar ── */}
                    <div style={{
                        width: 220, flexShrink: 0, borderRight: '1px solid #e0d8cc',
                        background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    }} className="bible-sidebar">

                        {/* OT / NT toggle */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #e0d8cc', flexShrink: 0 }}>
                            {['OT', 'NT'].map(tab => (
                                <button key={tab} onClick={() => setTestament(tab)} style={{
                                    flex: 1, padding: '10px 0', border: 'none', cursor: 'pointer', fontSize: '0.75rem',
                                    fontWeight: 700, letterSpacing: '2px', transition: 'all 0.2s',
                                    background: testament === tab ? '#fdf4e3' : '#fff',
                                    color: testament === tab ? '#6b4f2d' : '#999',
                                    borderBottom: testament === tab ? '2px solid #6b4f2d' : '2px solid transparent',
                                }}>{tab}</button>
                            ))}
                        </div>

                        {/* Book list */}
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {filteredBooks.map((b, i) => {
                                const isActive = b.id === book.id;
                                return (
                                    <div key={b.id} onClick={() => selectBook(b)} style={{
                                        padding: '10px 14px', cursor: 'pointer', transition: 'background 0.15s',
                                        borderBottom: '1px solid #f0e8d8',
                                        background: isActive ? '#fdf4e3' : 'transparent',
                                        borderLeft: isActive ? '3px solid #6b4f2d' : '3px solid transparent',
                                    }}>
                                        <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#4a3728' : '#555', lineHeight: 1.3 }}>
                                            {b.en}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '0.7rem', color: isActive ? '#8b6840' : '#aaa', lineHeight: 1.3, fontFamily: '"Noto Serif Telugu", serif' }}>
                                            {b.te}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── CENTER: Chapter Panel ── */}
                    <div style={{
                        width: 160, flexShrink: 0, borderRight: '1px solid #e0d8cc',
                        background: '#faf7f2', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    }} className="bible-chapters">
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid #e0d8cc', flexShrink: 0 }}>
                            <p style={{ margin: 0, fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#a08060', fontWeight: 600 }}>Chapters</p>
                            <p style={{ margin: '2px 0 0', fontSize: '0.85rem', fontWeight: 700, color: '#2a1a0a', fontFamily: '"Cormorant Garamond", serif' }}>
                                {language === 'te' ? book.te : book.en}
                            </p>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                                {Array.from({ length: book.ch }, (_, i) => i + 1).map(ch => (
                                    <button key={ch} onClick={() => selectChapter(ch)} style={{
                                        padding: '7px 4px', border: 'none', borderRadius: 6, cursor: 'pointer',
                                        fontSize: '0.75rem', fontWeight: ch === chapter ? 700 : 400,
                                        transition: 'all 0.15s',
                                        background: ch === chapter ? '#6b4f2d' : 'transparent',
                                        color: ch === chapter ? '#fff' : '#5a432a',
                                    }}
                                        onMouseEnter={e => { if (ch !== chapter) e.target.style.background = '#f0e4d0'; }}
                                        onMouseLeave={e => { if (ch !== chapter) e.target.style.background = 'transparent'; }}
                                    >
                                        {ch}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Reading Panel ── */}
                    <div ref={verseRef} style={{
                        flex: 1, overflowY: 'auto', padding: 'clamp(24px, 5vw, 56px)',
                        background: 'linear-gradient(to bottom, #fdf8ef, #fdf4e3)',
                        position: 'relative',
                    }}>
                        {/* Chapter header */}
                        <div style={{ marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid rgba(90,60,30,0.15)' }}>
                            <p style={{ margin: '0 0 4px', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#a08060', fontWeight: 700 }}>
                                {testament === 'OT' ? 'Old Testament' : 'New Testament'}
                            </p>
                            <h2 style={{ margin: 0, fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: '#2a1a0a', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                                {(language === 'te' ? book.te : book.en.toUpperCase())} {chapter}
                            </h2>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '32px 0' }}>
                                <div style={{ width: 20, height: 20, border: '2px solid #ddd0b5', borderTopColor: '#6b4f2d', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                                <span style={{ fontFamily: '"Cormorant Garamond", serif', color: '#a08060', fontSize: '1rem', fontStyle: 'italic' }}>
                                    Loading…
                                </span>
                            </div>
                        )}

                        {/* Error */}
                        {error && <p style={{ color: '#b05050', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>{error}</p>}

                        {/* Verses */}
                        {!loading && verses.length > 0 && (
                            <p className="verse-enter" style={{
                                fontFamily: language === 'te' ? '"Noto Serif Telugu", "Mandali", serif' : '"Cormorant Garamond", serif',
                                fontSize: language === 'te' ? 'clamp(1rem, 2.5vw, 1.15rem)' : 'clamp(1.1rem, 2.5vw, 1.3rem)',
                                lineHeight: 1.95,
                                color: '#1e1208',
                                margin: 0,
                                maxWidth: 680,
                            }}>
                                {verses.map((v, i) => (
                                    <span key={i}>
                                        <sup style={{ fontSize: '0.6em', color: '#8b6840', fontWeight: 700, marginRight: 2, verticalAlign: 'super', lineHeight: 0 }}>{v.v}</sup>
                                        {v.t}{' '}
                                    </span>
                                ))}
                            </p>
                        )}

                        {/* Footer */}
                        {!loading && verses.length > 0 && (
                            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.12)' }} />
                                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.8rem', color: '#a08060', fontStyle: 'italic' }}>
                                    {language === 'te' ? book.te : book.en} {chapter}
                                </span>
                                <div style={{ flex: 1, height: 1, background: 'rgba(90,60,30,0.12)' }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .bible-sidebar {
            position: fixed !important; left: 0; top: 108px; bottom: 0; z-index: 100;
            transform: translateX(-100%); transition: transform 0.3s ease;
            box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          }
          .bible-chapters {
            width: 120px !important;
          }
          .mobile-menu-btn { display: flex !important; flex-direction: column; justify-content: center; }
        }
        @media (max-width: 480px) {
          .bible-chapters { display: none !important; }
        }
      `}</style>
        </>
    );
}
