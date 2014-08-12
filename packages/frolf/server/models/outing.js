'use strict';


var mongoose = require('mongoose')
    , mongoosePrivatePaths = require('mongoose-private-paths')
    , _ = require('underscore')
    , Schema = mongoose.Schema
    , RoundSchema = require('./round.js').PlayerSchema;


var OutingSchema = new Schema({
	rounds: {
	    type: [RoundSchema]
	},
  	date: {
	    type: Date
	},
	course: {
	    type: Schema.ObjectId,
	    ref: 'Course'
	}
    });

//OutingSchema.plugin(mongoosePrivatePaths);

OutingSchema.virtual('isOver')
    .get(function() {
	    return _.all(this.rounds, function(round) {
		    return round.over;
		});
	})
    .set(function(isOverBool) {
	    if (isOverBool) {
		_.forEach(this.rounds, function(round) {
			if (!round.over) {
			    // submit the round if it isn't already over
			    round.submitRound();
			}
		    });
	    }
	    else {
		// NOT IMPLEMENTED
		// user is trying to undo the suibmission of
		// all the rounds. As of right now, round submission
		// is impossible because records are immutable after
		// they have been submit
		throw new Error('Setting round over to false not implemented');
	    }
	});

OutingSchema.virtual('players')
    .get(function() {
	    return _.map(this.rounds, function(round) {
		    return round.player;
		});
	});

OutingSchema.statics = {
    load: function(outingId, next) {
	this.findOne({ _id: outingId })
	.populate('rounds')
	.exec(next);
    }
};

OutingSchema.pre('save', function(next) {
	var noWrongCourses = _.all(this.rounds, function(round) {
		return (typeof round.course === 'undefined'
			|| round.course == this.course);
	    });
	if (noWrongCoruses) next();
	else next(new Error('Round specifies different course than outing.'));
 });

mongoose.model('Outing', OutingSchema);
exports.OutingSchema = OutingSchema;

