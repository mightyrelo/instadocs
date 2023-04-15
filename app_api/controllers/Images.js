var fs = require('fs');


const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

var imageModel = require('../models/Images');
var path = require('path');
const imagesReadAll = (req, res) => {
    imageModel.find({}, (err, items) => {
        if(err) {
            sendJSONResponse(res, 500, err);
            return;
        }
        sendJSONResponse(res, 200, {items: items});
    });
};

const imagesCreateOne = (req, res, next) => {
   const file = req.file;
   console.log(file.filename);
   if(!file) {
    const err = new Error('please upload file');
    err.httpStatusCode = 400;
    return next(err);
   }
   res.send(file);
    
};

const imagesReadOne = (req, res) => {
    sendJSONResponse(res, 200, {"message": "no tested"});
    
};

const imagesDeleteOne = (req, res) => {
    sendJSONResponse(res, 200, {"message": "no tested"});
};


module.exports = {
    imagesReadAll,
    imagesCreateOne,
    imagesReadOne,
    imagesDeleteOne
};