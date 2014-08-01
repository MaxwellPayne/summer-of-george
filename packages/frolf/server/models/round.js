'use strict';

var mongoose = require('mongoose')
    , mongoosePrivatePaths = require('mongoose-private-paths')
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
	
	// make this.performances' holes match the course
	this.performances = [];
	var performances = this.performances;
	_.forEach(courseVal.holes, function(hole) {
	    performances.push({ hole: hole });
	});
	return courseVal;
    },
	
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
    performances: {
	type: [{
	    hole: {
		type: Schema.ObjectId,
		ref: 'Hole'
	    },
	    score: {
		type: Number
	    }
	}],
	private: true
    },
    over: {
	type: Boolean,
	default: false,
	private: true
    },
   immutable: {
       // only used by the pre('save') event
       // false until Round saved as over: true for first time
       type: Boolean,
       default: false,
       private: true
   }
});

RoundSchema.plugin(mongoosePrivatePaths);

RoundSchema.methods.submitRound = function() {
    if (this.over) throw new Error('Scorecard has already been submit');
    var unscored = _.find(this.performances, function(performance) {
	// check if any performances haven't been scored
	return !performance.hasOwnProperty('score')
    });
    if (unscored) {
	throw new Error('Hole {0} has no score'.format(unscored.hole.flagNumber));
    }
    this.over = true;
};

RoundSchema.virtual('isOver')
    .get(function() {
	return this.over;
    });

RoundSchema.pre('save', function(next) {
    // If the Round is immutable, raise error pre save
    // Else save and make immutable
    if (this.over) next(new Error('This round is already over and therefore immutable'));
    else {
	this.immutable = true;
	next();
    }
});


mongoose.model('Round', RoundSchema);
exports.RoundSchema = RoundSchema;
