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
	if (!round) next(new Error("cannot find round " + id));
	req.round = round;
	next();
    });
};

exports.all = function(req, res) {
    Round.find(function(err, rounds) {
	if (err) res.render('error', { status: 500 });
	else res.jsonp(rounds);
    });
};

exports.ofPlayer = function(req, res, userId) {
    Round.find({player: userId})
         .populate('performances')
         .exec(function(err, rounds) {
	     if (err) res.render('error', { status: 500 });
	     else res.jsonp(rounds);
	 });
};
