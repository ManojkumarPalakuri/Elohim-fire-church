const express = require('express');
const router = express.Router();
const axios = require('axios');

// Default Channel ID for Elohim Fire Ministries
const DEFAULT_CHANNEL_ID = 'UCZO4of-Yy5ub97KBgACUV2g';

// Helper to check if a value is a placeholder
const isPlaceholder = (val) => {
    if (!val) return true;
    const placeholders = [
        'your_youtube_api_key_here',
        'UC_your_channel_id_here',
        'your_actual_api_key',
        'UC_your_actual_channel_id'
    ];
    return placeholders.includes(val.trim());
};

// @route   GET /api/youtube
// @desc    Get latest 3 live videos from YouTube channel (API or RSS Feed)
// @access  Public
router.get('/', async (req, res) => {
    try {
        let apiKey = process.env.YOUTUBE_API_KEY;
        let channelId = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID;

        if (isPlaceholder(channelId)) {
            channelId = DEFAULT_CHANNEL_ID;
        }

        // Try YouTube Data API v3 first if API Key is available
        if (!isPlaceholder(apiKey)) {
            try {
                // Fetch completed live broadcasts
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: apiKey,
                        channelId: channelId,
                        part: 'snippet',
                        order: 'date',
                        maxResults: 5, // Fetch slightly more to filter/ensure we have 3
                        type: 'video',
                        eventType: 'completed' // Specifically past live broadcasts
                    },
                    timeout: 5000
                });

                // Also try to check if there is a currently live stream
                let liveVideos = [];
                try {
                    const liveResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                        params: {
                            key: apiKey,
                            channelId: channelId,
                            part: 'snippet',
                            type: 'video',
                            eventType: 'live'
                        },
                        timeout: 3000
                    });
                    liveVideos = liveResponse.data.items;
                } catch (liveErr) {
                    console.warn('Current Live check failed:', liveErr.message);
                }

                const allItems = [...liveVideos, ...response.data.items];

                // Map and limit to 3
                const videos = allItems.slice(0, 3).map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.high.url,
                    publishedAt: item.snippet.publishedAt,
                    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
                    isLive: item.snippet.liveBroadcastContent === 'live'
                }));

                return res.json(videos);
            } catch (apiErr) {
                console.warn('YouTube API call failed, falling back to RSS feed:', apiErr.message);
            }
        }

        // Fallback: Fetch from YouTube RSS Feed (No API Key required)
        // RSS URL: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

        const rssResponse = await axios.get(rssUrl, {
            headers: { 'Accept': 'application/xml' },
            timeout: 8000
        });
        const rssData = rssResponse.data;

        // Extract video details using regex
        const videos = [];
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        const videoIdRegex = /<yt:videoId>(.*?)<\/yt:videoId>/;
        const titleRegex = /<title>(.*?)<\/title>/;
        const publishedRegex = /<published>(.*?)<\/published>/;

        // Keywords that identify a "Live" broadcast or Church Service (Full length)
        const liveKeywords = ['Sunday Service', 'Friday Service', 'Morning Service', 'Evening Service', 'Prophetic Seminar', 'Night of Deliverance', 'Night of Fire', 'Special Meeting', '7095409118'];

        let match;
        const allFound = [];
        const processedVideoIds = new Set(); // To avoid duplicates

        // First pass: Find videos matching live keywords
        entryRegex.lastIndex = 0; // Reset regex for a fresh scan
        while ((match = entryRegex.exec(rssData)) !== null && allFound.length < 3) {
            const entryContent = match[1];
            const videoIdMatch = entryContent.match(videoIdRegex);
            const titleMatch = entryContent.match(titleRegex);
            const publishedMatch = entryContent.match(publishedRegex);

            if (videoIdMatch && titleMatch) {
                const videoId = videoIdMatch[1];
                const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1');

                const isLiveContent = liveKeywords.some(keyword =>
                    title.toLowerCase().includes(keyword.toLowerCase()) ||
                    title.includes(keyword)
                );

                if (isLiveContent && !processedVideoIds.has(videoId)) {
                    allFound.push({
                        id: videoId,
                        title: title,
                        publishedAt: publishedMatch ? publishedMatch[1] : null,
                        embedUrl: `https://www.youtube.com/embed/${videoId}`,
                        isLive: true
                    });
                    processedVideoIds.add(videoId);
                }
            }
        }

        // Second pass: if we don't have enough matches, search the whole feed (up to 50 entries)
        // for any video, prioritizing those with live keywords but also including others if needed.
        if (allFound.length < 3) {
            entryRegex.lastIndex = 0; // Reset regex for a fresh scan
            let count = 0;
            while ((match = entryRegex.exec(rssData)) !== null && allFound.length < 3 && count < 50) {
                count++;
                const entryContent = match[1];
                const videoIdMatch = entryContent.match(videoIdRegex);
                const titleMatch = entryContent.match(titleRegex);
                const publishedMatch = entryContent.match(publishedRegex);

                if (videoIdMatch && titleMatch) {
                    const videoId = videoIdMatch[1];
                    const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, '$1');

                    if (!processedVideoIds.has(videoId)) {
                        allFound.push({
                            id: videoId,
                            title: title,
                            publishedAt: publishedMatch ? publishedMatch[1] : null,
                            embedUrl: `https://www.youtube.com/embed/${videoId}`,
                            isLive: liveKeywords.some(keyword =>
                                title.toLowerCase().includes(keyword.toLowerCase()) ||
                                title.includes(keyword)
                            )
                        });
                        processedVideoIds.add(videoId);
                    }
                }
            }
        }

        res.json(allFound.slice(0, 3)); // Ensure only up to 3 videos are returned
    } catch (err) {
        console.error('YouTube Fetch Error:', err.message);
        res.status(500).json({ message: 'Error fetching YouTube videos' });
    }
});

module.exports = router;
