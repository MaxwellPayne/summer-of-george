'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Outing = mongoose.model('Outing')
    , _ = require('underscore');

exports.show = function(req, res) {
    // retrieve data for a specific outing
    res.jsonp(req.outing);
};

exports.outing = function(req, res, next, id) {
    Outing.load(id, function(err, outing) {
	if (err) next(err);
	else if (!outing) next(new Error("cannot find outing " + id));
	else {
	    req.outing = outing;
	    next();
	}
    });
};

exports.all = function(req, res) {
    Outing.find(function(err, outings) {
	if (err) res.send(500, { error: '500' });
	else res.jsonp(outings);
    });
};

exports.ofPlayer = function(req, res) {
    /*Outing.find({player: req.player.user})
         .populate('performances')
         .exec(function(err, outings) {
	     if (err) console.log(err);
	     if (err) res.send(500, { error: '500' });
	     else res.jsonp(outings);
	     });*/
};
