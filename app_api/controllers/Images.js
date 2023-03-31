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

const imagesCreateOne = (req, res) => {
    var formImage = {
        name: req.body.name,
        desc: req.body.desc,
        userId: req.body.userId,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    };

    imageModel.create(formImage, (err, item) => {
        if(err) {
            console.log('err', err);
            sendJSONResponse(res, 400, err);
            return;
        }
        console.log('image saved', item);
        sendJSONResponse(res, 201, {"message": "image saved"});
    });
    
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