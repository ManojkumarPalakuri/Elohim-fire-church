const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
    },
    path: {
        type: String,
        default: '/',
    }
}, {
    timestamps: true
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
