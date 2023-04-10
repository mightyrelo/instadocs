const mongoose = require('mongoose');
require('../models/Users');
const User = mongoose.model('User');


const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

const usersReadAll = (req, res) => {
    User
      .find()
      .exec((err, users)=>{
        if(!users || users.length === 0) {
            sendJSONResponse(res, 404, {"message":"users not found"});
            return;
        } else if(err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, users);
      });

};

const usersDeleteOne = (req, res) => {
    const userId = req.params.userId;
    if(!userId) {
     sendJSONResponse(res, 404, {"message":"invalid user id"});
     return;
    }
    User
      .findByIdAndRemove(userId)
      .exec((err, user)=>{
         if(err) {
             sendJSONResponse(res, 404, err);
             return;
         }
         sendJSONResponse(res, 204, null);
      });
 
 };

 const usersReadByName = (req, res) => {
  const userName = req.params.userName;
    User
      .findOne({name: userName})
      .exec((err, user) => {
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        }
        if(!user) {
            sendJSONResponse(res, 404, {"message": "product not found"});
            return;
        }
        sendJSONResponse(res, 200, user);
      });

 };

 const usersUpdateOne = (req, res) => {
  if(!req.params.userId) {
    sendJSONResponse(res, 404, {"message":"user id required"});
    return;
   }
   User
     .findById(req.params.userId)
     .exec((err, user)=>{
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        } else if(!user) {
            sendJSONResponse(res, 404, {"message":"user id not found"});
            return;
        }

        if(req.body.name){
            user.name = req.body.name;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        if(req.body.completedQuotes){
            user.completedQuotes = req.body.completedQuotes;
        }
        if(req.body.password){
            user.password = req.body.password;
        }
        
        user.save((err, usr)=>{
            if(err) {
                sendJSONResponse(res, 404, err);
                return;
            } else {
                sendJSONResponse(res, 200, usr);
            }
        });
     });

 };

 module.exports = {
    usersReadAll,
    usersDeleteOne,
    usersReadByName,
    usersUpdateOne,
 }
