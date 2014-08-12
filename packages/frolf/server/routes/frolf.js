'use strict';

var players = require('../controllers/players')
    , courses = require('../controllers/courses')
    , rounds = require('../controllers/rounds')
    , outings = require('../controllers/outings')
    , mongoose = require('mongoose');

// The Package is past automatically as first parameter
module.exports = function(Frolf, app, auth, database) {

    // params

    var roundIdParam = '/:roundId';
    app.param(roundIdParam.replace('/:', ''), rounds.round);

    var userIdParam = '/:userId';
    app.param(userIdParam.replace('/:', ''), players.player);

    var outingIdParam = '/:outingId';
    app.param(outingIdParam.replace('/:', ''), outings.outing);


    var FROLF_ROOT = '/frolf';

    app.get(FROLF_ROOT + '/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get(FROLF_ROOT + '/example/auth', auth.requiresLogin, function(req, res, next) {
	console.log(mongoose.connection);
        res.send('Only authenticated users can access this');
    });

    app.get(FROLF_ROOT + '/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });
    
    app.get(FROLF_ROOT + '/example/render', function(req, res, next) {
        Frolf.render('index', {
            package: 'frolf'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    // player profiles
    var PROFILE_EXTENSION = '/profiles';
    var PROFILE_ROOT = FROLF_ROOT + PROFILE_EXTENSION;

    app.route(PROFILE_ROOT)
        .get(players.all)
        .post(auth.requiresLogin, players.create);

    app.route(PROFILE_ROOT + userIdParam)
        .get(players.show)
        .put(auth.requiresLogin, players.update)
        .delete(auth.requiresLogin, players.delete);

    

    // courses
    var COURSE_EXTENSION = '/courses';
    var COURSE_ROUTE = FROLF_ROOT + COURSE_EXTENSION;

    app.route(COURSE_ROUTE)
        .get(courses.all);

    app.route(COURSE_ROUTE + '/search')
	.get(courses.search);

    // rounds
    var ROUND_EXTENSION = '/rounds';
    var ROUND_ROOT = FROLF_ROOT + ROUND_EXTENSION;

    app.route(ROUND_ROOT)
    .get(rounds.all);

    app.route(ROUND_ROOT + roundIdParam)
    .get(rounds.show);

    app.route(FROLF_ROOT + PROFILE_EXTENSION + userIdParam + ROUND_EXTENSION)
    .get(rounds.ofPlayer);

    // outings
    var OUTING_EXTENSION = '/outings';
    var OUTING_ROOT = FROLF_ROOT + OUTING_EXTENSION;

    app.route(OUTING_ROOT)
    .get(outings.all);

    app.route(OUTING_ROOT + outingIdParam)
    .get(outings.show);
    
};

// la cabrera - 40% off from 7-8 pm
// Silicon Valley HBO
