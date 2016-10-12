(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  var svg = d3.select("#chart-2")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleLinear().range([20, width]).domain([1,12]);
  var yPositionScale = d3.scaleLinear().range([height, 0]).domain([0,7000]);

  var colorScale = d3.scaleOrdinal()
                .range(['#CD5C5C', '#5DE488', '#71748D', '#C70039', '#FFC300']);


  var parse = d3.timeParse("%d-%b-%y");

  d3.queue()
    .defer(d3.csv, "crime-2015.csv")
    .await(ready);

  function ready(error, datapoints) {
    if (error) throw error;

    var nestedByMonthBorough = d3.nest()
      .key(function(d) { return d.Borough})
      .key(function(d) { return d.Month; })
      .rollup(function(leaves) { return leaves.length; })
      .entries(datapoints)
      .sort(function(a, b) { return a.key - b.key });

console.log(nestedByMonthBorough)

svg.selectAll(".borough-group")
  .data(nestedByMonthBorough)
  .enter().append("g")
  .each(function(d) {
    var g = d3.select(this);
    console.log("borough is", d.key);
    console.log(d.values);

    g.selectAll(".dot")
          .data(d.values)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3)
          .attr("fill", colorScale(d.key))
          .attr("cx", function(d) {
            return xPositionScale(d.key) // grouped by month
          })
          .attr("cy", function(d) {
            return yPositionScale(d.value) // rolled-up value
          })

  })
     
      
//console.log(nestedByMonthBorough[1].values[1].value)


    // var line = d3.line()
    //   .x(function(d) {
    //     return xPositionScale(d.month)
    //   })
    //   .y(function(d) {
    //     return yPositionScale(d.count)
    //   })
    //   .curve(d3.curveMonotoneX);

    // // svg.append("path")
    //       .data(counts)
    //       .attr("d", line)
    //       .attr("fill", "none")
    //       .attr("stroke", "LightSlateGrey")
    //       .attr("stroke-width", 3)



    var xAxis = d3.axisBottom(xPositionScale);
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    var yAxis = d3.axisLeft(yPositionScale)
      svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + 20 + ",0)")
        .call(yAxis);



  }



  
})();

