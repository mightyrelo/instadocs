const mongoose = require('mongoose');
require('../models/Products');
const Prod = mongoose.model('Product');

const sendJSONResponse = (res, stat, content) => {
    res
      .status(stat)
      .json(content);
};


const productsCreateOne = (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.trade || !req.body.selling  
        || !req.body.userId){sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    Prod.create({
        name: req.body.name,
        description: req.body.description,
        trade: req.body.trade,
        selling: req.body.selling,
        userId: req.body.userId
    },(err, product)=>{
        if(err) {
            console.log('herew ew are');
            sendJSONResponse(res, 400, err);
        } else {
            sendJSONResponse(res, 201, product);
        }
    });
};

const productsReadOne = (req, res) => {
    Prod
      .findById(req.params.productid)
      .exec((err, product)=>{
        if(!product) {
            sendJSONResponse(res,404,{"message":"product with id not found"});
            return;
        } else if(err) {
            sendJSONResponse(res,404,err);
            return;
        }
        sendJSONResponse(res,200,product);
      });
};

const productsUpdateOne = (req, res) => {

   if(!req.params.productid) {
    sendJSONResponse(res, 404, {"message":"product id required"});
    return;
   }
   Prod
     .findById(req.params.productid)
     .exec((err, product)=>{
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        } else if(!product) {
            sendJSONResponse(res, 404, {"message":"product id not found"});
            return;
        }

        if(req.body.trade){
            product.trade = req.body.trade;
        }
        if(req.body.retail){
            product.selling = req.body.selling;
        }
        if(req.body.name){
            product.name = req.body.name;
        }
        if(req.body.description){
            product.description = req.body.description;
        }
        
        product.save((err, prod)=>{
            if(err) {
                console.log('hierss');
                sendJSONResponse(res, 404, err);
                return;
            } else {
                sendJSONResponse(res, 200, prod);
            }
        });
     });

};
const productsDeleteOne = (req, res) => {
   const prodid = req.params.productid;
   if(!prodid) {
    sendJSONResponse(res, 404, {"message":"invalid customer id"});
    return;
   }
   Prod
     .findByIdAndRemove(prodid)
     .exec((err, product)=>{
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 204, null);
     });

};
const productsReadAll = (req, res) => {
    Prod
      .find()
      .exec((err, products)=>{
        if(!products || products.length === 0) {
            sendJSONResponse(res, 404, {"message":"products not found"});
            return;
        } else if(err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, products);
      });

};

const productsReadByName = (req, res) => {
    const productName = req.params.productName;
    Prod
      .findOne({name: productName})
      .exec((err, product) => {
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        if(!product) {
            sendJSONResponse(res, 404, {"message": "product not found"});
            return;
        }
        sendJSONResponse(res, 200, product);
      });
};

const productsReadByUserName = (req, res) => 
{
    if(!req.params.userName) {sendJSONResponse(res, 400, {"message": "name required"}); return;}
    Prod
     .find()
     .exec((err, products)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!products) {sendJSONResponse(res, 404, {"message":"customers not found"}); return}
        sendUserProducts(req, res, products);
     });

};
const productsReadByCategory = (req, res) => 
{
    
    if(!req.params.category || !req.params.userName) {sendJSONResponse(res, 400, {"message": "name required"}); return;}
    Prod
     .find({userId: req.params.userName})
     .exec((err, products)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!products) {sendJSONResponse(res, 404, {"message":"customers not found"}); return}
        sendCategoryProducts(req, res, products);
     });
};

const sendCategoryProducts = (req, res, products) => 
{
    let userProducts = [];
    for(let i = 0; i < products.length; i++)
    {
        if(req.params.category == products[i].category)
        {
            userProducts.push(products[i]);
        }
    }
    sendJSONResponse(res, 200, userProducts); 
};


const sendUserProducts = (req, res, products) => 
{
    let userProducts = [];
    for(let i = 0; i < products.length; i++)
    {
        if(req.params.userName == products[i].userId)
        {
            userProducts.push(products[i]);
        }
    }
    sendJSONResponse(res, 200, userProducts); 
};

module.exports = {
    productsCreateOne,
    productsReadOne,
    productsUpdateOne,
    productsDeleteOne,
    productsReadAll,
    productsReadByName,
    productsReadByUserName,
    productsReadByCategory,
};