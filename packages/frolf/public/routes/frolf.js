'use strict';

angular.module('mean.frolf').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('frolf example page', {
            url: '/frolf/example',
            templateUrl: 'frolf/views/index.html'
        });

	$stateProvider.state('test the stateProvider', {
	    url: '/frolf/profiles',
	    templateUrl: 'frolf/views/players/profile.html'
	});
	
	$stateProvider.state('player create test', {
	    url: '/frolf/profiles/:userId/create',
	    templateUrl: 'frolf/views/players/profile.html'
	});

	$stateProvider.state('list search courses', {
	    url: '/frolf/courses',
	    templateUrl: 'frolf/views/courses/list.html'
	});

	$stateProvider.state('outing of rounds', {
	    url: '/frolf/outings/outingId',
	    // outingId should actually be parameter
	    // for now is static b/c controller using dummy data
	    templateUrl: 'frolf/views/round.html'
	});

    }
]);
