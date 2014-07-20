'use strict';

angular.module('mean.frolf')
    .factory('Players', ['$resource',
	function($resource) {
	    return $resource(
		'frolf/profiles/:userId',
		{
		    userId: '@id'
		    // player.id is actually user._id
		});
	}]);
