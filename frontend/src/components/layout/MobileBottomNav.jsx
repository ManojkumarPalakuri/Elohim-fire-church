import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Radio, Book, Hand, Menu } from "lucide-react";
import MenuDrawer from "./MenuDrawer";

const MobileBottomNav = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/", icon: <Home size={22} /> },
        { name: "Watch", path: "/media", icon: <Radio size={22} /> },
        { name: "Bible", path: "/bible", icon: <Book size={22} /> },
        { name: "Prayer", path: "/contact", icon: <Hand size={22} /> },
    ];

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <>
            <div className="md:hidden">
                <nav className="mobile-bottom-nav-container">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={`mobile-nav-item ${isActive ? "active" : ""}`}
                            >
                                {item.icon}
                                <span className="mobile-nav-label">{item.name}</span>
                            </NavLink>
                        );
                    })}

                    <button
                        onClick={toggleDrawer}
                        className="mobile-nav-item"
                        aria-label="Menu"
                    >
                        <Menu size={22} />
                        <span className="mobile-nav-label">Menu</span>
                    </button>
                </nav>
            </div>

            <MenuDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
};

export default MobileBottomNav;
