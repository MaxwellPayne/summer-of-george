'use strict';

angular.module('mean.frolf')
    .controller('PlayersController', ['$scope', '$stateParams', '$location', 'Global', 'Players',
		function($scope, $stateParams, $location, Global, Players) {
		    $scope.global = Global;

		    var currentId = $scope.global.user._id;

		    var _getCurrentPlayer = function() {
			// attempt to get current player
			var deferredPlayer = Players.get(
			    {userId: currentId},
			    function(success) {
				$scope.player = deferredPlayer;
			    });
			return deferredPlayer;
		    };

		    $scope.setPlayer = function() {
			var playerRequest = _getCurrentPlayer();

			playerRequest.$promise.catch(function(err) {
			    if (err.status === 500) {
				console.log(err);
				var savedPlayer = Players.save(
				    {userId: currentId},
				    function() {
					console.log(savedPlayer);
					$scope.player = savedPlayer;
					console.log(playerRequest);
				    });
			    }
					

			//console.log(playerRequest);
			});
		    };
		}]);

