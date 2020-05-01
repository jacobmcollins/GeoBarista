const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    folder: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    extension: String,
    thumb: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        unique: true,
        required: true
    },
    base_path: {
        type: String,
        required: true,
    },
    JSONData: String
});

module.exports = mongoose.model('File', fileSchema);