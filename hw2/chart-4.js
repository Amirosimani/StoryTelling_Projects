// Amir Imani ai2335
// Sep 20 2016


(function() {
	var data = [
		{ name:"Susu", animal:"dog", favorite_food:"cats", age:4, lbs:40, times_arrested:3},
		{ name:"Puddin", animal:"dog", favorite_food:"pizza", age:10, lbs:50, times_arrested:2},
		{ name:"Max", animal:"dog", favorite_food:"cats", age:3, lbs:7, times_arrested:20},
		{ name:"Benny", animal:"cat", favorite_food:"cat food", age:1, lbs:3, times_arrested:0},
		{ name:"Mylo", animal:"cat", favorite_food:"cat food", age:10, lbs:9, times_arrested:1},
		{ name:"Mavis", animal:"cat", favorite_food:"pizza", age:13, lbs:12, times_arrested:1},
		{ name:"Libby", animal:"dog", favorite_food:"cat food", age:4, lbs:10, times_arrested:12}
	];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 4");

	var svg = d3.select("#chart-4")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.top + "," + margin.left + ")");

	// Create any scales you might need
var xScale = d3.scaleLinear().domain([0,50]).range([margin.left, width]);	

var yScale = d3.scalePoint().domain(["dog","cat"]).range([125,275])

var colorScale = d3.scaleLinear().domain([0,20]).range(['#e9f6fb',' #0b3241'])

	// Create and style your elements
svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cy", function(d) {
		return yScale(d.animal)
	})
	.attr("cx", function(d) {
		return xScale(d.lbs);
	})
	.attr("r", 10)
	.attr("fill", function(d) {
		return colorScale(d.times_arrested)
	})

})();