const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// console.log(process.env);
var db = mongoose.connect(process.env.MONGO_DB_HOST || 'mongodb://localhost:27017/test');
module.exports = db;
