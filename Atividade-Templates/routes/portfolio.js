var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('portfolio', { title: 'Portifólio' });
});

module.exports = router;