const mongoose = require('mongoose');
require('../models/Customers');
const Customer = mongoose.model('Customer');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//collection endpoint
const customersCreateOne = (req, res) => {

    if(!req.body.name || !req.body.address || !req.body.contact  
     || !req.body.rating){sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formCustomer = {
        address: req.body.address,
        name: req.body.name,
        rating: req.body.rating,
        contact: req.body.contact,
        facilities: req.body.facilities.split(','),
        email: req.body.email,
        gender: req.body.gender,
        userId: req.body.userId,
    };
    Customer
     .create(formCustomer, (err, dbCustomer) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbCustomer) {sendJSONResponse(res, 404, {"message":"customer could not be saved"}); return}
        sendJSONResponse(res, 201, dbCustomer);
     })
};

const customersReadAll = (req, res) => {
    console.log('here');
    Customer
     .find()
     .exec((err, customers)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customers) {sendJSONResponse(res, 404, {"message":"customers not found"}); return}
        sendJSONResponse(res, 200, customers);
     });
};


//document end point
const customersReadOne = (req, res) => {
    const customerId = req.params.customerId;
    if(!customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return}
    Customer
     .findById(customerId)
     .exec((err, customer)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customer) {sendJSONResponse(res, 404, {"message":"customer not found"}); return}
        sendJSONResponse(res, 200, customer);
     });
};

const doUpdateCustomers = (req, res, customer) => {
    if(req.body.address) {
        customer.address = req.body.address;
    }
    if(req.body.name) {
        customer.name = req.body.name;
    }
    if(req.body.rating) {
        customer.rating = req.body.rating;
    }
    if(req.body.contact) {
        customer.contact = req.body.contact;
    }
    if(req.body.facilities.length > 1) {
      customer.facilities = req.body.facilities.split(', ');
    }
    if(req.body.email) {
        customer.email = req.body.email;
    }
    if(req.body.gender) {
        customer.gender = req.body.gender;
    }

    customer.save((err, savedCustomer)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!savedCustomer) {sendJSONResponse(res, 404, {"message":"customer could not be updated"}); return}
        sendJSONResponse(res, 200, savedCustomer);            
    })
}

const customersUpdateOne = (req, res) => {
    if(!req.params.customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return}
    Customer
     .findById(req.params.customerId)
     .exec((err, customer)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customer) {sendJSONResponse(res, 404, {"message":"customer not found"}); return}
        doUpdateCustomers(req, res, customer);
     });
};

const customersDeleteOne = (req, res) => {
    if(!req.params.customerId) {sendJSONResponse(res, 400, {"message":"customer id required"}); return;}
    Customer
     .findByIdAndRemove(req.params.customerId)
     .exec((err, edu) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};

const customersReadByName = (req, res) => {
    if(!req.params.name) {sendJSONResponse(res, 400, {"message": "name required"}); return;}
    Customer
     .find()
     .exec((err, customers)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!customers) {sendJSONResponse(res, 404, {"message":"customers not found"}); return}
        sendUserCustomers(req, res, customers);
     });
};

const sendUserCustomers = (req, res, customers) => {
    let userCustomers = [];
    for(let i = 0; i < customers.length; i++)
    {
        if(req.params.name == customers[i].userId)
        {
            userCustomers.push(customers[i]);
        }
    }
    sendJSONResponse(res, 200, userCustomers);
};


module.exports = {
    customersCreateOne,
    customersReadAll,
    customersReadOne,
    customersUpdateOne,
    customersDeleteOne,
    customersReadByName
};

