const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// @desc    Save a contact / prayer request message
// @route   POST /api/messages
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, phone, type, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    try {
        const newMessage = await Message.create({ name, email, phone, type, message });
        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        console.error('Error saving message:', error.message);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// @desc    Get all messages (admin)
// @route   GET /api/messages
// @access  Private (add auth middleware later)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// @desc    Mark a message as read
// @route   PUT /api/messages/:id/read
// @access  Private
router.put('/:id/read', async (req, res) => {
    try {
        const msg = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        if (!msg) return res.status(404).json({ message: 'Message not found.' });
        res.json(msg);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        const msg = await Message.findByIdAndDelete(req.params.id);
        if (!msg) return res.status(404).json({ message: 'Message not found.' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
