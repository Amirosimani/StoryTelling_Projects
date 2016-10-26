(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
    height = 600 - margin.top - margin.bottom,
    width = 616 - margin.left - margin.right;

  var svg = d3.select("#graphic")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2 = d3.select("#graphic2")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var xPositionScale = d3.scaleLinear().range([20, width]),
      yPositionScale = d3.scaleLinear().range([height, 0]).domain([0,1]),
      colorScale = d3.scaleOrdinal(["#C23B22",'#317873', "#317873", "#B8860B",  '#B8860B']);


  d3.queue()
    .defer(d3.csv, "debate1.csv")
    .await(ready);

  function ready(error, datapoints) {
    if (error) throw error;

    var sorted = datapoints.sort(function(a, b) {
        return a.frame_time - b.frame_time;
      })   


    var sorted = datapoints.sort(function(a, b) {
      return a.frame_time - b.frame_time;
    })    
    
    xPositionScale.domain(d3.extent(datapoints, function(d) { return +d.frame_time }));




    svg.selectAll(".H_happiness")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_happiness > 0 })
      .attr("class", "H_happiness hillary")
      .attr("fill", "#317873")

    svg.selectAll(".H_surprise")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_surprise > 0 })
      .attr("class", "H_surprise hillary")
      .attr("fill", "#B8860B")


    svg.selectAll(".H_happiness")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_happiness);
        })

      // d3.selectAll(".H_happiness").style("filter", "url(#motionFilter)");


    svg.selectAll(".H_surprise")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_surprise);
        })

var hmeans = {'surprise': 0.6, 'happiness': 0.2}



    d3.select("#slide-1").on('slidein', function() {
         svg.selectAll(".hillary")
        .each(function(d) {
          var classes = this.classList
          var circEl = d3.select(this)
          circEl
            .transition()
            .duration(750)
            .attr("cx", function(d) {
              return xPositionScale(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(d.clinton_surprise)
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(d.clinton_happiness)
              }
            })
          })
          
        })



    d3.select("#slide-2").on('slidein', function() {
      svg.selectAll(".hillary")
        .each(function(d) {
          var classes = this.classList
          var circEl = d3.select(this)
          circEl
            .transition()
            .duration(750)
            .attr("cx", function(d) {
              return xPositionScale(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(hmeans['surprise'])
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(hmeans['happiness'])
              }
            })
          })
          
        })
        // .transition()
        // .duration(750)
        // .attr("cx", function(d) {
        //   return xPositionScale(d.frame_time)
        // })
        // .attr("cy", function(d) {
        //   // yPositionScale(hmeans)
        // })



  }    
})();
