'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Player = mongoose.model('Player')
    , _ = require('underscore');

exports.create = function(req, res) {
    var player = new Player(req.body);
    console.log("inside exports.create");
player.user = req.user;
console.log(player);
   player.save(function(err, plyr) {
       console.log('saving may be err');
       console.log(err);
	if (err) return err;
       console.log('saved in exports');
    });
    res.jsonp(player);
};

exports.show = function(req, res) {
    // retrieve data for a specific user
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

exports.update = function(req, res) {

};

exports.delete = function(req, res) {

};
