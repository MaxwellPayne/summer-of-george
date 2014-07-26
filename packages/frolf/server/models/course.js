'use strict';

var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema
    , _ = require('underscore');


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
    courseName: {
	// never change this property to 'name',
	// 'name' is reserved in some mongoose.Query methods
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

var _CourseSchema = {};
// Implementation of CourseSchema.statics.chainQueries
_CourseSchema.chainQueries = function(existingQueryset) {
    if (existingQueryset) {
    _CourseSchema.queryset = existingQueryset;
    }
    else {
	var Course = mongoose.model('Course');
	_CourseSchema.queryset = Course.find();
    }
    return _CourseSchema;
};

_CourseSchema
    // search by partial match on courseName
    .matchName = function(name) {
	var nameRegex = new RegExp(name, 'i');
	return _CourseSchema.queryset.regex('courseName', nameRegex);
};

CourseSchema.statics = {
    load: function(courseId, cb) {
	return this
	           .findOne({ _id: courseId })
	           .populate('holes')
	           .exec(cb);
    },
    chainQueries: _CourseSchema.chainQueries
    // chainable preset static queries, each of which returns queryset
    // example: Course.matchName('name').somethingElse(arg)
};

mongoose.model('Course', CourseSchema);
mongoose.model('Hole', HoleSchema);

// Schemas may be referenced by other models
exports.CourseSchema = CourseSchema;
exports.HoleSchema = HoleSchema;
