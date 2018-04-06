var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../db/mongoose');
var Order = require('../models/order');
var ObjectId = require('mongoose').Types.ObjectId; 

var getOrders = async(req, res) => {
    var perPage = 10;
    var page = req.params.page || 1
    var status = req.params.status || 'active'

    let results = await Order.find(
        {
            status:status
        }
    ).skip((perPage * page) - perPage)
    .limit(perPage);
    let response  = {};
    let count = await Order.count(
        {
            status:status
        }
    );  
      
    response = {
        'results': results, 
        'current' : page,
        'total' : count,
        'pages' :Math.ceil(count / perPage) 
    };

   
    return response;
}

router.get('/list/:status?/:page*?', async (req, res, next) => {
    console.log('Inside list method');
    let response = await getOrders(req, res);     
    res.render('orders', response);    
});

/* GET orders listing. */
router.get('/:status?/:page*?', async (req, res, next) => {
    console.log('Inside main method');
    let response = await getOrders(req, res);     
    res.send(response);    
});


router.delete('/:Id', function(req, res) { 
    console.log('Inside delete method', req.params.Id);
    Order.remove({'_id': new ObjectId(req.params.Id)})
    .then(results => {
        res.send({'status' : 1});
    })
    .catch(err => {
        res.send({'status' : 0});
    });
});


const orderBook = {
    saveOrder : async(order) => {
        var neworder = new Order(order);
        let result = await neworder.save()
        return result;
    },

    fillOrder : async(orderhash) => {
        var updatedOrder = await Order.findOneAndUpdate({hash:orderhash}, { $set: { status: 'filled' }});
        return updatedOrder;
    },

    cancelOrder : async(orderhash) => {
        var updatedOrder = await Order.findOneAndUpdate({hash:orderhash}, { $set: { status: 'cancel' }});
        return updatedOrder;
    }
}


module.exports = {orders:router,orderBook};