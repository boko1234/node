const express = require('express'),
  Task = require('./model/sch'),
  crypto = require('crypto'),
  router = express.Router();

router.get('/', function (req, res) {
  res.send("helo")
})
router.get('/todo', function (req, res) {
  Task.find().then((data) => {
    res.status(200).send(data)
  })
  // res.type('html')

  // res.send()
}).post('/todo', function (req, res) {
  let title = req.body.title
  Task.findOne({title}).then((task) => {
    if (task) {
      return res.status(200).send({message:'请勿重复添加',type:'warning'})
    } else {
      Task.create({
        title: title,
        status:false
      }).then(() => {
        return res.status(200).send({message:'添加成功',type:'success'})
        // return res.status().send(200,data)
      })
    }
  })
})
router.put('/todo/:id', function (req, res) {
  let id = req.body.id,status = req.body.status;
  Task.updateOne({_id: id},{$set:{status:status}}).then((data)=>{
      console.log('修改成功',data);
      res.status(200).send({})
  }).catch((err)=>{
      if(err)throw err;
  })
}).put('/todo/cl/:id', function (req, res) {
  console.log(req.body, 'cl/put');
  Task.deleteOne({_id: req.body.id}).then(() => {
    console.log("删除成功");
    res.status(200).send({})
  }).catch((err)=>{
      if(err)throw err;
  })
})


module.exports = router




