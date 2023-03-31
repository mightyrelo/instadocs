const mongoose = require('mongoose');
require('../models/Companies');
const Company = mongoose.model('Company');
const sendJSONResponse = require('./SharedFunctions');


const companiesReadAll = (req, res) => {
    Company
        .find()
        .exec((err, companies) => {
            if(err) {sendJSONResponse(res, 400, err); return;}
            if(!companies) {sendJSONResponse(res, 404, {"message":"no companies found"}); return;}
            sendJSONResponse(res, 200, companies);
        });
}

const companiesReadOne = (req, res) => {
    Company
        .findById(req.params.companyId)
        .exec((err, company) => {
            if(err) {sendJSONResponse(res, 400, err); return;}
            if(!company) {sendJSONResponse(res, 404, {"message": "company not found!"}); return;}
            sendJSONResponse(res, 200, company);
        });
}

const companiesCreateOne = (req, res) => {
    if(!req.body.name || !req.body.address || !req.body.tagline || !req.body.email || !req.body.contacts
    || !req.body.accountName || !req.body.bank || !req.body.accountNumber || !req.body.branch) {
        sendJSONResponse(res, 400, {"message": "missing fields required."});
        return;
    }



    const formCompany = {
        name: req.body.name,
        address: req.body.address,
        tagline: req.body.tagline,
        email: req.body.email,
        contacts: req.body.contacts.split(', '),
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        branch: req.body.branch,
        website: req.body.website,
        bank: req.body.bank,
        userId: req.body.userId
    };

    Company
        .create(formCompany, (err, company) => {
            if(err) {sendJSONResponse(res, 400, err); return;}
            if(!company) {sendJSONResponseq(res, 400, {"message":"company not saved"}); return;}
            sendJSONResponse(res, 201, company);
        });
}

const companiesUpdateOne = (req, res) => {

}

const companiesDeleteOne = (req, res) => {
    Company
        .findByIdAndRemove(req.params.companyId)
        .exec((err, company) =>{
            if(err) {sendJSONResponse(res, 400, err);return;}
            sendJSONResponse(res, 204, company);
        });
}

module.exports = {
    companiesReadOne,
    companiesCreateOne,
    companiesReadAll,
    companiesDeleteOne,
    companiesUpdateOne
}



