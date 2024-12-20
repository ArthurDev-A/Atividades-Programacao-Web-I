var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', {title: 'Signup'});
});

router.get('/:userid', function(req, res, next) {
  const userid = req.params.userid;

  res.render('signin', {title: 'Signin', userid: userid});
});

module.exports = router;
