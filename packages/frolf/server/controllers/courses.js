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
	if (err) next(err);
	if (!course) next(new Error("cannot find course " + id));
	req.course = course;
	next();
    });
};

exports.search = function(req, res) {
    console.log('courses search');
    var qry = Course.chainQueries();
    console.log(req.query);
    if (req.query.hasOwnProperty('name')) qry = qry.matchName(req.query.name);
    var searchParams = {'minavg' : 'gte',
			'maxavg' : 'lte', 
			'bestscore' : 'equals'};
    // all possible search params in req's querystring
    _.forEach(searchParams, function(queryMethod, paramName) {
	if (req.query.hasOwnProperty(paramName)) {
	    qry = qry[queryMethod](paramName, req.query[paramName]);
	}
    });

    //mongoose.connection.open('mongodb://localhost/sofg-dev');
    //console.log(mongoose.connection);
    
    qry.exec(function(err, courses) {
	console.log('YAY');
	if (err) return err;
	res.jsonp(courses);
    });
    
};

exports.all = function(req, res) {
    Course.find(function(err, courses) {
	if (err) res.render('error', { status: 500 });
	else res.jsonp(courses);
    });
};
