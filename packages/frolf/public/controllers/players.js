'use strict';

angular.module('mean.frolf')
    .controller('PlayerController', ['$scope', '$stateParams', '$location', 'Global', 'Players',
		function($scope, $stateParams, $location, Global, Players) {
		    $scope.global = Global;

		    $scope.create = function() {
			if ($scope.global.authenticated) {
			    var thisPlayer = Players.get(
				{id: $scope.global.user._id},
				function() {
				    // callback after gotten
				    console.log("thisPlayer: " + thisPlayer);
				    
				});
			}
			else {
			    console.log("PLAYER CONTROLLER NOT AUTH");
			}};
		}]);

