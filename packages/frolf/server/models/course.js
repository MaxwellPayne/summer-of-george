'use strict';

var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema;


var HoleSchema = new Schema({
// a single hole in a frolf course
    par: {type: Number}
});


HoleSchema
    // number of the hole as it would appear on a flag
    .virtual('flagNumber').get(function() {
	return this.parentArray ? this.parentArray().indexOf(this) + 1 : undefined;
    });


var CourseValidators = {
    // Course's 'holes' array must be the same length as
    // its numberOfHoles; pad with nulls if Holes() unknown
    holesLength: function(hArray) {
	return hArray.length === this.numberOfHoles;
    }
};


var CourseSchema = new Schema({
// a frolf course with a number of holes

    numberOfHoles: {
	type: Number
    },
    name: {
	type: String
    },
    lattitude: {
	type: Number
    },
    longitude: {
	type: Number
    },
    avg: {
	type: Number
    },
    best: {
	type: Number
    },
    holes: {
	type: [HoleSchema],
	validate: [
	    CourseValidators.holesLength,
	    'holes array must equal size of course'
	]
    }
});

CourseSchema.methods = {
    // lookup hole by its flagNumber
    holeNumbered: function(holeNum) {
	if (holeNum < 1 || holeNum > this.numberOfHoles) {
	    throw Error(holeNum + ' is not a valid hole number on this course');
	}
	return this.holes[holeNum - 1];
	}
};




mongoose.model('Course', CourseSchema);
mongoose.model('Hole', HoleSchema);

// DEBUG
exports.Hole = HoleSchema;
exports.Course = CourseSchema;
