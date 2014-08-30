$(function(){
	var dataset = window.round.holes;
	var w = $('#span').width();
	var barW = $('.scoreCell')[0];
	var barPaddingLeft = $('.tHeader')[2];
	barPaddingLeft = $(barPaddingLeft).width();
	barW = $(barW).width();
	var heightK = Math.round(300 / 10);
	console.log(heightK);
	$('#chart').css("width", w);
	$('#chart').css("height", 10 * heightK);
	chartHeight = $('#chart').height();



var x = d3.scale.linear()
    .domain([0, 6])
    .range([0, 6]);
    
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

d3.select("#chart")
  .selectAll("rect")
    .data(dataset)
  .enter().append("rect")
    .attr("x", function(d){ return barPaddingLeft + (d._holeid * (barW + 2)) + "px"})
    .attr("height", function(d){return d.score * heightK})
    .attr("width", barW + "px")
    .attr("fill", function(d){return getBarColor(d.score - 3);})
    .attr("y", function(d){return chartHeight - (d.score * heightK)});
    
    d3.select("#chart")
  .selectAll("text")
    .data(dataset)
  .enter().append("text")
	.text(function(d){return d.score})
    .attr("x", function(d){ return barPaddingLeft + (d._holeid * (barW + 2)) + (barW/2 - 10) + "px"})
    .attr("fill", function(d){return getBarColor(d.score - 3);})
	.attr("fill", function(d){return getBarColor(d.score - 3);})
    .attr("y", function(d){return chartHeight - (d.score * heightK) - 10})
	.attr("font-size", barW + "px");
	
	var lines = [1, 2, 3, 4, 5, 6];
	
	d3.select("#chart")
	.selectAll("line")
	.data(lines)
	.enter().append("line")
		.attr("x1", 0)
		.attr("y1", function(d){return 300 - (d * heightK) })
		.attr("x2", w)
		.attr("y2", function(d){return 300 - (d * heightK) })
		.attr("stroke", "black")
		.attr("stroke-width", "2px")
		.attr("opacity", .20);
});
