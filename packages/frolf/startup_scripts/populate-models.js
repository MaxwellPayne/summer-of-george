'use strict';

var mongoose = require('mongoose'),
    _ = require('underscore');

var Course = mongoose.model('Course');
var Hole = mongoose.model('Hole');
var c = new Course(
{
    courseName: "Murdoch Park",
    numberOfHoles: 18
});

var hs = _.range(0,18);
_.forEach(hs, function(i) {
    hs[i] = new Hole(
	{
	    par: i
	});
});

c.holes = hs;


Course.remove(true, function(err) {
    c.save(function(err, docs) {
	if (err) console.log(err);
    });
});
