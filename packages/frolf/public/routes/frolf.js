'use strict';

angular.module('mean.frolf').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('frolf example page', {
            url: '/frolf/example',
            templateUrl: 'frolf/views/index.html'
        });
    }
]);
