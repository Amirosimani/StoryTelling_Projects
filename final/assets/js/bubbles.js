(function() {
  var width = 890,
    height = 500;

  var root = d3.select("#bubble_chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)

        
  var svg = root.append("g");

  // var tip = d3.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //         return d.host_id
  //     })

  // g.call(tip);
  
  var defs = svg.append("defs")


    /*
      Our pattern wants to look something like this
        <pattern id="jon-snow" height="100%" width="100%" patternContentUnits="objectBoundingBox">
          <image height="1" width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="snow.jpg"></image>
        </pattern>
    */
    defs.append("pattern")
      .attr("id", "photos")
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", 'http://placekitten.com/g/48/48')

  var radiusScale = d3.scaleSqrt().domain([10,800]).range([10, 80])

  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d) {
      return radiusScale(d.host_listings_count) + 2
    }))


  d3.queue()
    .defer(d3.csv, "assets/data/person_of_interest.csv")
    .await(ready)

  function ready (error, datapoints) {


    /*
      MAKE ONE PATTERN FOR EVERY SINGLE DATA POINT
      (madonna gets a pattern! the cars get a pattern! etc)
      Our pattern wants to look something like this
        <pattern id="jon-snow" height="100%" width="100%" patternContentUnits="objectBoundingBox">
          <image height="1" width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="snow.jpg"></image>
        </pattern>
    */
    defs.selectAll(".artist-pattern")
      .data(datapoints)
      .enter().append("pattern")
      .attr("class", "artist-pattern")
      .attr("id", function(d) {
        return d.host_id
        })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
      .attr("xlink:href", function(d) {
        return d.host_picture_url
      })




    var nodes = svg.selectAll(".artist")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "artist")
      .attr("r", function(d) {
        return radiusScale(d.host_listings_count)
      })
      .style("fill", function(d) {
        // "url(#jon-snow)"
        // kind of like "url(#" + "jon-snow" + ")"
        return "url(#" + d.host_id + ")"
      })

    simulation.nodes(datapoints)
      .on('tick', ticked)

    d3.select("#boroughs").on('click', function() {
      // go get the force named 'x' from the simulation
      // and replace it with the new force
      // kind of like how we do .attr("fill", "red") and it
      // replaces the old fill that we had before
      simulation.force("x", d3.forceX(function(d) {

          if(d.neighbourhood_group_cleansed == "Brooklyn") {
            return width * .20;
          }
          if(d.neighbourhood_group_cleansed == "Manhattan") {
            return width * .80;
          }
          if(d.neighbourhood_group_cleansed == "Queens") {
            return width * .45;
          }
          if(d.neighbourhood_group_cleansed == "Staten Island") {
            return width * .60;
          }
        })
        .strength(0.1))
        .alphaTarget(0.5)
        .restart()
    })

    d3.select("#reset").on('click', function() {
      simulation.force("x", d3.forceX(width / 2)
        .strength(0.1))
        .alphaTarget(0.25)
        .restart()
    })

    function ticked() {
      nodes
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

  }

})();