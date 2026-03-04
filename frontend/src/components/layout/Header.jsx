import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Sun, Moon, Heart, MapPin, Phone, Clock, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle custom event from mobile hero
  useEffect(() => {
    const handleOpenMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener("open-mobile-menu", handleOpenMenu);
    return () => window.removeEventListener("open-mobile-menu", handleOpenMenu);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Media", path: "/media" },
    { name: "Events", path: "/events" },
    { name: "Bible", path: "/bible" },
    { name: "Contact", path: "/contact" },
  ];

    return (
      <>
        {/* ── Master Floating Header Wrapper ── */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ── Top Info Bar ── */}
          <div className={`top-info-bar ${isScrolled ? "hidden" : ""}`}>
            <div className="container">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "clamp(12px, 3vw, 32px)",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                      animation: "pulseGlow 2s infinite",
                      display: "inline-block",
                    }}
                  ></span>
                  <span style={{ fontWeight: "600" }}>Live Sundays</span>
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Clock size={12} style={{ opacity: 0.7 }} />
                  Sunday Service — 10:30 AM
                </span>
                <span
                  className="info-bar-divider"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Phone size={12} style={{ opacity: 0.7 }} />
                  +91 7095409118
                </span>
                <span
                  className="info-bar-location"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MapPin size={12} style={{ opacity: 0.7 }} />
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          {/* ── Main Navbar ── */}
          <header
            style={{
              position: isScrolled ? "fixed" : "relative",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              padding: isScrolled ? "8px 0" : "14px 0",
            }}
            className={`glass-nav ${isScrolled ? "glass-nav-scrolled" : ""}`}
          >
            <div
              className="container"
              style={{ position: "relative", zIndex: 1001 }}
            >
              {/* --- DESKTOP NAVBAR --- */}
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="desktop-header-flex"
              >
                {/* Logo (Left) */}
                <NavLink
                  to="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="EFM"
                    style={{
                      height: isScrolled ? "65px" : "75px",
                      margin: "-10px 0",
                      objectFit: "contain",
                      transition: "height 0.3s ease",
                    }}
                  />
                  <div
                    className="logo-text"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      borderLeft: "1px solid var(--color-gold-dark)",
                      paddingLeft: "12px",
                      marginLeft: "2px",
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "var(--font-logo)",
                        fontSize: "1.1rem",
                        margin: 0,
                        color: "var(--color-text-primary)",
                        letterSpacing: "1.5px",
                        lineHeight: 1.1,
                        fontWeight: 700,
                      }}
                    >
                      ELOHIM <span className="logo-fire-text" style={{ fontWeight: 800 }}>FIRE</span>
                    </h1>
                    <span
                      style={{
                        fontSize: "0.55rem",
                        color: "var(--color-text-secondary)",
                        letterSpacing: "3px",
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        marginTop: "1px",
                      }}
                    >
                      MINISTRIES
                    </span>
                  </div>
                </NavLink>

                {/* Desktop Nav (Center) */}
                <nav className="desktop-nav">
                  <ul
                    style={{
                      display: "flex",
                      gap: "1.8rem",
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            isActive ? "nav-link nav-link-active" : "nav-link"
                          }
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Desktop CTA (Right) */}
                <div
                  className="desktop-cta"
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <button
                    onClick={toggleTheme}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--color-text-primary)",
                      cursor: "pointer",
                      padding: "6px",
                      borderRadius: "8px",
                    }}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <Link to="/giving" className="give-btn-desktop" style={{ textDecoration: "none" }}>
                    <Heart size={14} fill="currentColor" /> Give Online
                  </Link>
                </div>
              </div>

              {/* --- PREMIUM MOBILE NAVBAR (Unified) --- */}
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                className="mobile-header-flex"
              >
                <div style={{ flex: 1 }}>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src="/logo.png" alt="EFM" style={{ height: "48px", margin: "-7px 0", objectFit: "contain" }} />
                  </Link>
                </div>

                {/* Center Info */}
                <div style={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%", boxShadow: "0 0 8px rgba(34,197,94,0.6)", animation: "pulseGlow 2s infinite" }}></div>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
                    Live Sundays 10:30AM
                  </span>
                </div>

                {/* Hamburger Right */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    style={{ background: "transparent", border: "none", padding: "4px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "6px" }}
                    aria-label="Menu"
                  >
                    <div style={{ width: "22px", height: "1.5px", backgroundColor: "var(--color-text-primary)", borderRadius: "2px" }}></div>
                    <div style={{ width: "16px", height: "1.5px", backgroundColor: "var(--color-text-primary)", borderRadius: "2px", alignSelf: "flex-end" }}></div>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* ── Mobile Menu Overlay ── */}
=======
  return (
    <>
      {/* ── Master Floating Header Wrapper ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* ── Top Info Bar ── */}
        <div className={`top-info-bar ${isScrolled ? "hidden" : ""}`}>
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "clamp(12px, 3vw, 32px)",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                    animation: "pulseGlow 2s infinite",
                    display: "inline-block",
                  }}
                ></span>
                <span style={{ fontWeight: "600" }}>Live Sundays</span>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Clock size={12} style={{ opacity: 0.7 }} />
                Sunday Service — 10:30 AM
              </span>
              <span
                className="info-bar-divider"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Phone size={12} style={{ opacity: 0.7 }} />
                +91 7095409118
              </span>
              <span
                className="info-bar-location"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <MapPin size={12} style={{ opacity: 0.7 }} />
                Hyderabad, India
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Navbar ── */}
        <header
          style={{
            position: isScrolled ? "fixed" : "relative",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: isScrolled ? "8px 0" : "14px 0",
          }}
          className={`glass-nav ${isScrolled ? "glass-nav-scrolled" : ""}`}
        >
          <div
            className="container"
            style={{ position: "relative", zIndex: 1001 }}
          >
            {/* --- DESKTOP NAVBAR --- */}
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="desktop-header-flex"
            >
              {/* Logo (Left) */}
              <NavLink
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }}
              >
                <img
                  src="/logo.png"
                  alt="EFM"
                  style={{
                    height: isScrolled ? "65px" : "75px",
                    margin: "-10px 0",
                    objectFit: "contain",
                    transition: "height 0.3s ease",
                  }}
                />
