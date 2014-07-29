'use strict';

var players = require('../controllers/players');
var courses = require('../controllers/courses');

// The Package is past automatically as first parameter
module.exports = function(Frolf, app, auth, database) {

    app.get('/frolf/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/frolf/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/frolf/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/frolf/example/render', function(req, res, next) {
        Frolf.render('index', {
            package: 'frolf'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    // player profiles
    app.route('/frolf/profiles')
        .get(players.all)
        .post(auth.requiresLogin, players.create);

    app.route('/frolf/profiles/:userId')
        .get(players.show)
        .put(auth.requiresLogin, players.update)
        .delete(auth.requiresLogin, players.delete);

    app.param('userId', players.player);

    // courses
    app.route('/frolf/courses')
        .get(courses.all);

    app.route('/frolf/courses/search')
	.get(courses.search);

    app.route('/frolf/courses/:courseId', courses.course);


};

// la cabrera - 40% off from 7-8 pm
