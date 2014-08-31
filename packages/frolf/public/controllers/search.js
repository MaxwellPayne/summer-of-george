angular.module("search", [])
	.controller("searchCtrlr", ['$scope', function($scope){
	$scope.course = ["murdock park", "central park w", "centergrove"];
	$scope.getLocation = function(){
		if (navigator){
			console.log("navigator enabled");
		} else {
			consoe.log('no navigaotr');
		}
	}
	$scope.getLocation();
}
]);
