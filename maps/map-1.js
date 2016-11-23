(function() {
  var height = 400,
      width = 700;

  // What is this???
  var svg = d3.select("#map-1")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        .append("g")
        .attr("transform", "translate(0,0)");

  var div = d3.select("#map-1").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  var magScale = d3.scaleSqrt().range([1, 15])

  d3.queue()
    .defer(d3.json, "world.topojson")
    .defer(d3.csv, 'significant_month.csv')
    .await(ready)

  var projection = d3.geoMercator()
    .translate( [width / 2, height / 2])
    .scale(100)
  /*
    create a path (geoPath)
    using the projection
  */
  var path = d3.geoPath()
    .projection(projection)

  function ready(error, data, USGS) {

    // console.log(USGS)
    var countries = topojson.feature(data, data.objects.countries).features;

    svg.selectAll(".country")
      .data(countries)
      .enter().append("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", "#e3e3e3")
      .attr("stroke", "#333333")
      .attr("stroke-width", 0.5)


    magScale.domain(d3.extent(USGS, function(d) { return d.mag; }));

    svg.selectAll(".earthquake-circle")
      .data(USGS)
      .enter().append('circle')
      .attr('class', 'earthquake-cricle')
      .attr('r', function(d) {
        return magScale(d.mag)
      })
      .attr('fill', '#ff6961')
      .attr('cx', function(d) {
        var coords = projection([d.longitude, d.latitude])
          return coords[0]
        })
      .attr('cy', function(d) {
        var coords = projection([d.longitude, d.latitude])
          return coords[1]
      })
      .attr('opacity', '0.6')
      .attr("stroke", "#333333")

      .on("mouseover", function(d) {
         div.transition()
           .duration(100)
           .style("opacity", .9);
         div.html(d.mag + "<br/>" + d.place)
           .style("left", (d3.event.pageX) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
         })
     .on("mouseout", function(d) {
         div.transition()
           .duration(200)
           .style("opacity", 0);
         });


  }
})()