>>>>>>> dev
                <div
                  className="logo-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderLeft: "1px solid var(--color-gold-dark)",
                    paddingLeft: "12px",
                    marginLeft: "2px",
                  }}
                >
<<<<<<< HEAD
                    {/* --- Mobile Menu Top Bar (Logo + Close) --- */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '80px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 24px',
                    }}>
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/logo.png" alt="EFM" style={{ height: '40px', objectFit: 'contain' }} />
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                padding: '8px'
                            }}
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <nav style={{ width: '100%' }}>
                        <ul style={{
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            textAlign: 'center',
                        }}>
                            {navLinks.map((link, index) => (
                                <li key={link.name} className="animate-slide-up" style={{ animationDelay: `${(index + 1) * 0.08}s` }}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={({ isActive }) => ({
                                            color: isActive ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
                                            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                                            fontWeight: '700',
                                            fontFamily: 'var(--font-logo)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            display: 'block',
                                            lineHeight: '1.3',
                                            padding: '8px 0',
                                            transition: 'all 0.3s ease'
                                        })}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = 'var(--color-accent-primary)';
                                            e.currentTarget.style.transform = 'scale(1.03)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="animate-slide-up" style={{
                        marginTop: '2rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--color-gold-dark)',
                        width: '100%',
                        animationDelay: '0.6s',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px'
                    }}>
                        {/* Inline Theme Toggle for Mobile */}
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'rgba(212,175,55,0.1)',
                                border: '1px solid rgba(212,175,55,0.2)',
                                color: 'var(--color-text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 24px',
                                borderRadius: '0',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                            }}
                        >
                            {theme === 'dark' ? (
                                <>
                                    <Sun size={18} /> Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon size={18} /> Dark Mode
                                </>
                            )}
                        </button>
                        <Link to="/giving" onClick={() => setIsMobileMenuOpen(false)} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'var(--color-accent-primary)',
                            color: '#fff',
                            padding: '14px 48px',
                            borderRadius: '0',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.9rem',
                            border: 'none',
                            boxShadow: '0 8px 24px rgba(255, 106, 0, 0.3)',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-body)',
                        }}>
                            <Heart size={16} fill="#ff0000" color="#ffffff" /> Give Online
                        </Link>

                        <p style={{
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.85rem',
                            marginTop: '1.5rem',
                            lineHeight: 1.6,
                            maxWidth: '300px',
                            margin: '1.5rem auto 0',
                        }}>
                            Empowering lives through the uncompromised Word of God.
                        </p>
                    </div>
=======
                  <h1
                    style={{
                      fontFamily: "var(--font-logo)",
                      fontSize: "1.1rem",
                      margin: 0,
                      color: "var(--color-text-primary)",
                      letterSpacing: "1.5px",
                      lineHeight: 1.1,
                      fontWeight: 700,
                    }}
                  >
                    ELOHIM{" "}
                    <span
                      className="logo-fire-text"
                      style={{ fontWeight: 800 }}
                    >
                      FIRE
                    </span>
                  </h1>
                  <span
                    style={{
                      fontSize: "0.55rem",
                      color: "var(--color-text-secondary)",
                      letterSpacing: "3px",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      marginTop: "1px",
                    }}
                  >
                    MINISTRIES
                  </span>
