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
		finalScores.sort();
		range.min = min - 1;
		range.max = max + 2;
		return [min, max];
	}
	var finalScoreSpread = getDatasetMinOverall(dataset);
	var w = $('#span').width();//width of the graph
	var barPaddingLeft = $('.tHeader')[2];
	barPaddingLeft = $(barPaddingLeft).width();//width of the row headers
	var barW = $('.scoreCell')[0];
	barW = $(barW).width() + 2;//width of one cell on the scorecard
	var heightK = Math.round(450 / 14);
	$('#chart').css("width", w);
	$('#chart').css("height", 450);
	chartHeight = $('#chart').height();
	
	getCellX = function(n){
		var cur = $('.player0 .scoreCell')[n];
		curX = $(cur).position();
		return curX.left;
	}
	makeTrendlines = function(){
		for (var q = 0; q < dataset.length; q++){
			dataset[q].trendline = [];
			var trendline = [];
			for (var i = 0; i < dataset[q].holes.length - 1; i++){
				var cur = {};
				cur.y1 = chartHeight - ((dataset[q].spread[i] + 3) * heightK);
				cur.y2 = chartHeight - ((dataset[q].spread[i + 1] + 3) * heightK);
				cur.x1 = getCellX(i) - (barPaddingLeft - (barW * 2));
				cur.x2 = getCellX(i + 1) - (barPaddingLeft - (barW * 2));
				trendline.push(cur);
			}
			dataset[q].trendline = trendline;
		}
	};
	makeTrendlines();
		
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
	for (var i = range.min; i < range.max + 2; i++){
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
		.text(function(d){
			var d = d - 3;
				if (d == 0){
					return "even"
				} else if (d >= 1){
					return "+ " + d;
				} else {
					return "- " + d;
				}
			})
		.attr("font-size", "24px")
		.attr("x", 10)
		.attr("y", function(d){return chartHeight - (d * heightK) -10});
	
	d3.select("#chart")
	.selectAll("#x lines")
	.data(course)
	.enter().append("line")
		.attr("y1", 0)
		.attr("y2", w)
		.attr("x1", function(d, i){
			return  getCellX(i) - (barPaddingLeft - (barW * 2));
		})
		.attr("x2", function(d, i){
			return getCellX(i) - (barPaddingLeft - (barW * 2));
		})
		.attr("stroke", "black")
		.attr("stroke-width", "2px")
		.attr("opacity", 0.5);

	fillLines = function() {
		for (var i = 0; i < dataset.length; i++){		
			d3.select("#chart")
			.selectAll("line .trend")
			.data(dataset[i].trendline)
			.enter().append("line")
				.attr("class", "trend")
				.attr("x1", function(d){return d.x1})
				.attr("x2", function(d){return d.x2})
				.attr("y1", function(d){return d.y1})
				.attr("y2", function(d){return d.y2})
				.attr("stroke", "black")
				.attr("stroke-width", "4px")
				.attr("class", "trendline" + i)
				.attr("stroke-dasharray", "5, 5");
			}
	}
	fillLines();
	
	
	fillcircles = function(n) {
		d3.select("#chart")
		.selectAll(".set" + n)
		.data(dataset[n].spread)
		.enter().append("circle")
			.attr("cx", function(d, i)
				{	
					return getCellX(i) - (barPaddingLeft - (barW * 2));
				}
				)
			.attr("cy", function(d)
			{	
				return chartHeight - ((d + 3) * heightK);
			}
				)
			.attr("r", 10)
			.attr("class", function(){return "set" + n})
			.attr("fill", function(){return colorsets[n].main})
			.attr("opacity", .8);
			}
//call fillCircles for each players
for (var i = 0; i < dataset.length; i++){
	fillcircles(i);
}

makeLegend = function(){
	//draw the legend box
	d3.select("#chart")
	.selectAll("rect")
	.data(dataset)
	.enter().append("rect")
	.attr("class", "legend")
	.attr("fill", "white")
	.attr("width", 200)
	.attr("height", 125)
	.attr("x", 100)
	.attr("y", 20)
	.attr("stroke", "black")
	.attr("stroke-width", "2px");
	//wrilte the player names
	d3.select("#chart")
	.selectAll("text .legend")
	.data(dataset)
	.enter().append("text")
	.attr("class", "legend")
	.text(function(d){return "player: " + d._userid})
	.attr("x", 115)
	.attr("y", function(d, i){return 50 + (i * 25)})
	.attr("fill", function(d, i){return colorsets[i].main});
	
}
makeLegend();

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
