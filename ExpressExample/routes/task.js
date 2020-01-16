var express = require('express');
var router = express.Router();

var taskList=[{id:1,Name:"Dhiraj",isCompleted:false},{id:2,Name:"Deepak",isCompleted:true}];

router.get('/', function(req, res, next) {
    res.json(taskList)
  });

  router.get('/:id',function(req,res,next){

    const taskId=parseInt(req.param.id);
    const resultTask=taskList.find(t=>t.id==taskList);
    if(!resultTask)
    {
        next(createError(404));
    }
    else
    {
        res.json(resultTask);
    }
  });
  

module.exports = router;