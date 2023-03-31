const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: String,
    desc: String, 
    userId: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', imageSchema);