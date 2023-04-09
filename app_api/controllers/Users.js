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

 module.exports = {
    usersReadAll,
    usersDeleteOne
 }
