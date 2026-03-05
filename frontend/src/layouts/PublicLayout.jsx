import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';

const PublicLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isBible = location.pathname === '/bible';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: isBible ? '100vh' : 'auto',
            minHeight: '100vh',
            overflow: isBible ? 'hidden' : 'visible'
        }} className={isHome ? 'is-home' : ''}>
            {!isBible && <Header />}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: isBible ? 'hidden' : 'visible',
                paddingTop: !isHome && !isBible ? 'var(--navbar-height, 105px)' : '0',
                paddingBottom: !isBible ? '90px' : '0'
            }}>
                <Outlet />
            </main>
            {!isBible && <Footer />}

            {/* Mobile Bottom Navigation */}
            {!isBible && <MobileBottomNav />}
        </div>
    );
};

export default PublicLayout;
