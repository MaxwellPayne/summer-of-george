'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Player = mongoose.model('Player')
    , _ = require('underscore');

exports.create = function(req, res) {
    var player = new Player(req.body);
    player.user = req.user;
    player.save(function(err, plyr) {
	if (err) return err;
    });
    res.jsonp(player);
};

exports.show = function(req, res) {
    // retrieve data for a specific user
    res.jsonp(req.player);
};

exports.player = function(req, res, next, id) {
    console.log('players.player');
    Player.load(id, function(err, player) {
	if (err) return next(err);
	if (!player) return next(new Error("cannot find player " + id));
	req.player = player;
	console.log(req.player);
	next();
    });
};

exports.currentPlayer = function(req, res, next) {
    var currentUserId = req.user._id;
    exports.player(req, res, next, currentUserId);
};

exports.all = function(req, res) {
    Player.find(function(err, players) {
	if (err) res.render('error', {status: 500});
	else res.jsonp(players);
    });
};

exports.update = function(req, res) {

};

exports.delete = function(req, res) {

};
