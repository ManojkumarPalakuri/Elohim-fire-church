const express = require('express');
const router = express.Router();
const Sermon = require('../models/Sermon');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/sermons
// @desc    Get all sermons
// @access  Public
router.get('/', async (req, res) => {
    try {
        const sermons = await Sermon.find().sort({ date: -1 });
        res.json(sermons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/sermons
// @desc    Create a new sermon
// @access  Private (Admin only)
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, speaker, date, category, youtubeUrl, thumbnailUrl } = req.body;

        const newSermon = new Sermon({
            title,
            speaker,
            date,
            category,
            youtubeUrl,
            thumbnailUrl
        });

        const sermon = await newSermon.save();
        res.status(201).json(sermon);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/sermons/:id
// @desc    Update a sermon
// @access  Private (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        let sermon = await Sermon.findById(req.params.id);
        if (!sermon) return res.status(404).json({ message: 'Sermon not found' });

        const { title, speaker, date, category, youtubeUrl, thumbnailUrl } = req.body;

        sermon = await Sermon.findByIdAndUpdate(
            req.params.id,
            { $set: { title, speaker, date, category, youtubeUrl, thumbnailUrl } },
            { new: true }
        );

        res.json(sermon);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Sermon not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/sermons/:id
// @desc    Delete a sermon
// @access  Private (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const sermon = await Sermon.findById(req.params.id);
        if (!sermon) return res.status(404).json({ message: 'Sermon not found' });

        await Sermon.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sermon removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Sermon not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
