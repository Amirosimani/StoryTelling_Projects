(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleLinear().range([20, width]).domain([1,12]);
  var yPositionScale = d3.scaleLinear().range([height, 0]).domain([0,7000]);

  // var xAxisScale = d3.scalePoint().range([1,2,3,4,5,6,7,8,9,10,11,12])
  //                       .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"])

  var parse = d3.timeParse("%d-%b-%y");

  d3.queue()
    .defer(d3.csv, "crime-2015.csv")
    .await(ready);

  function ready(error, datapoints) {
    if (error) throw error;

    var nestedByMonth = d3.nest()
      .key(function(d) { return d.Month; })
      .entries(datapoints)
      .sort(function(a, b) { return a.key - b.key });

    var counts = [];

    for (var i = 0; i < nestedByMonth.length; i++) {
      var monthObj = {}
      monthObj['month'] = nestedByMonth[i].key;
      monthObj['count'] = nestedByMonth[i].values.length;
      counts.push(monthObj);
    }
   
    svg.selectAll("circle")
      .data(counts)
      .enter().append("circle")
      .attr("r", 3)
      .attr("fill", "DarkSlateGrey")
      .attr("cy", function(d) {
        return yPositionScale(d.count)
      })
      .attr("cx", function(d){
        return xPositionScale(d.month)
      })


    var line = d3.line()
      .x(function(d) {
        return xPositionScale(d.month)
      })
      .y(function(d) {
        return yPositionScale(d.count)
      })
      .curve(d3.curveMonotoneX);

    svg.append("path")
          .datum(counts)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "LightSlateGrey")
          .attr("stroke-width", 3)


    var xAxis = d3.axisBottom(xPositionScale);
      svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft(yPositionScale)
      svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + 20 + ",0)")
        .call(yAxis);



  }



  
})();