>>>>>>> dev
                </div>
              </NavLink>

              {/* Desktop Nav (Center) */}
              <nav className="desktop-nav">
                <ul
                  style={{
                    display: "flex",
                    gap: "1.8rem",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          isActive ? "nav-link nav-link-active" : "nav-link"
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Desktop CTA (Right) */}
              <div
                className="desktop-cta"
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <button
                  onClick={toggleTheme}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-text-primary)",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "8px",
                  }}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link
                  to="/giving"
                  className="give-btn-desktop"
                  style={{ textDecoration: "none" }}
                >
                  <Heart size={14} fill="currentColor" /> Give Online
                </Link>
              </div>
            </div>

            {/* --- PREMIUM MOBILE NAVBAR (Unified) --- */}
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              className="mobile-header-flex"
            >
              <div style={{ flex: 1 }}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="EFM"
                    style={{
                      height: "48px",
                      margin: "-7px 0",
                      objectFit: "contain",
                    }}
                  />
                </Link>
              </div>

              {/* Center Info */}
              <div
                style={{
                  flex: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#22c55e",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                    animation: "pulseGlow 2s infinite",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Live Sundays 10:30AM
                </span>
              </div>

              {/* Hamburger Right */}
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "4px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                  aria-label="Menu"
                >
                  <div
                    style={{
                      width: "22px",
                      height: "1.5px",
                      backgroundColor: "var(--color-text-primary)",
                      borderRadius: "2px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "16px",
                      height: "1.5px",
                      backgroundColor: "var(--color-text-primary)",
                      borderRadius: "2px",
                      alignSelf: "flex-end",
                    }}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ── Mobile Menu Overlay ── */}
        <div
          className={`glass-menu ${isMobileMenuOpen ? "active" : ""}`}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000, // Above hero top bar
            padding: "80px 40px 40px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme === "dark" ? "#0B0B0B" : "#FFFFFF",
            transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            opacity: 1,
            backdropFilter: "none",
          }}
        >
          {/* --- Mobile Menu Top Bar (Logo + Close) --- */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
            }}
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/logo.png"
                alt="EFM"
                style={{ height: "40px", objectFit: "contain" }}
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <X size={28} />
            </button>
          </div>
          <nav style={{ width: "100%" }}>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                textAlign: "center",
              }}
            >
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="animate-slide-up"
                  style={{ animationDelay: `${(index + 1) * 0.08}s` }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive
                        ? "var(--color-gold)"
                        : theme === "dark"
                          ? "#fff"
                          : "#222",
                      fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
                      fontWeight: "700",
                      fontFamily: "var(--font-logo)",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      display: "block",
                      lineHeight: "1.3",
                      padding: "8px 0",
                      transition: "all 0.3s ease",
                    })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="animate-slide-up"
            style={{
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-gold-dark)",
              width: "100%",
              animationDelay: "0.6s",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {/* Inline Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "var(--color-text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                borderRadius: "50px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} /> Dark Mode
                </>
              )}
            </button>
            <Link
              to="/giving"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #D4AF37 0%, #FF6A00 100%)",
                color: "#fff",
                padding: "14px 48px",
                borderRadius: "50px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.9rem",
                border: "none",
                boxShadow: "0 8px 24px rgba(212, 175, 55, 0.3)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              <Heart size={16} fill="currentColor" /> Give Online
            </Link>

            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.85rem",
                marginTop: "1.5rem",
                lineHeight: 1.6,
                maxWidth: "300px",
                margin: "1.5rem auto 0",
              }}
            >
              Empowering lives through the uncompromised Word of God.
            </p>
          </div>
        </div>

        {/* ── Responsive CSS ── */}
        <style>{`
                @keyframes pulseGlow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @media (min-width: 992px) {
                    .desktop-nav { display: block !important; }
                    .desktop-cta { display: flex !important; }
                }
                @media (max-width: 991px) {
                    .mobile-menu-toggle { display: flex !important; }
                }
                @media (max-width: 768px) {
                    .desktop-header-flex { display: none !important; }
                    .mobile-header-flex { display: flex !important; }
                }
                @media (min-width: 769px) {
                    .desktop-header-flex { display: flex !important; }
                    .mobile-header-flex { display: none !important; }
                }
                @media (max-width: 600px) {
                    .logo-text { display: none !important; }
                    .info-bar-divider,
                    .info-bar-location { display: none !important; }
                }
            `}</style>
      </div>
    </>
  );
};

export default Header;
