//require the just installed express app
var express = require('express');
//then we call express
var app = express();
//takes us to the root(/) URL
app.get('/', function (req, res) {
  res.render('index');
});
//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.set('view engine', 'ejs');

app.post('/addtask', function (req, res) {
  res.render('index')
});
