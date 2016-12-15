(function() {
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  var svg = d3.select("#squares")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.queue()
    .defer(d3.csv, "data/listings_dummy.csv", function(d, i) {
      d.index = i;
      return d;
    })
    .await(ready)

  function ready (error, datapoints) {

    svg.selectAll(".squares")
      .data(datapoints, function(d) {
        // this is a UNIQUE IDENTIFIER for
        // that particular row so that
        // d3 can keep track of it
        return d.index
      })
      .enter().append("rect")
      .attr("height", 15)
      .attr("width", 15)
      .attr("y", function(d, i) {
        return 18 * parseInt(i / 20);
      })
      .attr("x", function(d, i) {
        return 18 * (i % 20);
      })
      .attr("fill", "#c4cfcf")


    }

})();