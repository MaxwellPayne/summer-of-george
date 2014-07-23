'use strict';

var mongoose = require('mongoose')
    , env = process.env.NODE_ENV || 'development'
    //, config = require('../config')
    , Schema = mongoose.Schema
    , PlayerSchema = require('./player.js').PlayerSchema
    , CourseSchema = require('./course.js').CourseSchema
    , HoleSchema = require('./course.js').HoleSchema;

var HolePerformanceSchema = new Schema(
// a player's score on a given hole
// PRIVATE to ScorecardSchema because HolePerformance
// is only unique when related to a Scorecard
    {
	player: {
	    type: Schema.ObjectId,
	    ref: 'Player'
	},
	score: {
	    type: Number
	},
	hole: {
	    type: Schema.ObjectId,
	    ref: 'Hole'
	}
    },
    { id: false }
    // hide id because HolePerformance should
    // be accessed through Scorecard, never directly
);


var ScorecardValidators = {
    partySize: function(players) {
	return (players.length > 0 && players.length < 5);
    }
};

var ScorecardSchema = new Schema({
// A party of Players record HolePerformances
// for each hole on a Course on a given date
    course: {
	type: Schema.ObjectId,
	ref: 'Course'
    },
    party: {
	type: [PlayerSchema],
	default: [],
	validate: [
	    ScorecardValidators.partySize,
	    'party must be between 1 and 4 players'
	]
    },
    performances: {
	type: [HolePerformanceSchema]
	},
    date: {
	type: Date
	}
});

// Debatably overprotective
ScorecardSchema.pre('save', function(next) {
// for every performance:
// 1) player must be a member of the party
// 2) hole must be part of the scorecard's course
    var possibleErr;
    for (var i = 0; i < this.performances.length; i++) {
	var perf = this.performances[i];
	if (!
	(perf.player in this.party && perf.hole in this.course.holes)) {
	    console.log('ERROR caused by:');
	    console.log(perf.player);
	    possibleErr = new Error('performance does not reference course && party');
	    break;
	}
    }
    next(possibleErr);
});

mongoose.model('Scorecard', ScorecardSchema);

exports.ScorecardSchema = ScorecardSchema;
