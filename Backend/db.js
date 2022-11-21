const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/";

const connectToMongo = ()=>{
mongoose.connect(mongoURL, {useNewUrlParser: true}, ()=>{console.log("connected to Mongo Successfully")});
}

module.exports =connectToMongo;