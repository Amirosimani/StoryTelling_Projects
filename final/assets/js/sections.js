
/**
 * scrollVis - encapsulates
 * all the code for the visualization
 * using reusable charts pattern:
 * http://bost.ocks.org/mike/chart/
 */
var scrollVis = function() {
  // constants to define the size
  // and margins of the vis area.

    var margin = { top: 30, left: 30, right: 30, bottom: 30},
      height = 650 - margin.top - margin.bottom,
      width = 800 - margin.left - margin.right;


  // Let's create some scales
  var xPositionScale = d3.scaleLinear()
      .domain([0,1000])
      .range([0,width]);

  var yPositionScale = d3.scaleLinear()
      .domain([0,120])
      .range([height,0]);


  var countColorScale = d3.scaleOrdinal().domain([1, 2]).range(["#fd5c63", "#3886B2"])

  var wholeColorScale = d3.scaleOrdinal().domain([0, 1, 2]).range(["#fd5c63","#3886B2", "#28607F"])

  var daysColorScale = d3.scaleOrdinal().domain([0, 1, 2, 3]).range(["#fd5c63","#3886B2", "#28607F", "#d3d3d3"])

  var countScale = d3.scaleOrdinal().domain([1,2]).range([200, 650]);
  // xHeroScale
         


  var places = {};

  var simulation = d3.forceSimulation()
      .force("x", d3.forceX(function(d) {
        return countScale(d.listing_count);
      }).strength(function(d) {
        return 0.04;
      }))
      .force("y", d3.forceY(function(d) {
        return 300;
      }).strength(function(d) {
        return 0.02;
      }))
      .force("collide", d3.forceCollide(function(d) {
        return 6;
      }))



  function ticked() {
      squares.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // main svg used for visualization
  var svg = null;

  // d3 selection that will be used
  // for displaying visualizations
  var g = null;

  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];

  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function(selection) {
    selection.each(function(rawData) {
      // create svg and give it a width and height
      svg = d3.select(this)
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.top + "," + margin.left + ")");


      svg.append("g");

      


      // this group element will be used to contain all
      // other elements.
      g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // preprocess the data - and then call setupVis
      setupVis(rawData);

      setupSections();

    });
  };

  var squares = null;
  var inForce = false;

  /**
   * setupVis - creates initial elements for all
   * sections of the visualization.
   *
   * @param wordData - data object for each word.
   * @param fillerCounts - nested data that includes
   *  element for each filler word type.
   * @param histData - binned histogram data
   */
  setupVis = function(datapoints) {
    console.log(datapoints)
    
    console.log("Visualization setup.")


    squares = svg.selectAll(".squares")
      .data(datapoints, function(d) {
        return d.index
      })
      .enter()
      .append("rect")
      .attr("height", 15)
      .attr("width", 15)
      .attr("y", function(d, i) {
        return 18 * parseInt(i / 20);
      })
      .attr("x", function(d, i) {
        return 18 * (i % 20);
      })
      .attr("fill", "#fd5c63")
  };

  /**
   * setupSections - each section is activated
   * by a separate function. Here we associate
   * these functions to the sections based on
   * the section's index.
   *
   */
  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = page0;
    activateFunctions[1] = page1;
    activateFunctions[2] = page2;
    activateFunctions[3] = page3;
    activateFunctions[4] = page4;
    activateFunctions[5] = lastPage;


    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 6; i++) {
      updateFunctions[i] = function() {};
    }
  };

  /**
   * ACTIVATE FUNCTIONS
   *
   * These will be called their
   * section is scrolled to.
   *
   * General pattern is to ensure
   * all content for the current section
   * is transitioned in, while hiding
   * the content for the previous section
   * as well as the next section (as the
   * user may be scrolling up or down).
   *
   */

  /**
   * showTitle - initial title
   *
   * hides: count title
   * (no previous step to hide)
   * shows: intro title
   *
   */


  function lastPage() {
    var vis = d3.select("#vis");
    vis.style("display", "none"); 
  }

  function page0() {
    var vis = d3.select("#vis");
    vis.style("display", "none"); 
  }
   
  function page1() {
    var vis = d3.select("#vis");
    vis.style("display", "inline-block"); 


    console.log("page1!!")

          simulation.stop()

          squares.transition()
            .attr("y", function(d, i) {
             return 18 * parseInt(i / 20);
            })
            .attr("x", function(d, i) {
             return 18 * (i % 20);
            })
            .attr("fill", "#fd5c63")

  }

  /**
   * showFillerTitle - filler counts
   *
   * hides: intro title
   * hides: square grid
   * shows: filler count title
   *
   */
  function page2() {
          
          squares.transition()
            .attr("fill", function(d) {
              return countColorScale(d.listing_count)
            })
  }


  function page3() {

    squares.transition()
    .attr("fill", function(d) {
      return wholeColorScale(d.whole_apt)
    })

  }

  function page4() {

    squares.transition()
    .attr("fill", function(d) {
      return daysColorScale(d.days)
    })

  }


  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
 * display - called once data
 * has been loaded.
 * sets up the scroller and
 * displays the visualization.
 *
 * @param data - loaded tsv data
 */
function display(error, data) {
  // create a new plot and
  // display it
  var plot = scrollVis();
  d3.select("#vis")
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(d) {
    index = d;
    console.log(index)
    // highlight current step text
    d3.selectAll('.step')
      .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(d,i){
    plot.update(d,i);
  });

}

function combine(error, big_data_1, big_data_2, big_data_3) {
    if (error) {
        console.log(error);
    }
    console.log(d3.merge([big_data_1, big_data_2, big_data_3]));
}

d3.queue()
      .defer(d3.csv, "assets/data/listings_dummy.csv", function (d, i) {
        d.index = i;
        return d;
      })
      .await(display)
