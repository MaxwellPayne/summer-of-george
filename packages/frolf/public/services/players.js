'use strict';

angular.module('mean.frolf')
    .factory('Players', ['$resource',
	function($resource) {
	    return $resource(
		'players/:userId',
		{
		    userId: '@id'
		    // player.id is actually user._id
		});
	}]);
