'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Round = mongoose.model('Round')
    , _ = require('underscore');

exports.show = function(req, res) {
    // retrieve data for a specific course
    res.jsonp(req.round);
};

exports.round = function(req, res, next, id) {
    Round.load(id, function(err, round) {
	if (err) next(err);
	else if (!round) next(new Error("cannot find round " + id));
	else {
	    req.round = round;
	    next();
	}
    });
};

exports.all = function(req, res) {
    Round.find(function(err, rounds) {
	if (err) res.send(500, { error: '500' });
	else res.jsonp(rounds);
    });
};

exports.create = function(req, res) {
    // creates a new round and saves it
    var round = new Round(req.body);
    round.save(function(err, rnd) {
	if (err) res.send(500, 'Could not save round');
	else res.jsonp(rnd);
    });
};

exports.ofPlayer = function(req, res) {
    console.log('ofplayer');
    //console.log(req.player.user);
    Round.find({player: req.player.user})
         .populate('performances')
         .exec(function(err, rounds) {
	     if (err) console.log(err);
	     if (err) res.send(500, { error: '500' });
	     else res.jsonp(rounds);
	 });
};
