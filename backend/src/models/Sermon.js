const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    speaker: {
        type: String,
        default: 'Prophet Joshua'
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Revival', 'Prophetic', 'Faith', 'Other'],
        default: 'Other'
    },
    youtubeUrl: {
        type: String,
        trim: true
    },
    thumbnailUrl: {
        type: String
    }
}, { timestamps: true });

const Sermon = mongoose.model('Sermon', sermonSchema);
module.exports = Sermon;
