'use strict';

//var _ = require('underscore');

angular.module('mean.frolf')
    .controller('CoursesCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Courses',
		function($scope, $stateParams, $location, Global, Courses) {
		    
		    var searchParams = ['name', 'minavg', 'maxavg', 'bestscore'];
		    var _nullallParams = function() {
			for (var p in searchParams) {
			    $scope[searchParams[p]] = null;
			}
		    };

		    $scope.search = function() {
			var courses = Courses.query(
			    {
				name: $scope.name,
				minavg: $scope.minavg,
				maxavg: $scope.maxavg,
				bestscore: $scope.bestscore
			    },
			    function(success) {
				$scope.courses = courses;
				console.log(courses);
			    },
			    function(err) {
				console.log('CoursesCtrl err ' + JSON.stringify(err));
			    }
			);
		    };


		    $scope.all = function() {
			_nullallParams();
			$scope.search();
			};

		    // initialize
		    $scope.global = Global;
		    $scope.courses = [];
		}]);
