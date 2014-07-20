'use strict';

var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    // one-to-one relationship on user
    user: {type: Schema.ObjectId, 
	   ref: 'User',
	   index: { unique: true }},
    birthdate: {type: Date,
	       default: Date.now},
    enrolledDate: {type: Date,
		  default: Date.now},
    shirtSize: {type: String,
		uppercase: true,
		enum: ['S', 'M', 'L', 'XL']}
    },
    //{ _id: false } // Players don't use their _id
    { id: false} // Players don't use their _id, hide its getter 
);

PlayerSchema.virtual('id').get(function() {
    // Players derive 'id' from user._id
    return this.user._id;
});

PlayerSchema.statics = {
    load: function(userId, cb) {
	this.findOne({user: userId}).populate('user').exec(cb);
    }
};
    
mongoose.model('Player', PlayerSchema);
