import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Layouts & Pages
import PublicLayout from './layouts/PublicLayout';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import MediaPage from './pages/MediaPage';
import GivingPage from './pages/GivingPage';

import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import BiblePage from './pages/BiblePage';

// Admin Layouts & Pages
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminSermons from './pages/admin/AdminSermons';
import AdminMessages from './pages/admin/AdminMessages';
import axios from 'axios';
import API_BASE_URL from './api/apiConfig.js';

const App = () => {
  React.useEffect(() => {
    // Record visit once per session
    const recordVisit = async () => {
      if (!sessionStorage.getItem('site_visited')) {
        try {
          await axios.post(`${API_BASE_URL}/analytics/visit`, {
            path: window.location.pathname
          });
          sessionStorage.setItem('site_visited', 'true');
        } catch (error) {
          console.error('Failed to record visit', error);
        }
      }
    };
    recordVisit();
  }, []);
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/events" element={<EventsPage />} />

                <Route path="/giving" element={<GivingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/bible" element={<BiblePage />} />
              </Route>

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/sermons" element={<AdminSermons />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/settings" element={<div style={{ color: 'white' }}><h2>Settings Placeholder</h2></div>} />
              </Route>

              {/* Fallback 404 */}
              <Route path="*" element={<div style={{ color: 'var(--color-text-primary)', padding: '5rem', textAlign: 'center' }}><h1>404 Not Found</h1></div>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
