const mongoose = require('mongoose');

const ActionResponse = mongoose.Schema({
    action: String,
    response: String
});

//schema defines model
const TaskSchema = mongoose.Schema({
    //pathname : propertiesObject
    name: {
        type: String,
        required: true,
        unique: false
    },
    actionResponses: [ActionResponse],
});

//create model by compiing schema
mongoose.model('Task', TaskSchema);