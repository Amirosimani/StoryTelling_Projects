// Amir Imani ai2335
// Sep 20 2016

// innocent: [0],rookie: [1,10],crook: [10,15], master_criminal; [15,20]

(function() {
	var data = [
		{ animal:"dog", status:"rookie", number: 4},
		{ animal:"dog", status:"rookie", number: 4},
		{ animal:"dog", status:"master_criminal", number: 1},
		{ animal:"cat", status:"innocent", number: 1},
		{ animal:"cat", status:"rookie", number: 4},
		{ animal:"cat", status:"rookie", number: 4},
		{ animal:"dog", status:"crook", number: 1}
	];

	var margin = { top: 30, left: 30, right: 30, bottom: 30},
		height = 400 - margin.top - margin.bottom,
		width = 780 - margin.left - margin.right;

	console.log("Building chart 6");

	var svg = d3.select("#chart-6")
				.append("svg")
				.attr("height", height + margin.top + margin.bottom)
				.attr("width", width + margin.left + margin.right)
				.append("g")
				.attr("transform", "translate(" + margin.top + "," + margin.left + ")");

	// Create any scales you might need
var yScale = d3.scalePoint().domain(["dog", "cat"]).range([125, 275]);	

var xScale = d3.scalePoint().domain(["innocent","rookie", "crook", "master_criminal"]).range([margin.left, width])

var colorScale = d3.scaleLinear().domain([0,5]).range(['beige',' red'])


var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	// Create and style your elements
svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.attr("cy", function(d) {
		return yScale(d.animal)
	})
	.attr("cx", function(d) {
		return xScale(d.status);
	})
	.attr("r", 10)
	.attr("fill", function(d) {
		return colorScale(d.number)
	})

})();