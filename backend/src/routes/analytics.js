const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

// @desc    Record a new site visit
// @route   POST /api/analytics/visit
// @access  Public
router.post('/visit', async (req, res) => {
    try {
        const { path } = req.body;
        // Get IP from headers (works with proxies) or connection remote address
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'Unknown';

        // Check for recent visits from the same IP to prevent simple spamming
        // Only allow 1 visit log per IP every 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        const recentVisit = await Visit.findOne({
            ip: ip,
            timestamp: { $gte: thirtyMinutesAgo }
        });

        if (!recentVisit) {
            await Visit.create({
                ip,
                userAgent,
                path: path || '/'
            });
            return res.status(201).json({ success: true, message: 'Visit recorded' });
        }

        // If recently visited, just return success without creating a new record
        res.status(200).json({ success: true, message: 'Visit already recorded recently' });
    } catch (error) {
        console.error('Error logging visit:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @desc    Get site analytics stats
// @route   GET /api/analytics/stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
    try {
        // Total visits
        const totalVisits = await Visit.countDocuments();

        // Unique visitors (count distinct IPs)
        const uniqueVisitors = await Visit.distinct('ip').then(ips => ips.length);

        // Get visits for the last 7 days for a potential chart
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentVisits = await Visit.countDocuments({
            timestamp: { $gte: sevenDaysAgo }
        });

        res.json({
            totalVisits,
            uniqueVisitors,
            recentVisits
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
