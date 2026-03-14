const explicitUrl = import.meta.env.VITE_API_URL;

// If we are developing locally and accessing via a local IP (e.g., from a phone),
// we should dynamically build the API URL based on the current hostname.
const getApiUrl = () => {
    if (import.meta.env.PROD) {
        return explicitUrl || 'https://elohim-fire-church-production.up.railway.app/api';
    }

    if (explicitUrl && explicitUrl.includes('localhost') && typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        // If accessed via an IP address or non-localhost hostname on local network
        if (hostname !== 'localhost') {
            return `http://${hostname}:5001/api`;
        }
    }

    // Fallback to explicit URL or localhost default
    return explicitUrl || 'http://localhost:5001/api';
};

const API_BASE_URL = getApiUrl();
export default API_BASE_URL;
