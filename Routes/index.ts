import express = require('express');
const router = express.Router();

/* GET home page - with / */
router.get('/', function(req, res, next) 
{
  // use the 'index' template and inject an object with a 'title' property with a value of 'Express'
  res.render('index', { title: 'Express' });
});

/* GET home page - with /home */
router.get('/home', function(req, res, next) 
{
  // use the 'index' template and inject an object with a 'title' property with a value of 'Express'
  res.render('index', { title: 'Express' });
});

module.exports = router;
