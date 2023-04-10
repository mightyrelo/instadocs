const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
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
        'default': 'user'
    },
    subCategory: {
        type: String,
        'default': 'other'
    }
});

mongoose.model('Product',productSchema);