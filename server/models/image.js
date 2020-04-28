const mongoose = require('mongoose');

/**
 * image model schema.
 */
const imageSchema = new mongoose.Schema({
    _id: { type: String, required: true },                      // The _id field acts like a primary key for mongoose. We will set it to the base name
    base_name: { type: String, required: true },                // if BASE_NAME.ppj is the ppj read in, BASE_NAME.extension are any associated files, and BASE_NAME_thumb.jpeg is the thumbnail
    //file_path: { type: String, required: true },                // BASE_NAME.ppj
    //file_extension: { type: String, required: true },           // TODO: change this to whatever image file is located with the ppj, if there is one
    thumbnail_path: { type: String, default: "Unknown" },       // BASE_NAME_thumb.jpeg
    thumbnail_extension: { type: String, default: "Unknown" },  // TODO: figure out if this is always jpeg
    mission: { type: String, default: "Unknown" },              // Directory that BASE_NAME.ppj is located in
    camera: { type: String, default: "Unknown" },
    fov: { type: String, default: "Unknown" },
    lla: { type: String, default: "Unknown" },
    velocity: { type: String, default: "Unknown" },
    time: { type: String, default: "Unknown" },
    gsd: { type: String, default: "Unknown" },
    points: { type: String},                                    // TODO: change this to a Map/Json type
    selected: {type: Boolean, default: false},                  // Determines if the image is marked selected for some action (e.g. generate thumbnails)
    visible: {type: Boolean, default: true},
    imgid: {type: String, default: "Unknown"},                  // Unique camera id from filename

    rgb_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File", 
        default: null
    },
    ppj_data:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File", 
        default: null
    },
    csv_data:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File", 
        default: null
    },

    metadata: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }],
    Thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File", 
        default: null
    }
});

module.exports = mongoose.model('Image', imageSchema);