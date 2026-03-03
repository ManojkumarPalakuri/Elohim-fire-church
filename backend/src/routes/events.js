const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @route   GET /api/events
// @desc    Get all upcoming events, sorted by date ascending
// @access  Public
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ date: { $gte: new Date() } }).sort('date');
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin only)
router.post('/', async (req, res) => {
    try {
        const { title, description, date, location, imageUrl } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            imageUrl
        });

        const event = await newEvent.save();
        res.status(201).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin only)
router.put('/:id', async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        const { title, description, date, location, imageUrl } = req.body;

        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, date, location, imageUrl } },
            { new: true }
        );

        res.json(event);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin only)
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
