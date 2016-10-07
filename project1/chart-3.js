(function() {
    var margin = { top: 30, left: 30, right: 30, bottom: 30},
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  var svg = d3.select("#chart-3")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var colorScale = d3.scaleOrdinal()
                .range(['#CD5C5C', '#5DE488', '#71748D', '#C70039', '#FFC300']);


  var radius = 100;

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(50);

  var labelArc = d3.arc()
    .outerRadius(radius + 10)
    .innerRadius(radius + 10);

  var pie = d3.pie()
  .value(function(d) { 
    return d.count; 
  })


  d3.queue()
    .defer(d3.csv, "crime-2015.csv")
    .await(ready);


  function ready(error, datapoints) {
    if (error) throw error;

    var nestedByBorough = d3.nest()
      .key(function(d) { return d.Borough; })
      .entries(datapoints)
      .sort(function(a, b) { return a.key - b.key });


    var counts = [];

    for (var i = 0; i < nestedByBorough.length; i++) {
      var monthObj = {}
      monthObj['borough'] = nestedByBorough[i].key;
      monthObj['count'] = nestedByBorough[i].values.length;
      counts.push(monthObj);
    }
   

    var pieContainer = svg.append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    var g = pieContainer.selectAll(".arc")
        .data(pie(counts))
        .enter().append("g");

    g.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          // you need to use d.data
          return colorScale(d.data.borough);
        })
        .style("opacity", 0.8)


    g.append("text")
      .attr("transform", function(d) { 
        return "translate(" + labelArc.centroid(d) + ")"; 
      })
      .attr("text-anchor", function(d) {
        if(d.startAngle + d.endAngle / 2 < Math.PI) {
          return 'start';
        } else {
          return 'end';
        }
      })
      .text(function(d) { 
        return d.data.borough; 
      });

  }



  
})();

