'use strict';

angular.module('mean.frolf').controller('FrolfController', ['$scope', 'Global', 'Frolf',
    function($scope, Global, Frolf) {
        $scope.global = Global;
        $scope.package = {
            name: 'frolf'
        };
    }
]);
