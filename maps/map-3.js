(function() {
  var height = 400,
      width = 700;

  // What is this???
  var svg = d3.select("#map-3")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

  d3.queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "BoA.csv")
    .defer(d3.csv, "worship.csv")
    .await(ready)

  var projection = d3.geoAlbersUsa()
    .translate([ width / 2, height / 2 ])
    .scale(850)

  var path = d3.geoPath()
    .projection(projection)

  var div = d3.select("#map-3").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


  function ready(error, data, BoA, worship) {

    var states = topojson.feature(data, data.objects.states).features;

    svg.selectAll(".state")
      .data(states)
      .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .attr("fill", "#d3d3d3")
      .attr("stroke", "#e3e3e3")
      .attr("stroke-width", 1)


    svg.selectAll(".boa-circle")
      .data(BoA)
      .enter().append("circle")
      .attr("class", "boa-circle")
      .attr("r", 1)
      .attr("fill", "#ff6961")
      .attr("opacity", 0.7)
      .attr("cx", function(d) {
        // Taking our longitude and latitude columns
        // converting them into pixel coordinates 
        // on our screen
        // and returning the first one (the x)
        var coords = projection([d.long, d.lat])
        return coords[0]
      })
      .attr("cy", function(d) {
        var coords = projection([d.long, d.lat])
        return coords[1]
      })

    svg.selectAll(".w-circle")
      .data(worship)
      .enter().append("circle")
      .attr("class", "w-circle")
      .attr("r", 1)
      .attr("fill", "#77dd77")
      .attr("opacity", 0.7)
      .attr("cx", function(d) {
        // Taking our longitude and latitude columns
        // converting them into pixel coordinates 
        // on our screen
        // and returning the first one (the x)
        var coords = projection([d.long, d.lat])
        return coords[0]
      })
      .attr("cy", function(d) {
        var coords = projection([d.long, d.lat])
        return coords[1]
      })

    var hexbin = d3_hexbin.hexbin()
      .x(function(d) {
        var coords = projection([d.long, d.lat])
        return coords[0]
      })
      .y(function(d) {
        var coords = projection([d.long, d.lat])
        return coords[1]
      })
      .radius(10);

    // var colorScale = d3.scaleLinear().domain([0, 50]).range(['#377dd77', '#ff6961'])
    var BoA_colorScale = d3.scaleLinear().domain([0, 50]).range(['#ffffff', '#ff6961'])

    var W_colorScale = d3.scaleLinear().domain([0, 1000]).range(['#ffffff', '#77dd77'])

    svg.selectAll(".hex-bin")
      .data(hexbin(BoA))
      .enter().append("path")
      .attr("fill", "red")
      .attr("class", "BoA-hex")
      .attr("opacity", 0.5)
      .attr("fill", function(d) {
        // d.length gets you the number of items in that bin
        console.log(d.length)
        return BoA_colorScale(d.length)
      })
      .attr("d", function(d) { 
        return "M" + d.x + "," + d.y + hexbin.hexagon(); 
      });

    svg.selectAll(".hex-bin")
      .data(hexbin(worship))
      .enter().append("path")
      .attr("fill", "#77dd77")
      .attr("class", "BoA-hex")
      .attr("opacity", 0.5)
      .attr("fill", function(d) {
        // d.length gets you the number of items in that bin
        console.log(d.length)
        return W_colorScale(d.length)
      })
      .attr("d", function(d) { 
        return "M" + d.x + "," + d.y + hexbin.hexagon(); 
      });



  }
})();