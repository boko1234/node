const express = require('express'),
  app = express(),
  path = require('path'),
  session = require('express-session'),
  Mongosession = require('connect-mongo')(session),
  mongoose = require('mongoose'),
  server = 3500;

mongoose.connect('mongodb://localhost:27017/ddd', {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('数据库连接失败');
    return
  }
  console.log('连接成功');
})

app.use(session({
  secret: 'alsdkfj',
  rolling: true,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60},
  store: new Mongosession({
    url: 'mongodb://localhost:27017/ddd'
  })
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//静态资源目录
app.use('/static',express.static(__dirname + '/static'))
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs')


app.use('/', require('./index.js'));
app.use('/v1', require('./admin.js'));

app.use('/favicon.ico', function (req,res) {
  res.sendFile(__dirname+'/view/favicon.ico')
});

app.listen(server, () => {
  console.log("http://localhost:" + server);
})








