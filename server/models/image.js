const mongoose = require('mongoose');

/**
 * image model schema.
 */
const imageSchema = new mongoose.Schema({
    // Filename without extension
    base_name: { type: String, required: true }, 
    // Full path without extension
    base_path: { type: String, required: true },                
    // Whether or not this image has a thumbnail 
    thumbnail_bool: { type: Boolean, default: false },
    // Whether or not this image is a thumbnail with no 'parent'
    thumbnail_only: { type: Boolean, default: false},
    // Path to thumnail file (if extant)
    thumbnail_path: { type: String, default: "Unknown" }, 
    // Thumbnail file extension      
    thumbnail_extension: { type: String, default: "Unknown" },
    // Folder name containing image  
    mission: { type: String, default: "Unknown" }, 
    // Values parsed from filename             
    camera: { type: String, default: "Unknown" },
    time: { type: String, default: "Unknown" },
    imgid: { type: String, default: "Unknown" }, 
    // Values parsed from .csv files
    fov: { type: String, default: "Unknown" },
    lla: { type: String, default: "Unknown" },
    velocity: { type: String, default: "Unknown" },
    gsd: { type: String, default: "Unknown" },
    // Values parsed from .ppj files    
    points: { type: String },   
    // Front end state values                                 // TODO: change this to a Map/Json type
    selected: { type: Boolean, default: false },                  // Determines if the image is marked selected for some action (e.g. generate thumbnails)
    visible: { type: Boolean, default: true },                     

    rgb_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    rgb_data_path: { type: String, default: "Unknown" },
    ppj_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    ppj_data_path: { type: String, default: "Unknown" },
    csv_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    csv_data_path: { type: String, default: "Unknown" },
    ntf_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    ntf_data_path: { type: String, default: "Unknown" },
    jpg_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    jpg_data_path: { type: String, default: "Unknown" },
    thumbnail_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    tiff_data_path: { type: String, default: "Unknown" },
    tiff_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },
    urw_data_path: { type: String, default: "Unknown" },
    urw_data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        default: null
    },

    ppjJsonData: { type: String, default: "empty"},
    csvJsonData: { type: String, default: "empty"},

});

module.exports = mongoose.model('Image', imageSchema);