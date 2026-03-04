import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Calendar, Video, MessageSquare, Settings, LogOut, Sun, Moon, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Events', path: '/admin/events', icon: Calendar },
        { label: 'Sermons', path: '/admin/sermons', icon: Video },
        { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
        { label: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    // Generate initials avatar from user name
    const initials = (user.name || 'A').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-dark)' }}>
            <Helmet>
                <title>Admin Dashboard | Elohim Fire Ministries</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* ─── Sidebar ─────────────────────────────────────────── */}
            <aside style={{
                width: '260px',
                background: theme === 'dark'
                    ? 'linear-gradient(180deg, #0f0f14 0%, #0a0a0d 100%)'
                    : 'linear-gradient(180deg, #ffffff 0%, #f4f4f8 100%)',
                borderRight: '1px solid var(--color-border-outline)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 10,
            }}>

                {/* Brand */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--color-border-outline)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <div style={{
                        width: '40px', height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(212, 175, 55, 0.12)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', flexShrink: 0,
                    }}>
                        <img src="/logo.png" alt="Logo" style={{ height: '30px', objectFit: 'contain' }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-primary)', letterSpacing: '1px', lineHeight: 1.2 }}>
                            ELOHIM <span style={{ color: 'var(--color-accent-primary)' }}>FIRE</span>
                        </h2>
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>Admin Panel</span>
                    </div>
                </div>

                {/* User Info */}
                <div style={{
                    padding: '1.2rem 1.5rem',
                    borderBottom: '1px solid var(--color-border-outline)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-gold), var(--color-accent-primary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.9rem', fontWeight: '700', color: '#000', flexShrink: 0,
                    }}>{initials}</div>
                    <div style={{ overflow: 'hidden' }}>
                        <strong style={{ color: 'var(--color-text-primary)', fontSize: '0.9rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user.name}
                        </strong>
                        <span style={{
                            fontSize: '0.7rem', letterSpacing: '1.5px', fontWeight: '700', textTransform: 'uppercase',
                            background: 'linear-gradient(90deg, var(--color-gold), var(--color-accent-primary))',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>{user.role}</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', padding: '0 1.5rem', marginBottom: '8px' }}>Navigation</p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '13px',
                                        padding: '11px 1.5rem',
                                        color: isActive ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                                        backgroundColor: isActive
                                            ? theme === 'dark' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0.12)'
                                            : 'transparent',
                                        borderLeft: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                        fontSize: '0.92rem',
                                        fontWeight: isActive ? '600' : '400',
                                        borderRadius: '0 8px 8px 0',
                                        marginRight: '8px',
                                    })}
                                >
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer / Logout */}
                <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid var(--color-border-outline)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--color-fire)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            transition: 'background 0.2s',
                            width: '100%',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,69,0,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* ─── Main Content Area ────────────────────────────────── */}
            <main style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {/* Topbar */}
                <header style={{
                    backgroundColor: 'var(--color-bg-card)',
                    padding: '0.85rem 2rem',
                    borderBottom: '1px solid var(--color-border-outline)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 5,
                    backdropFilter: 'blur(8px)',
                }}>
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                            border: '1px solid var(--color-border-outline)',
                            color: 'var(--color-text-primary)',
                            padding: '7px 14px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border-outline)'}
                    >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>

                    {/* View Live Site */}
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.85rem',
                            textDecoration: 'none',
                            padding: '7px 14px',
                            borderRadius: '20px',
                            border: '1px solid var(--color-border-outline)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-primary)'; e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.borderColor = 'var(--color-border-outline)'; }}
                    >
                        <ExternalLink size={14} /> View Live Site
                    </a>
                </header>

                {/* Page Content */}
                <div style={{ flex: 1, padding: '2rem' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
