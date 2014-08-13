angular.module('postRound', [])
	.controller('pRoundCtrlr', ['$scope',  function($scope){
		$scope.user = "John";
		$scope.getCellClass = function(n){
			var classes = ["minusTwo", "minusOne", "even", "plusOne", "plusTwo"];
			var index = 2 + $scope.round.holes[n].score - $scope.course[n].par;
			return classes[index] + " strongTitle";
		};
		$scope.parseTimestamp = function(){
			var d = new Date($scope.round.timestamp);
			var month = new Array();
				month[0] = "January";
				month[1] = "February";
				month[2] = "March";
				month[3] = "April";
				month[4] = "May";
				month[5] = "June";
				month[6] = "July";
				month[7] = "August";
				month[8] = "September";
				month[9] = "October";
				month[10] = "November";
				month[11] = "December";
			$scope.round.month = month[d.getMonth()];
			$scope.round.date = d.getDate();
			$scope.round.year = d.getYear();
		};
		$scope.renderDate = function(){
			var t = "";
			var n = new Date(Date.now());
			n = n.getYear();
			if ($scope.round.year === n){
				t += $scope.round.month + " " + $scope.round.date;
				return t;
			}
		}
		//dummy data to be wired to round request
		$scope.round = {
					_userid: 00000001,
					_courseid: 00000004,
					_coursename: "Murdock Park",
					timestamp: 1407899742892,
					holes: [
					{
						_holeid: 01,
						score: 4
					},
					{
						_holeid: 02,
						score: 3
					},
					{
						_holeid: 03,
						score: 3
					},
					{
						_holeid: 04,
						score: 2
					},
					{
						_holeid: 05,
						score: 3
					},
					{
						_holeid: 06,
						score: 4
					},
					{
						_holeid: 07,
						score: 6
					},
					{
						_holeid: 08,
						score: 3
					},
					{
						_holeid: 09,
						score: 3
					},
					{
						_holeid: 10,
						score: 2
					},
					{
						_holeid: 11,
						score: 4
					},
					{
						_holeid: 12,
						score: 3
					},
					{
						_holeid: 13,
						score: 4
					},
					{
						_holeid: 14,
						score: 3
					},
					{
						_holeid: 15,
						score: 3
					},
					{
						_holeid: 16,
						score: 3
					},
					{
						_holeid: 17,
						score: 5
					},
					{
						_holeid: 18,
						score: 3
					}
				],
			};
			//dummy data to be wired to course request
		$scope.course = [
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
	}]
	);
