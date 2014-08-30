$(function(){
	var dataset = window.outing.performances;
	var course = window.course
	var range = {};
	//sort for min
	getDatasetMin = function(d){
		var min = d[0].holes[0].score;
		var max = d[0].holes[0].score;
		for (var q = 0; q < d.length; q++){
			for (var i = 0; i < d[0].holes.length; i++){
				if (d[q].holes[i].score < min){
					min = d[q].holes[i].score;
				}
				if (d[q].holes[i].score > max){
					max = d[q].holes[i].score;
				}
			}
		}
		range.min = min;
		range.max = max;
	};
	getDatasetMinOverall = function(d){
		var finalScores = [];
		var max = 0;
		var min = 0;
		for (var q = 0; q < d.length; q++){
			dataset[q].spread = [];
			var cur = 0;
			for (var i = 0; i < d[0].holes.length; i++){
				cur += d[q].holes[i].score - course[i].par;
				dataset[q].spread.push(cur);
				if (cur < min){
					min = cur;
				}
				if (cur > max){
					max = cur;
				}
			}
			finalScores.push(cur);
		}
		console.log(max + " / " + min);
		finalScores.sort();
		range.min = min;
		range.max = max;
		return [min, max];
	}
	var lines = [];
	var finalScoreSpread = getDatasetMinOverall(dataset);
	var w = $('#span').width();//width of the graph
	var barPaddingLeft = $('.tHeader')[2];
	barPaddingLeft = $(barPaddingLeft).width();//width of the row headers
	var barW = $('.scoreCell')[0];
	barW = $(barW).width();//width of one cell on the scorecard

	var heightK = Math.round(300 / range.max - range.min);
	$('#chart').css("width", w);
	$('#chart').css("height", 300);
	chartHeight = $('#chart').height();
	
	var colorsets = [
		{
			main: "#FF83DD",
			accent: "#FFA240"
		},
		{
			main: "#B40097",
			accent: "#D2FA3E"
		},
		{
			main: "#B7F200",
			accent: "#BFB830",
		}
	];

var getBarColor = function(n) {
	switch (n){
		case 0: return "yellow";
			break;
		case -1: return "green";
			break;
		case 1: return "orange";
			break;
		default: return "red";
	}
};
//draw the line graph
var drawGraphB = function(){
	var lines = [];
	for (var i = range.min; i < range.max; i++){
		lines.push(i);
	}	
	console.log(lines);
	d3.select("#chart")
	.selectAll("line")
	.data(lines)
	.enter().append("line")
		.attr("x1", 0)
		.attr("y1", function(d){return chartHeight - (d * heightK) })
		.attr("x2", w)
		.attr("y2", function(d){return chartHeight - (d * heightK) })
		.attr("stroke", "black")
		.attr("stroke-width", "2px")
		.attr("opacity", .20);
	//console.log(dataset[0].spread);
	
	d3.select("#chart")
	.selectAll("text")
	.data(lines)
	.enter().append("text")
		.text(function(d){return "+ " + lines[d]})
		.attr("font-size", "24px")
		.attr("x", 10)
		.attr("y", function(d){return chartHeight - (d * heightK) -10});
	
	d3.select("#chart")
	.selectAll("#x lines")
	.data(course)
	.enter().append("line")
		.attr("y1", 0)
		.attr("y2", w)
		.attr("x1", function(d){
			return barPaddingLeft + parseInt(d._holeid) * barW;
		})
		.attr("x2", function(d){
			return barPaddingLeft + parseInt(d._holeid) * barW;
		})
		.attr("stroke", "black")
		.attr("stroke-width", "2px")
		.attr("opacity", 0.5);
	
	var trendline = [];
	for (var i = 0; i < dataset[0].holes - 1; i++){
		
	}
		
	fillLines = function(n) {
		d3.select("#chart")
		.selectAll("line .trend")
		.
	}
	
	fillcircles = function(n) {
		d3.select("#chart")
		.selectAll(".set" + n)
		.data(dataset[n].spread)
		.enter().append("circle")
			.attr("cx", function(d, i)
				{	
					var offset = n * 2;
					return barPaddingLeft +  (i * barW) - offset;
				}
				)
			.attr("cy", function(d)
			{	
				var offset = n * 3;
				return chartHeight - (d * heightK) - offset;
			}
				)
			.attr("r", 10)
			.attr("class", function(){return "set" + n})
			.attr("fill", function(){return colorsets[n].main})
			.attr("opacity", .8);
}
fillcircles(0);
fillcircles(1);
fillcircles(2);
};
drawGraphB();
//draw the histogram
/*
var drawGraphA = function(){
	var lines = [];
	
	for (var i = 1; i < (range.max - range.min) + 3; i++){
		lines.push(i);
	}
	
	
	d3.select("#chart")
	.selectAll("line")
	.data(lines)
	.enter().append("line")
		.attr("x1", 0)
		.attr("y1", function(d){return chartHeight - (d * heightK) })
		.attr("x2", w)
		.attr("y2", function(d){return chartHeight - (d * heightK) })
		.attr("stroke", "black")
		.attr("stroke-width", "2px")
		.attr("opacity", .20);
	
	d3.select("#chart")
	.selectAll("text")
	.data(lines)
	.enter().append("text")
		.text(function(d){return lines[d]})
		.attr("x", 10)
		.attr("y", function(d){return chartHeight - (d * heightK) });
	
	fillcircles = function(n) {
		d3.select("#chart")
		.selectAll(".set" + n)
		.data(dataset[n].holes)
		.enter().append("circle")
			.attr("cx", function(d)
				{	
					var offset = n * 2;
					return barPaddingLeft + (parseInt(d._holeid) * barW) - offset;
				}
				)
			.attr("cy", function(d)
			{	
				var offset = n * 3;
				return chartHeight - (d.score * heightK) - offset;
			}
				)
			.attr("r", 10)
			.attr("class", function(){return "set" + n})
			.attr("fill", function(){return colorsets[n].main})
			.attr("opacity", .8);
}
	for (var i = 0; i < dataset.length; i++){
		fillcircles(i);
	}
};
*/
});
