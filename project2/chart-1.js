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
      xUpdated = d3.scaleLinear().range([280,336])


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


//putting each emotion as a class and drawing circles 
    svg.selectAll(".H_happiness")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_happiness > 0 })
      .attr("class", "H_happiness hillary")
      .attr("fill", "#317873")

    svg.selectAll(".H_happiness")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_happiness);
        })

    svg.selectAll(".H_surprise")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_surprise > 0 })
      .attr("class", "H_surprise hillary")
      .attr("fill", "#B8860B")

    svg.selectAll(".H_surprise")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_surprise);
        })

    svg.selectAll(".H_anger")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_anger > 0 })
      .attr("class", "H_anger hillary")
      .attr("fill", "#9C839A")

    svg.selectAll(".H_anger")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_anger);
        })

    svg.selectAll(".H_fear")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_fear > 0 })
      .attr("class", "H_fear hillary")
      .attr("fill", "#3C78AF")

    svg.selectAll(".H_fear")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_fear);
        })

    svg.selectAll(".H_contempt")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_contempt > 0 })
      .attr("class", "H_contempt hillary")
      .attr("fill", "#FFCB21")

    svg.selectAll(".H_contempt")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_contempt);
        })

    svg.selectAll(".H_disgust")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_disgust > 0 })
      .attr("class", "H_disgust hillary")
      .attr("fill", "#BEBDBC")

    svg.selectAll(".H_disgust")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_disgust);
        })

    svg.selectAll(".H_sadness")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_sadness > 0 })
      .attr("class", "H_sadness hillary")
      .attr("fill", "#6E879E")

    svg.selectAll(".H_sadness")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_sadness);
        })

// mean of each emotion 
   console.log(d3.mean(datapoints, function(d) {return d.clinton_happiness}))

var hmeans_happiness = 0.20,
    hmeans_surprise = 0.03,
    hmeans_disgust = 0.0025,
    hmeans_contempt = 0.0066,
    hmeans_fear = 0.0004,
    hmeans_anger = 0.0012,
    hmeans_sadness = 0.02

console.log(hmeans_happiness, hmeans_surprise)

    d3.select("#slide-1").on('slidein', function() {
         svg.selectAll(".hillary")
        .each(function(d) {
          var classes = this.classList
          var circEl = d3.select(this)
          circEl
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
              return xPositionScale(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(d.clinton_surprise)
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(d.clinton_happiness)
              } else if (classes.contains('H_anger')) {
                return yPositionScale(d.clinton_anger)
              } else if (classes.contains('H_sadness')) {
                return yPositionScale(d.clinton_sadness)
              } else if (classes.contains('H_contempt')) {
                return yPositionScale(d.clinton_contempt)
              } else if (classes.contains('H_fear')) {
                return yPositionScale(d.clinton_fear)
              } else if (classes.contains('H_disgust')) {
                return yPositionScale(d.clinton_disgust)
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
            .duration(1000)
            .attr("cx", function(d) {
              return xUpdated(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(hmeans_surprise)
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(hmeans_happiness)
              } else if (classes.contains('H_anger')) {
                return yPositionScale(0)
              } else if (classes.contains('H_sadness')) {
                return yPositionScale(0)
              } else if (classes.contains('H_contempt')) {
                return yPositionScale(0)
              } else if (classes.contains('H_fear')) {
                return yPositionScale(0)
              } else if (classes.contains('H_disgust')) {
                return yPositionScale(0)
              }
            })
          })
          
        })

//////////////////////////////////////////////////////////////

//putting each emotion as a class and drawing circles 
    svg2.selectAll(".H_happiness")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_happiness > 0 })
      .attr("class", "H_happiness hillary")
      .attr("fill", "#317873")

    svg2.selectAll(".H_happiness")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_happiness);
        })

    svg2.selectAll(".H_surprise")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_surprise > 0 })
      .attr("class", "H_surprise hillary")
      .attr("fill", "#B8860B")

    svg2.selectAll(".H_surprise")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_surprise);
        })

    svg2.selectAll(".H_anger")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_anger > 0 })
      .attr("class", "H_anger hillary")
      .attr("fill", "#9C839A")

    svg2.selectAll(".H_anger")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_anger);
        })

    svg2.selectAll(".H_fear")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_fear > 0 })
      .attr("class", "H_fear hillary")
      .attr("fill", "#3C78AF")

    svg2.selectAll(".H_fear")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_fear);
        })

    svg2.selectAll(".H_contempt")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_contempt > 0 })
      .attr("class", "H_contempt hillary")
      .attr("fill", "#FFCB21")

    svg2.selectAll(".H_contempt")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_contempt);
        })

    svg2.selectAll(".H_disgust")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_disgust > 0 })
      .attr("class", "H_disgust hillary")
      .attr("fill", "#BEBDBC")

    svg2.selectAll(".H_disgust")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_disgust);
        })

    svg2.selectAll(".H_sadness")
      .data(sorted)
      .enter().append("circle")
      .filter(function(d) { return d.clinton_sadness > 0 })
      .attr("class", "H_sadness hillary")
      .attr("fill", "#6E879E")

    svg2.selectAll(".H_sadness")
      .attr("r", 2)
      .attr("cx", function(d) {
          return xPositionScale(d.frame_time)
        })
      .attr("cy", function(d) {
          return yPositionScale(d.clinton_sadness);
        })

// mean of each emotion 
   console.log(d3.mean(datapoints, function(d) {return d.clinton_happiness}))

var hmeans_happiness = 0.20,
    hmeans_surprise = 0.03,
    hmeans_disgust = 0.0025,
    hmeans_contempt = 0.0066,
    hmeans_fear = 0.0004,
    hmeans_anger = 0.0012,
    hmeans_sadness = 0.02

console.log(hmeans_happiness, hmeans_surprise)

    d3.select("#slide-1").on('slidein', function() {
         svg2.selectAll(".hillary")
        .each(function(d) {
          var classes = this.classList
          var circEl = d3.select(this)
          circEl
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
              return xPositionScale(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(d.clinton_surprise)
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(d.clinton_happiness)
              } else if (classes.contains('H_anger')) {
                return yPositionScale(d.clinton_anger)
              } else if (classes.contains('H_sadness')) {
                return yPositionScale(d.clinton_sadness)
              } else if (classes.contains('H_contempt')) {
                return yPositionScale(d.clinton_contempt)
              } else if (classes.contains('H_fear')) {
                return yPositionScale(d.clinton_fear)
              } else if (classes.contains('H_disgust')) {
                return yPositionScale(d.clinton_disgust)
              }
            })
          })
          
        })

    d3.select("#slide-2").on('slidein', function() {
      svg2.selectAll(".hillary")
        .each(function(d) {
          var classes = this.classList
          var circEl = d3.select(this)
          circEl
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
              return xUpdated(d.frame_time)
            })
            .attr("cy", function(d) {
              // console.log(classes.contains('H_surprise'))
              if (classes.contains('H_surprise')) {
                return yPositionScale(hmeans_surprise)
              } else if (classes.contains('H_happiness')) {
                return yPositionScale(hmeans_happiness)
              } else if (classes.contains('H_anger')) {
                return yPositionScale(0)
              } else if (classes.contains('H_sadness')) {
                return yPositionScale(0)
              } else if (classes.contains('H_contempt')) {
                return yPositionScale(0)
              } else if (classes.contains('H_fear')) {
                return yPositionScale(0)
              } else if (classes.contains('H_disgust')) {
                return yPositionScale(0)
              }
            })
          })
          
        })



  }    
})();
