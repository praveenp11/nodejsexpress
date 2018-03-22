var express = require('express');
var router = express.Router();
var db = require('../db/mongoose');
var Order = require('../models/order');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/orders/:Id', function(req, res, next){
  Order.find({'signedOrder.maker': req.params.Id})
    .then(results => {
        res.send(results);
    })
    .catch(err => {
        res.send('Ok');
    });
});

module.exports = router;
