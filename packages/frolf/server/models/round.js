'use strict';


var mongoose = require('mongoose')
    , util = require('util')
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

var MAXIMUM_SCORE = 8;

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
		type: Number,
		max: MAXIMUM_SCORE,
		min: 1
	    }
	}]
    },
    over: {
	type: Boolean,
	default: false
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

RoundSchema.methods.scoreOnHole = function(flagNumber, setScore) {
    var index = flagNumber - 1
        , perf = undefined;
    if (flagNumber > 0 && index < this.performances.length) {
	perf = this.performances[index];
    }
    else throw new Error('Hole number ' + flagNumber + ' does not exist');

    if ( (setScore | 0 ) === setScore ) {
	// if set score is an integer, set the score
	perf.score = setScore;
    }
    return perf.score;
};

RoundSchema.methods.submitRound = function(next) {
    if (this.over) next(new Error('Scorecard has already been submit'));
    
    for (var i = 0, flag = 1; i < this.performances.length; i++, flag++) {
	// if any performance is not scored, call with error
	if (! (_.has(this.performances[i].toObject(), 'score')) ) {
	    next(new Error(util.format('Hole %d has no score', flag)));
	}  
    }
    // mark the round as over and save, making it immutable
    this.over = true;
    this.save(function(err, self) {
	if (err) next(err);
	else next(null, self);
    });
};

RoundSchema.statics = {
    load: function(roundId, cb) {
	return this
	           .findOne({ _id: roundId })
	           .populate('course')
	           .exec(cb);
    }
};



RoundSchema.pre('save', function(next) {
    // If the Round is immutable, raise error pre save
    // Else save and make immutable
    if (this.immutable) {
	next(new Error('This round is already over and therefore immutable'));
    }
    else if (this.over) {
	this.immutable = true;
	}
	next();
});



mongoose.model('Round', RoundSchema);
exports.RoundSchema = RoundSchema;

