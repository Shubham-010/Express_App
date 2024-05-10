const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const walgroundSchema =  new Schema({
    title:String,
    resolution:Number,
    Description:String,
});

module.exports = mongoose.model('walground', walgroundSchema);
