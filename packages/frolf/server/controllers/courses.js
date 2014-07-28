'use strict';

var mongoose = require('mongoose')
    , async = require('async')
    , Course = mongoose.model('Course')
    , _ = require('underscore');

exports.show = function(req, res) {
    // retrieve data for a specific course
    res.jsonp(req.course);
};

exports.course = function(req, res, next, id) {
    Course.load(id, function(err, course) {
	if (err) return next(err);
	if (!course) return next(new Error("cannot find course " + id));
	req.course = course;
	next();
    });
};

exports.search = function(req, res, next) {
    var qry = Course.chainQuery();
    if (req.query.hasOwnProperty('name')) qry = qry.matchName(req.query.name);
    var searchParams = {'minavg' : 'gte',
			'maxavg' : 'lte', 
			'bestscore' : 'equals'};
    // all possible search params in req's querystring
    _.forEach(searchParams, function(queryMethod, paramName) {
	if (req.query.hasOwnProperty(paramName)) {
	    qry = qry[method](paramName, req.query[paramName]);
	}
    });
    qry.exec(function(err, courses) {
	if (err) next(err);
	req.courses = courses
    });
};

exports.all = function(req, res) {
    Course.find(function(err, courses) {
	if (err) res.render('error', { status: 500 });
	else res.jsonp(courses);
    });
};
