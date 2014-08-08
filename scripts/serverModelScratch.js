
var __test = function() {

var scoreModels = require('../server/models/round'),
    courseModels = require('../server/models/course'),
    playerModels = require('../server/models/player'),
    mongoose = require('mongoose'),
    mongoosePrivatePaths = require('mongoose-private-paths'),
    Schema = mongoose.Schema,
    _ = require('underscore'),
    async = require('async');


mongoose.model('Round', scoreModels.RoundSchema);
mongoose.model('Player', playerModels.PlayerSchema);
mongoose.model('Course', courseModels.CourseSchema);
mongoose.model('Hole', courseModels.HoleSchema);

var TestSchema = new Schema({
    priv: {
	type: Boolean,
	private: true
    }
});

TestSchema.plugin(mongoosePrivatePaths);

mongoose.model('Test', TestSchema);
var Test = mongoose.model('Test');

var T = new Test({
    priv: true
});

var NUM_HOLES = 18;

var Round = mongoose.model('Round'),
    Player = mongoose.model('Player'),
    Course = mongoose.model('Course'),
    Hole = mongoose.model('Hole');

var hs = _.map(_.range(NUM_HOLES), function(e) {return new Hole({par: e});});

var p = new Player({
    shirtSize: 'M'
});

var c = new Course({
    numberOfHoles: NUM_HOLES,
    holes: hs,
    courseName: "Murdoch Park"
});


var round = new Round({
    course: c,
    player: p
});

//round.scoreHole(1, 3);

async.series([
    function(cb) {
	var db = mongoose.connect('mongodb://localhost/sofg-dev');
	cb();
	},
    /*function(cb) {
	c.save(function(err, course) {
	    round.save(function(err, round) {
		cb();
	    });
	});
    },
    function(cb) {
	var rnd = Round.findOne().populate('course').exec(function(err, r) {
	    for (var i = 0, flag = 1; i < NUM_HOLES; i++, flag++) {
		var perf = r.scoreOnHole(flag, 8);
	    }
	    r.submitRound(function(err, perf) {
		if (err) console.log('submiterr');
		if (err) cb(err);
		else cb();
	    });
	});
},
    function(cb) {
	var rnd = Round.findOne().populate('course').exec(function(err, r) {
	    console.log(r);
	    r.save(function(err, result) {
		cb(err, r);
	    });
	    })*/
    function(cb) {
	var x = Round.findOne(function(err, test) {
	    console.log(test.toJSON());
	    cb();
	});
}],
    function(err, results){
	if (err) console.log(err);/*
	console.log('dropping now');
	mongoose.connection.db.dropDatabase(function(err) {
	    console.log('disconnecting now');
	    mongoose.disconnect();
	});*/
    }
);


};

//__test();

