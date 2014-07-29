'use strict';

var mongoose = require('mongoose')
    , _ = require('underscore')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema
    , PlayerSchema = require('./player.js').PlayerSchema
    , CourseSchema = require('./course.js').CourseSchema
    , HoleSchema = require('./course.js').HoleSchema;


var RoundSchemaSetters = {
    setCourse: function(courseVal) {
	// enforces referential integrity between
	// performance: [{ hole: hole }] and courseVal.holes
	if(_.any(this.performances, function(performance) {
		return performance.hasOwnProperty('score');
	    }))
	{
	// if attempting to change course and scores already
	// exist for previous course, raise exception
	    throw Error('must delete old scores before changing the course');
	}
	else
	{
	    // make this.performances' holes match the course
	    this.performances = [];
	    var performances = this.performances;
	    _.forEach(courseVal.holes, function(hole) {
		performances.push({ hole: hole });
	    });
	}
	return courseVal;
    }
};

var RoundSchema = new Schema({
// A party of Players record HolePerformances
// for each hole on a Course on a given date
    course: {
	type: Schema.ObjectId,
	ref: 'Course',
	set: RoundSchemaSetters.setCourse
    },
    player: {
	type: Schema.ObjectId,
	ref: 'Player'
    },
    performances: [{
	hole: {
	    type: Schema.ObjectId,
	    ref: 'Hole'
	},
	score: {
	    type: Number
	}
    }],
});


mongoose.model('Round', RoundSchema);
exports.RoundSchema = RoundSchema;
