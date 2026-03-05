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
                  borderRadius: "0",
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

          {/* --- MINIMAL MOBILE HEADER (Branding only) --- */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "56px",
            }}
            className="mobile-header-only"
          >
            <Link to="/">
              <img
                src="/logo.png"
                alt="EFM"
                className="mobile-logo-img"
                style={{
                  height: "36px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Responsive CSS ── */}
      <style>{`
                @media (min-width: 992px) {
                    .desktop-nav { display: block !important; }
                    .desktop-cta { display: flex !important; }
                }
                @media (max-width: 768px) {
                    .desktop-header-flex { display: none !important; }
                    .mobile-header-only { 
                        display: flex !important; 
                        justify-content: flex-start !important;
                        height: auto !important;
                        padding: 24px 20px !important;
                    }
                    /* Forced transparency for immersive look */
                    .glass-nav, [data-theme='light'] .glass-nav { 
                        position: absolute !important;
                        background: transparent !important; 
                        background-image: none !important;
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        border-bottom: none !important;
                        box-shadow: none !important;
                        padding: 0 !important; /* Remove global padding */
                    }
                    .glass-nav-scrolled, [data-theme='light'] .glass-nav-scrolled {
                        display: none !important;
                    }
                    .mobile-logo-img {
                        height: 48px !important;
                        /* Softer, more premium shadow */
                        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
                        transition: transform 0.2s ease;
                    }
                    .mobile-logo-img:active {
                        transform: scale(0.95);
                    }
                }
                @media (min-width: 769px) {
                    .desktop-header-flex { display: flex !important; }
                    .mobile-header-only { display: none !important; }
                }
            `}</style>
    </>
  );
};

export default Header;
