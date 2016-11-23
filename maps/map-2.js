(function() {
  var height = 400,
      width = 700;

  // What is this???
  var svg = d3.select("#map-2")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");


  d3.queue()
    .defer(d3.json, "us.json")
    .defer(d3.csv, "breweries.csv")
    .await(ready)

  var projection = d3.geoAlbersUsa()
    .translate([ width / 2, height / 2 ])
    .scale(850)

  var path = d3.geoPath()
    .projection(projection)

  var div = d3.select("#map-1").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


  function ready(error, data, brewData) {

    var states = topojson.feature(data, data.objects.states).features;


    svg.selectAll(".state")
      .data(states)
      .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .attr("fill", "#333333")
      .attr("stroke", "#e3e3e3")
      .attr("stroke-width", 0.5)


    svg.selectAll(".brewery-circle")
      .data(brewData)
      .enter().append('circle')
      .attr('class', 'brewery-cricle')
      .filter(function(d) { return d.country === "United States" })
        .attr('r', 3)
        .attr('fill', '#ff6961')
        .attr('cx', function(d) {
          var coords = projection([d.Longitude, d.Latitude])
            if (coords) {
              return coords[0]
            }
          })
        .attr('cy', function(d) {
          var coords = projection([d.Longitude, d.Latitude])
            if (coords) {
              return coords[1]
            }
          })
        .attr('opacity', '0.7')
        .attr("stroke", "#333333")

      .on("mouseover", function(d) {
         div.transition()
           .duration(100)
           .style("opacity", .9);
         div.html(d.name + "<br/>" + d.city + ", "+ d.state)
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
         })
     .on("mouseout", function(d) {
         div.transition()
           .duration(200)
           .style("opacity", 0);
         })

     .on("click", function(d){ 
        console.log(d.website)
        window.open(d.website, '_blank')
      })



  }
})();