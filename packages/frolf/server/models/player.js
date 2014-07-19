var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    user: {type: Schema.ObjectId, 
	   ref: 'User'},
    birth: {type: Date,
	   default: Date.now}
});
    
