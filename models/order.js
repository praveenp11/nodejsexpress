//import { Schema } from 'mongoose';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ecSignature = new Schema({
    v:{
        type: Number,
        required : true
    },
    r:{
        type: Number,
        required : true
    },
    s:{
        type: Number,
        required : true
    }
});

var signedOrder = new Schema({
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
    ecSignature:{
        type: ecSignature,
        required: true
    }
});

var orderSchema = new Schema({
    hash :{
        type:String,
        required: true
    },
    fromToken:{
        type:String,
        required: true
    },
    fromTokenValue :{
        type:String,
        required: true
    },
    toToken:{
        type:String,
        required: true
    },
    toTokenValue :{
        type:String,
        required: true
    },    
    signedOrder:{
        type: signedOrder,
        required: true
    },
    orderType:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default:'active'
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