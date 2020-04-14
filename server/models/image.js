// src/models/image.js

const mongoose = require('mongoose');

/**
 * image model schema.
 */
const imageSchema = new mongoose.Schema({
    file_path: { type: String, required: true },
    file_extension: { type: String, required: true },
    thumbnail_path: { type: String, default: "Unknown" },
    thumbnail_extension: { type: String, default: "Unknown" },
    mission: { type: String, default: "Unknown" },
    camera: { type: String, default: "Unknown" },
    geojson: { type: String, default: "Unknown" },
    fov: { type: String, default: "Unknown" },
    lla: { type: String, default: "Unknown" },
    velocity: { type: String, default: "Unknown" },
    time: { type: String, default: "Unknown" },
    gsd: { type: String, default: "Unknown" },
});

module.exports = mongoose.model('image', imageSchema);