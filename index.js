var express = require('express');
var cors = require('cors');
var mu = require('multer'); 
require('dotenv').config()
var app = express();
// set-up packages 
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
//app middleware 

const uploadFile = mu({dest:'./public/data/uploads'});
//set up multer package for user uploads 

app.post('/api/fileanalyse', uploadFile.single('upfile'), function (req, res){
 const {originalname, mimetype, size} = req.file;
  res.json({
    name: originalname,
    type: mimetype, 
    size: size
  }); 
});
//POST file metadata using multer 

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
//set-up port 
