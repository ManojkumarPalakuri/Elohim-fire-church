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
      {/* ── Main Navbar ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
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
                className="nav-logo-img"
                style={{
                  margin: "-10px 0",
                  objectFit: "contain",
                }}
              />
              <div
                className="logo-text nav-logo-text"
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
                style={{
                  textDecoration: "none",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Heart size={16} fill="#ff0000" stroke="#ffffff" strokeWidth={2} /> Give Online
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
                  className="nav-logo-img"
                  style={{
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

      {/* ── Mobile Menu Backdrop ── */}
      <div
        className="mobile-backdrop"
        onClick={() => setIsMobileMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 1999,
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Mobile Menu Bottom Sheet ── */}
      <div
        className={`glass-menu ${isMobileMenuOpen ? "active" : ""}`}
        style={{
          position: "fixed",
          top: "auto",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          padding: "16px 24px 40px",
          maxHeight: "85vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme === "dark" ? "#121212" : "#FFFFFF",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          transition: "transform 0.45s ease, opacity 0.35s ease",
          transform: isMobileMenuOpen ? "translateY(0)" : "translateY(100%)",
          opacity: isMobileMenuOpen ? 1 : 0,
          boxShadow: "0 -8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Drag Handle */}
        <div style={{
          width: "40px",
          height: "4px",
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "4px",
          margin: "0 auto 24px auto"
        }}></div>

        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "var(--color-bg-dark)",
            border: "1px solid var(--color-border-outline)",
            color: "var(--color-text-primary)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          aria-label="Close menu"
          onMouseEnter={e => e.currentTarget.style.background = "var(--color-bg-card)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--color-bg-dark)"}
        >
          <X size={18} />
        </button>

        <nav style={{ width: "100%" }}>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            {navLinks.map((link, index) => (
              <li
                key={link.name}
                style={{
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : "0s",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)"
                }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--color-gold)"
                      : "var(--color-text-primary)",
                    fontSize: "18px",
                    fontWeight: isActive ? "600" : "500",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.4px",
                    display: "block",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    backgroundColor: isActive ? "rgba(0,0,0,0.05)" : "transparent",
                    transition: "all 0.2s ease",
                    textDecoration: "none"
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          style={{
            marginTop: "10px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isMobileMenuOpen ? "0.3s" : "0s",
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)"
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              background: theme === "dark" ? "var(--color-bg-card)" : "#f4f4f4",
              border: "none",
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              height: "48px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              width: "100%"
            }}
          >
            {theme === "dark" ? (
              <>
                <Sun size={20} /> Light Mode
              </>
            ) : (
              <>
                <Moon size={20} /> Dark Mode
              </>
            )}
          </button>
          <Link
            to="/giving"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "linear-gradient(90deg, #ff7a00, #f6c33b)",
              color: "#fff",
              height: "54px",
              borderRadius: "16px",
              fontWeight: 600,
              fontSize: "18px",
              border: "none",
              textDecoration: "none",
              width: "100%",
              letterSpacing: "0.5px"
            }}
          >
            <Heart size={20} fill="#ff0000" stroke="#ffffff" strokeWidth={2} /> Give Online
          </Link>
        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
                @keyframes pulseGlow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @keyframes slideUpMenu {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
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
    </>
  );
};

export default Header;
