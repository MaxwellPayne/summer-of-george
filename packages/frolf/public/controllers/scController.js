angular.module('sc1', [])
	.controller('scController', ['$scope', function($scope) {
    $scope.players = [];
	$scope.isPlaying = function(p){
	    if (p){
		$scope.players.push({
		    'name': p,
		    'score': []
		});
	    }
	}
	$scope.numOfPlayers = 1; //default
	$scope.p1name = "John"; //default
	$scope.p2name, $scope.p3name, $scope.p4name = "enter name";

	$scope.curPar = function(){
	    return $scope.holes[curHole].par;
	}
	$scope.isNotFirst = function(){
	    return $scope.curHole != 0;
	}
	$scope.isRoundDone = function(){
	    return $scope.curHole < 18;
	}
	$scope.lastHoleVal = function(){
	    if ($scope.curHole === $scope.holes - 1){
	    	return "Submit Round";
	    } else {
		return "Next Hole";
	    }
	}
	$scope.beginRoundClick = function(e) {
		$scope.curHole = 0;
		$scope.curScore = $scope.holes[$scope.curHole].par;
		$scope.isPlaying($scope.p1name);
		$scope.isPlaying($scope.p2name);
		$scope.isPlaying($scope.p3name);
		$scope.isPlaying($scope.p4name);
	}
	$scope.nextHoleClick = function(e) {
    	scope.curHole++;
	    $scope.players[0].score.push($scope.curScore);
	    if ($scope.curHole === $scope.holes.length){ //if it's the last hole of the round, post to server side
			$scope.postRound($scope.players[0]);	
	    }
	    $scope.hasHonors($scope.players[0]. $scope.players[1]);
	    console.log('honors tested');
	}
	//take players as arguments returns the player w/ honors. called at the beginning of a hole
	$scope.hasHonors = function(a, b) {
		for (var i = 0; i < $scope.curHole; i++){
			if (a.score[$scope.curHole - i] < b.score[$scope.curHole - i]){
				return a;
		} else if (a.score[$scope.curHole - i] > b.score[$scope.curHole - i]) {
			return b;
		}
	}
	return a;
	//this is called when the round is done
	$scope.postRound = function(p){
	    var o = {};
	    o.course = $scope.course;
	    o.player = $scope.p1name;
	    o.performance = p.score;
	    o.over = true;
	    console.log('post to the service');
	    var roundResource = new Round(o);
	    roundResource.$save();
	    //$http.post('../../server/controllers/round.js', o);
	    // service would be more effective here
	}
	$scope.lastHoleClick = function(e) {
    	    $scope.curHole--;
	}
	//dummy data
	$scope.course = "Murdock Park";
	$scope.holes = [
	    {
		_holeid: 01,
		par: 3
	    },
	    {
		_holeid: 02,
		par: 3
	    },
	    {
		_holeid: 03,
		par: 3
	    },
	    {
		_holeid: 04,
		par: 3
	    },
	    {
		_holeid: 05,
		par: 3
	    },
	    {
		_holeid: 06,
		par: 3
	    },
	    {
		_holeid: 07,
		par: 3
	    },
	    {
		_holeid: 08,
		par: 3
	    },
	    {
		_holeid: 09,
		par: 3
	    },
	    {
		_holeid: 10,
		par: 3
	    },
	    {
		_holeid: 11,
		par: 4
	    },
	    {
		_holeid: 12,
		par: 3
	    },
	    {
		_holeid: 13,
		par: 3
	    },
	    {
		_holeid: 14,
		par: 3
	    },
	    {
		_holeid: 15,
		par: 3
	    },
	    {
		_holeid: 16,
		par: 3
	    },
	    {
		_holeid: 17,
		par: 4
	    },
	    {
		_holeid: 18,
		par: 3
	    }
	];
    }
	;
    }]
);
