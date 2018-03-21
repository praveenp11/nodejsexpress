//import { Schema } from 'mongoose';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    maker: {
        type: String,
        required: true
    },
    taker:{
        type: String,
        required: true    
    },
    feeRecipient:{
        type: String,
        required: true
    },
    makerTokenAddress:{
        type: String,
        required: true
    },
    takerTokenAddress:{
        type: String,
        required: true    
    },
    exchangeContractAddress:{
        type: String,
        required: true    
    },
    salt:{
        type: String,
        required: true
    },
    makerFee:{
        type:Boolean,
        required:true
    },
    takerFee:{
        type:Boolean,
        required:true
    },
    makerTokenAmount:{
        type:String,
        required:true
    },
    takerTokenAmount:{
        type: String,
        required: true    
    },
    expirationUnixTimestampSec:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        required: true,
        default: Date.now()
    },
    updated_at:{
        type:Date,
        required: true,
        default: Date.now()
    }
});


var Order = mongoose.model('order', orderSchema);

module.exports = Order;