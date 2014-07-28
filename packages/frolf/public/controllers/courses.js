'use strict';

var _ = require('underscore');

angular.module('mean.frolf')
    .controller('CoursesCtrl', ['$scope', '$stateParams', '$location', 'Global', 'Courses',
		function($scope, $stateParams, $location, Global, Courses) {
		    
		    var searchParams = ['name', 'minavg', 'maxavg', 'bestscore'];
		    var _nullallParams = function() {
			_.forEach(searchParams, function(param) {
			    $scope[param] = null;
			});
		    };

		    $scope.search = searchCourses = function() {
			var courses = Courses.get(
			    {
				name: $scope.name,
				minavg: $scope.minavg,
				maxavg: $scope.maxavg,
				bestscore: $scope.bestscore
			    },
			    function(success) {
				$scope.courses = courses;
			    });
			};


		    $scope.all = function() {
			_nullallParams();
			searchCourses();
			};

		    // initialize
		    $scope.global = Global;
		}]);
