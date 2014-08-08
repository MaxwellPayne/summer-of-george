'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore'),
    async = require('async');

var scoreModels = require('../packages/frolf/server/models/round'),
    courseModels = require('../packages/frolf/server/models/course'),
    playerModels = require('../packages/frolf/server/models/player');


mongoose.model('Round', scoreModels.RoundSchema);
mongoose.model('Player', playerModels.PlayerSchema);
mongoose.model('Course', courseModels.CourseSchema);
mongoose.model('Hole', courseModels.HoleSchema);

var Course = mongoose.model('Course');
var Hole = mongoose.model('Hole');
var Round = mongoose.model('Round');
var Player = mongoose.model('Player');

var NUMBER_HOLES = 18

var c = new Course(
{
    courseName: "Murdoch Park",
    numberOfHoles: NUMBER_HOLES
});

var hs = _.range(1, NUMBER_HOLES + 1);
_.forEach(hs, function(i) {
    c.holes.push(new Hole(
	{
	    par: i
	}));
});

//c.holes = hs;

var r = new Round({
    course: c
});

console.log(c);

_.forEach(c.holes, function(hole) {
    r.scoreOnHole(hole.flagNumber, 2);
});

console.log('round is');
console.log(r);

async.series([
    function(cb) {
	mongoose.connect('mongodb://localhost/sofg-dev', function(err) {
	    if (err) cb(err);
	    else cb();
	});
    },
    function(cb) {
	// remove all models
	Round.remove(true, function(err) {
	    if (err) cb(err);
	    else Hole.remove(true, function(err) {
		if (err) cb(err);
		else Course.remove(true, function(err) {
		    if (err) cb(err);
		    else cb();
		});
	    });
	});
    },
    function(cb) {
	c.save(function(err, course) {
	    if (err) cb(err);
	    else cb(null, course);
	});
    },
    function(cb) {
	var p = Player.findOne(function(err, player) {
	    if (err) cb(err);
	    else {
		// NOTE THE USE OF player.user
		r.player = player.user;
		// save round and, by association course & hole
		r.save(function(err, round) {
		    if (err) cb(err);
		    else cb(null, round);
		});
	    }
	});
    }],
    function(err, results) {
	if (err) console.log(err());
	mongoose.disconnect();
    }
);

