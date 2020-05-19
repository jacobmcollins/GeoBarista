// src/services/image.js

const imageModel = require('../models/image');

/**
 * Stores a new image into the database.
 * @param {Object} image image object to create.
 * @throws {Error} If the image is not provided.
 */
module.exports.create = async (image) => {
    if (!image)
        throw new Error('Missing image');

    await imageModel.create(image);
}