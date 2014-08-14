angular.module('mean.frolf')
    .factory('Round', ['$resource',
			function($resource) {
			    return $resource(
				'/frolf/rounds'
				// post a round as-is, _id created on server side
				);
			}]);
