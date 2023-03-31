const sendJSONResponse = require("./SharedFunctions");

const mongoose = require('mongoose');
require('../models/Customers');
const Customer = mongoose.model('Customer');

//level 1 : collection
const quotationsReadAll = (req, res) => {
    const cusId = req.params.customerId;

    if(!cusId){sendJSONResponse(res, 400, {"message":"missing url param"}); return;}
    Customer
        .findById(cusId)
        .select('name quotations')
        .exec((err, customer)=>{
            if(err){sendJSONResponse(res, 404, err); return;}
            if(!customer){sendJSONResponse(res, 404, {"message":"quotations not found"});return;}
            const response = {
                customer: {
                    name: customer.name,
                    id: customer._id    
                },
                quotes: customer.quotations
            };
            sendJSONResponse(res, 200, response);
        });
    
} 

const doCreateQuotation = (req, res, customer) => {

    const {quoteItems, summary, amount, expense, profit} = req.body;

    const formQuote = {
        quoteItems,
        summary,
        amount,
        expense,
        profit
    };
    customer.quotations.push(formQuote);
    customer.save((err, savedCus) => {
        if(err) {sendJSONResponse(res, 400, err); return;}
        if(!savedCus) {sendJSONResponse(res, 400, {"message":"could not save parent doc"}); return;}
        let thisQuote = customer.quotations.slice(-1).pop();
        if(!thisQuote){sendJSONResponse(res, 400, {"message":"could not save quote"}); return;}
        sendJSONResponse(res, 201, thisQuote);
    });
    
};

const quotationsCreateOne = (req, res) => {
    //find customer
    Customer
        .findById(req.params.customerId)
        .select('name quotations')
        .exec((err, customer) => {
            if(err){sendJSONResponse(res, 400, err);return;}
            if(!customer){sendJSONResponse(res, 404, {"message":"customer not found"});return;}
            doCreateQuotation(req, res, customer);
        });
    
}

//level 2: document
const quotationsReadOne = (req, res) => {
    const cusId = req.params.customerId;
    const quoteId = req.params.quotationId;

    if(!cusId || !quoteId){sendJSONResponse(res, 400, {"message":"missing url param"}); return;}
    Customer
        .findById(cusId)
        .select('name quotations')
        .exec((err, customer)=>{
            if(err){sendJSONResponse(res, 400, err); return;}
            if(!customer){sendJSONResponse(res, 404, {"message":"quotations not found"});return;}
            if(customer.quotations && customer.quotations.length > 0) {
                let quote = customer.quotations.id(quoteId);
                if(!quote){sendJSONResponse(res, 404, {"message":"invalid quotation id"}); return}
                const response = {
                    customer: {
                        name: customer.name,
                        id: customer._id    
                    },
                    quote
                };
                sendJSONResponse(res, 200, quote);
                return;
            }
            sendJSONResponse(res, 404, {"message":"no quotations found."}) 
        });
}

const doUpdateQuotation = (req, res, customer) => {

}

const quotationsUpdateOne = (req, res) => {
 //find customer
  Customer
    .findById(req.params.customerId)
    .select('name quotations')
    .exec((err, customer) => {
         if(err){sendJSONResponse(res, 400, err);return;}
        if(!customer){sendJSONResponse(res, 404, {"message":"customer not found"});return;}
        doUpdateQuotation(req, res, customer);
    });

} 

const doDeleteQuotation = (req, res, customer) => {
    if(customer.quotations && customer.quotations.length > 1 ) {
        customer.quotations.id(req.params.quotationId).remove();
        customer.save((err, customer) => {
            if(err) {sendJSONResponse(res, 400, err); return;}
            sendJSONResponse(res, 204, null);
        });        
    } else {
        sendJSONResponse(res, 404, {"message":"no quotations found"});
    }
};

const quotationsDeleteOne = (req, res) => {
    if(!req.params.customerId || !req.params.quotationId) {sendJSONResponse(res, 400, {"message":"missing params"})}
 //find customer
 Customer
     .findById(req.params.customerId)
    .select('name quotations')
    .exec((err, customer) => {
        if(err){sendJSONResponse(res, 400, err);return;}
        if(!customer){sendJSONResponse(res, 404, {"message":"customer not found"});return;}
        doDeleteQuotation(req, res, customer);
 });

} 


module.exports = {
    quotationsReadAll,
    quotationsCreateOne,
    quotationsReadOne,
    quotationsUpdateOne,
    quotationsDeleteOne
};