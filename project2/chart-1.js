(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 616 - margin.left - margin.right;

  var svg = d3.select("#graphic")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        // .append("g")
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // var svg2 = d3.select("#graphic2")
  //       .append("svg")
  //       .attr("height", height + margin.top + margin.bottom)
  //       .attr("width", width + margin.left + margin.right)
  //       .append("g")
  //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleLinear().range([0, width]).domain([0,6000]),
      yPositionScale = d3.scaleLinear().range([height, 0]).domain([0,1]),
      xUpdated = d3.scaleLinear().range([280,336])
      colorScale = d3.scaleOrdinal().range(["#7d8e74", "#f2e6c6", "#dfae43", "#ccd7dd", "#489eba", "#a15b1c" , "#001126"]);


  d3.queue()
    .defer(d3.csv, "hillary.csv")
    .await(ready);

  function ready(error, datapoints) {
    if (error) throw error;

    var sorted = datapoints.sort(function(a, b) {
        return a.frame_time - b.frame_time;
      })   


	var emotions = datapoints.columns.slice(1).map(function(id) {
	    return {
	      id: id,
	      values: datapoints.map(function(d) {
	        return {frame: d.frame_time, score: d[id]};
	      })
	    };
	});


	colorScale.domain(emotions.map(function(c) { return c.id; }));


 	var circles = g.selectAll(".dots")
	    .data(emotions)
	    .enter().append("g")
	    .attr("class", "dots")
	    .each(function(d) {
	     var g = d3.select(this);
	      	g.selectAll("circle")
	      	  .data(d.values)
	          .enter().append("circle")
	          .attr("class", "dot")
	          .attr("r", 2)
	          .attr("fill", function() { return colorScale(d.id)})
	          .attr("cx", function(d) { return xPositionScale(d.frame)})
	          .attr("cy", function(d) { return yPositionScale(d.score)})
	         // console.log("emotion is", d.id)
	         // console.log("frame time is", d.values)
	      })

	// g.append("g")
 //      .attr("class", "axis axis--x")
 //      .attr("transform", "translate(0," + height + ")")
 //      .call(d3.axisBottom(xPositionScale));

    // g.append("g")
    //   .attr("class", "axis axis--y")
    //   .call(d3.axisLeft(y))
    // .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 6)
    //   .attr("dy", "0.71em")
    //   .attr("fill", "#000")
    //   .text("Emotion Score");


//   d3.select("#slide-2").on('slidein', function() {
//     svg.selectAll(".dots")
//        .each(function(d) {
//           // var classes = this.classList
//           // var circle = d3.select(this)
//           console.log(d)
//               circle.transition()
//               .duration(750)
//               .duration(1000)
//               .attr("cx", 10)
//               .attr("cy", 10)
              
// })
// })

  d3.select("#slide-2").on('slidein', function() {
    svg.selectAll(".dots")
      .each(function(d) {
          var circle = d3.select(this)
          circle.transition()
            .duration(750)
            .attr("r", 10)
      })


})




  }    
})();
