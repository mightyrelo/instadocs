const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
require('../models/Tasks');
const Task = mongoose.model('Task');

const sendJSONResponse = (res, code, content) => {
    res
      .status(code)
      .json(content);
};

//list operations
const tasksCreateOne = (req, res) => {
    if(!req.body.name || !req.body.actionResponses)
      {sendJSONResponse(res, 400, {"message":"all fields required"}); return}
    const formTask = {
        name: req.body.name,
        actionResponses: req.body.actionResponses.split(','),
    };
    Task
     .create(formTask, (err, dbTask) => {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!dbTask) {sendJSONResponse(res, 404, {"message":"task could not be saved"}); return}
        sendJSONResponse(res, 201, dbTask);
     })
};

const tasksReadAll = (req, res) => {
    Task
     .find()
     .exec((err, tasks)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!tasks) {sendJSONResponse(res, 404, {"message":"tasks not found"}); return}
        sendJSONResponse(res, 200, tasks);
     });
};

//instance operations
const tasksReadOne = (req, res) => {
    const taskId = req.params.taskId;
    if(!taskId) {sendJSONResponse(res, 400, {"message":"task id required"}); return}
    Task
     .findById(taskId)
     .exec((err, task)=>{
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!task) {sendJSONResponse(res, 404, {"message":"task not found"}); return}
        sendJSONResponse(res, 200, task);
     });
};

const doUpdateTask = (req, res, task) => {
    if(req.body.name){
        task.name = req.body.name;
    }
    if(req.body.actionResponses){
        task.actionResponses = req.body.actionResponses.split(',');
    }
  
    task.save((err, savedTask)=>{
        if(err) {sendJSONResponse(res, 400, err);}
        if(!savedTask) {sendJSONResponse(res, 404, {"message":"task could not be updated"});}
        sendJSONResponse(res, 200, savedTask);            
    })
}

const tasksUpdateOne = (req, res) => {
    if(!req.params.taskId) {sendJSONResponse(res, 400, {"message":"task id required"}); return}
    Task
     .findById(req.params.taskId)
     .exec((err, task)=> {
        if(err) {sendJSONResponse(res, 400, err); return}
        if(!task) {sendJSONResponse(res, 404, {"message":"task not found"}); return}
        doUpdateTask(req, res, task);
     });
};

const tasksDeleteOne = (req, res) => {
    if(!req.params.taskId) {sendJSONResponse(res, 400, {"message":"task id required"}); return;}
    Task
     .findByIdAndRemove(req.params.taskId)
     .exec((err, task) => {
        if(err) {sendJSONResponse(res, 404, err); return;}
        sendJSONResponse(res, 204, null);
     });
};

const createDBTasks = (req, res) => {
    const tasks = [];
    const actionResponses = [];
    let count = 0;

    let path = `./files/tasks.csv`;
    let tempTask = {
        name: '',
        actionResponses: []
    };

    fs.createReadStream(path)
        .pipe(csvParser({separator: ','}))
        .on("data", (data)=> {
           

            if(data.task){
                tempTask.name = data.task;
                tempTask.actionResponses = [];
                count++;
                //add action response
                tempTask.actionResponses.push({
                    action: data.action,
                    response: data.response
                });
                //createTask(req, res, data);   
            }
            else if(!data.task && data.action && data.response) {
                tempTask.actionResponses.push({
                    action: data.action,
                    response: data.response
                });
            }
            else if(!data.task && !data.action & !data.response){
                Task.create({
                    name: tempTask.name,
                    actionResponses: tempTask.actionResponses
                },(err, task)=>{
                    if(err) {
                        sendJSONResponse(res, 400, err);
                    } else {
                        console.log('name of task - ', task.name);
                        tasks.push(task);
                    }
                });
                
            }
            
          })
        .on("end", ()=>{
          console.log(count,' tasks read from csv file to db.');
          console.log('number of tasks', tasks);
          sendJSONResponse(res, 201, tasks);
        });  
};

module.exports = {
    tasksCreateOne,
    tasksReadAll,
    tasksReadOne,
    tasksUpdateOne,
    tasksDeleteOne,
    createDBTasks
};