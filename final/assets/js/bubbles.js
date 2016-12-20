(function() {
  var width = 890,
    height = 500;

  var root = d3.select("#bubble_chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        
  var svg = root.append("g");

  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
              return  d.host_name +
                // "<br>" +
                "<br><span style='color:#fd5c63;font-size:10pt' 'font-weight:bolder'> Number of listings:  </span>" +
                "<span style='color:black;font-size:10pt' 'font-weight:bolder'> " +d.host_listings_count +
                "<br><span style='color:#fd5c63;font-size:10pt' 'font-weight:bolder'> Neighbourhood:  </span>" +
                "<span style='color:black;font-size:10pt' 'font-weight:bolder'> " +d.neighbourhood_cleansed +
                "<br><span style='color:#fd5c63;font-size:10pt' 'font-weight:bolder'> Airbnb account:  </span>" +
                "<span style='color:black;font-size:10pt' 'font-weight:bolder'> " + d.host_url + "</span>"
      })
  svg.call(tip);
  
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

  var boroughScale = d3.scaleOrdinal().domain(["Brooklyn","Queens","Staten Island","Manhattan"])
                    .range(["180", "400", "530","720"]);

  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.04))
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
        return "url(#" + d.host_id + ")"
      })
      .on('mouseover', function(d) {
        var element = d3.select(this);
          tip.show(d)
            element.style("stroke-width", "3")
            element.style("stroke", "#fd5c63")
            element.style("opacity", 0.8)
       })
      .on('mouseout', function(d) {
        var element = d3.select(this);
          tip.hide(d)
            element.style("opacity", 1) 
            element.style("stroke-width", "0")
      })
      .on("click", function(d){ 
        window.open(d.host_url, '_blank')
      })

    simulation.nodes(datapoints)
      .on('tick', ticked)


svg.append("text")
              .attr("id", "lables1")
              .attr("class", "country-text")
              .attr("y", 475)
              .attr("x", boroughScale("Queens"))
              .attr("text-anchor","middle")
              .text("Queens")
              .attr("opacity", 0)
              .attr("style", "font-family: Verdana;font-size: 14px;");
svg.append("text")
              .attr("id", "lables2")
              .attr("class", "country-text")
              .attr("y", 475)
              .attr("x", boroughScale("Staten Island"))
              .attr("text-anchor","middle")
              .text("Staten Island")
              .attr("opacity", 0)
              .attr("style", "font-family: Verdana;font-size: 14px;");
svg.append("text")
              .attr("id", "lables3")
              .attr("class", "country-text")
              .attr("y", 475)
              .attr("x", boroughScale("Manhattan"))
              .attr("text-anchor","middle")
              .text("Manhattan")
              .attr("opacity", 0)
              .attr("style", "font-family: Verdana;font-size: 14px;");
svg.append("text")
              .attr("id", "lables4")
              .attr("class", "country-text")
              .attr("y", 475)
              .attr("x", boroughScale("Brooklyn"))
              .attr("text-anchor","middle")
              .text("Brooklyn")
              .attr("opacity", 0)
              .attr("style", "font-family: Verdana;font-size: 14px;");



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
      d3.select("#lables1").transition().duration(2000).style("opacity", 1);
      d3.select("#lables2").transition().duration(2000).style("opacity", 1);
      d3.select("#lables3").transition().duration(2000).style("opacity", 1);
      d3.select("#lables4").transition().duration(2000).style("opacity", 1);
    })

    d3.select("#reset").on('click', function() {
      simulation.force("x", d3.forceX(width / 2)
        .strength(0.1))
        .alphaTarget(0.25)
        .restart()

      d3.select("#lables1").transition().duration(1000).style("opacity", 0);
      d3.select("#lables2").transition().duration(1000).style("opacity", 0);
      d3.select("#lables3").transition().duration(1000).style("opacity", 0);
      d3.select("#lables4").transition().duration(1000).style("opacity", 0);
    })

    function ticked() {
      nodes
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

  }

})();