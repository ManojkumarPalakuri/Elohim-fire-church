import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Calendar,
    Users,
    BookOpen,
    Settings,
    Sun,
    Moon,
    X
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MenuDrawer = ({ isOpen, onClose }) => {
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { name: "Give / Donate", icon: <Heart size={20} className="text-red-500" />, path: "/giving" },
        { name: "Events", icon: <Calendar size={20} className="text-blue-500" />, path: "/events" },
        { name: "Ministries", icon: <Users size={20} className="text-purple-500" />, path: "/services" },
        { name: "Sermons", icon: <BookOpen size={20} className="text-green-500" />, path: "/media" },
    ];

    return (
        <div className={`bottom-nav-drawer ${isOpen ? "active" : ""}`}>
            <div className="drawer-backdrop" onClick={onClose} />

            <div className="drawer-content" style={{ padding: '24px 20px', paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}>
                <div className="drawer-handle" style={{ marginBottom: '24px' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, fontFamily: 'var(--font-heading)' }}>Menu</h2>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'transparent',
                            color: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '56px',
                                minHeight: '56px',
                                textDecoration: 'none',
                                color: 'inherit',
                                borderRadius: '16px',
                                transition: 'all 0.2s ease',
                                active: { transform: 'scale(0.98)' }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {item.icon}
                                </div>
                                <span style={{ fontSize: '16px', fontWeight: '500' }}>{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>

                <div style={{
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '56px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {theme === "dark" ? <Moon size={22} className="text-blue-400" /> : <Sun size={22} className="text-orange-400" />}
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>
                                {theme === "dark" ? "Dark mode" : "Light mode"}
                            </span>
                        </div>

                        <button
                            onClick={toggleTheme}
                            style={{
                                width: '48px',
                                height: '24px',
                                borderRadius: '12px',
                                border: 'none',
                                background: theme === 'dark' ? 'var(--color-accent-primary)' : 'rgba(0,0,0,0.1)',
                                position: 'relative',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <motion.div
                                animate={{ x: theme === "dark" ? 26 : 2 }}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDrawer;
