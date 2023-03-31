const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tagline: String,
    address: {
        type: String,
        required: true
    },
    contacts: [Number],
    email: String,
    website: String,
    accountName: String,
    bank: String,
    branch: Number,
    accountNumber: Number,
    userId: String

});

mongoose.model('Company', CompanySchema);
