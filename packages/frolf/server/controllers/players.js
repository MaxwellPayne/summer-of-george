'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Player = mongoose.model('Player')
    , _ = require('underscore');

exports.create = function(req, res) {
    var player = new Player(req.body);
    player.user = req.user;
    player.save();
    res.jsonp(player);
};

exports.show = function(req, res) {
    res.jsonp(req.player);
};

exports.player = function(req, res, next, id) {
    Player.load(id, function(err, player) {
	if (err) return next(err);
	if (!player) return next(new Error("cannot find player " + id));
	req.player = player;
	next();
    });
};

exports.all = function(req, res) {
    Player.find(function(err, players) {
	if (err) res.render('error', {status: 500});
	else res.jsonp(players);
    });
};


