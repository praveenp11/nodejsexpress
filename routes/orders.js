var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../db/mongoose');
var Order = require('../models/order');

/* GET users listing. */
router.get('/:status/:page*?', function(req, res, next) {

    var perPage = 10;
    var page = req.params.page || 1
    var status = req.params.status || 'active'
    Order.find(
        {
            status:status
        }
    ).skip((perPage * page) - perPage)
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

const orderBook = {
    saveOrder : async(order) => {
        var neworder = new Order(order);
        let result = await neworder.save()
        return result;
    }
}


module.exports = {orders:router,orderBook};