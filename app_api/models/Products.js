const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    retail: {
        type: Number,
    },
    trade: {
        type: String,
        required: true
    },
    selling: {
        type: String,
        required: true
    },
    inStock: Number,
    userId: String,
    createdOn: {
        type: Date,
        'default': Date.now
    },
    regalCode: {
        type: String
    },
    category: {
        type: String,
        'default': 'general'
    }
});

mongoose.model('Product',productSchema);