var fs = require('fs');
var imageModel = require('../models/Images');
var path = require('path');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};



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
   console.log('path', __dirname);
   var img = fs.readFileSync(req.file.path);
   //encode image as a string i.e image is stored as a base64 string
    var encode_image = img.toString('base64');
   const obj = {
    name: file.filename,
    desc: 'logo',
    img: {
        //this seems to be decoding from a string back to a binary data.
        //BUffer.fom creates a new Buffer from the string provided
        //so data is a buffer
        //Buffers store a sequence of integers, similar to an array
        data: Buffer.from(encode_image, 'base64'),
        contentType: req.file.mimetype
    }

   };
  
   imageModel.create(obj, (err, item) => {
    if(err){
        console.log('erroring', err);
    }
    else {
        console.log('image created')
        res.send(item);
    }
   });
};

const imagesReadOne = (req, res) => {
    console.log('here with', req.params.companyName);
    var filename = req.params.companyName;
    imageModel.findOne({ 'name': filename }, (err, result) => {
        if (err) return console.log(err)
       // res.contentType(result.img.contentType);
        console.log('sent data', result.img.data.buffer);

        res.send(result);
    })
    
    
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