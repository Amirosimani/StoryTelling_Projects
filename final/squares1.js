(function() {
  var margin = {top: 50, right: 100, bottom: 10, left: 10},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var svg = d3.select("#squares")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.queue()
    .defer(d3.csv, "data/listings.csv", function(d, i) {
      d.index = i;
      return d;
    })
    .await(ready)

  function ready (error, datapoints) {

    svg.selectAll(".hosts")
      .data(datapoints, function(d) {
        return d.index
      })
      .enter().append("circle")
      .attr("r", 2)
      .attr("cy", function(d, i) {
        return 5 * parseInt(i / 200);
      })
      .attr("cx", function(d, i) {
        return 5 * (i % 200);
      })

    d3.select("#reverse-svg").on('click', function() {
      // reverse all of our data points
      var reversed = datapoints.reverse()

      // rebind the data
      // then use 'i' to reposition them with their new index
      // the point that was 10,000 is now 0, and 0 is now 10,000
      svg.selectAll("circle")
        .data(reversed, function(d) {
          // this is a UNIQUE IDENTIFIER for
          // that particular row so that
          // d3 can keep track of it
          return d.index
        })
        .transition()
        .duration(2500)
        .attr("cy", function(d, i) {
          return 5 * parseInt(i / 200);
        })
        .attr("cx", function(d, i) {
          return 5 * (i % 200);
        })

    })
  }

})();