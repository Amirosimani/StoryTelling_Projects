(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  var svg = d3.select("#chart-4")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleBand().range([20, width]).padding(0.3);
  var yPositionScale = d3.scaleLinear().range([height, 0]);

   d3.queue()
    .defer(d3.csv, "crime-2015.csv")
    .await(ready);

  function ready(error, datapoints) {
    if (error) throw error;

    var nestedByOffense = d3.nest()
      .key(function(d) { return d.Offense; })
      .entries(datapoints)
      .sort(function(a, b) { return a.key - b.key });

    
    var counts = [];

    for (var i = 0; i < nestedByOffense.length; i++) {
      var monthObj = {}
      monthObj['offense'] = nestedByOffense[i].key;
      monthObj['count'] = nestedByOffense[i].values.length;
      counts.push(monthObj);
    }
  
    xPositionScale.domain(counts.map(function(d) { return d.offense; }));
    yPositionScale.domain([0, d3.max(counts, function(d) { return d.count; })]);
 

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xPositionScale));

  // svg.append("g")
  //     .attr("class", "axis axis--y")
  //     .call(d3.axisLeft(yPositionScale).ticks(10, "%"))
  //   .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0)
  //     .attr("dy", "0.71em")
  //     .attr("text-anchor", "end")
  //     .text("Frequency");

    var yAxis = d3.axisLeft(yPositionScale)
      svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + 20 + ",0)")
        .call(yAxis);


 svg.selectAll("bar")
      .data(counts)
    .enter().append("rect")
      .style("fill", "LightSlateGrey")
      .attr("x", function(d) { return xPositionScale(d.offense); })
      .attr("width", xPositionScale.bandwidth())
      .attr("y", function(d) { return yPositionScale(d.count); })
      .attr("height", function(d) { return height - yPositionScale(d.count); });





  }



  
})();