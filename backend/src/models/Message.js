const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    type: {
        type: String,
        enum: ['contact', 'prayer', 'testimony'],
        default: 'contact',
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
