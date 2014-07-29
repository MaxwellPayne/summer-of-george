'use strict';

angular.module('mean.frolf')
    .factory('Courses', ['$resource',
	function($resource) {
	    return $resource(
		'frolf/courses/search',
		{
		    name: '@name',
		    minavg: '@minavg',
		    maxavg: '@maxavg',
		    bestscore: '@bestscore'
		}
	    );
	}]);
