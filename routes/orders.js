var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../db/mongoose');
var Order = require('../models/order');

/* GET users listing. */
router.get('/:page*?', function(req, res, next) {

    var perPage = 10;
    var page = req.params.page || 1

    Order.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, results) {
        Order.count().exec(function(err, count) {
            if (err) return next(err);

            response = {
                'results': results,
                'current' : page,
                'pages' :Math.ceil(count / perPage) 
            };

            /*res.render('main/products', {
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
            })*/
            res.send(response);
        })
    });
});

router.post('/create', (req, res) => {
    var neworder = new Order(req.body);
    neworder.save()
    .then(result => {
        res.send(result._id);
    })
    .catch(err => {
        res.send(err);
    })
});

module.exports = router;