 (function() {
  
  var mainExample, mainExample_2, mainExample_3, exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive, exampleSix, exampleSeven, exampleEight, exampleNine;
  var chart;
  var dataProvider;
  var data;
  var info_activity;
  var info_enrollment;
  var testdata;
  
  window.onload = function() {
  loadCSV("js/page/DAU.csv");
  }
  function loadCSV(file) {
  if (window.XMLHttpRequest) {
  // IE7+, Firefox, Chrome, Opera, Safari
  var request = new XMLHttpRequest();
  }
  else {
  // code for IE6, IE5
  var request = new ActiveXObject('Microsoft.XMLHTTP');
  }
  // load
  request.open('GET', file, false);
  request.send();
  parseCSV(request.responseText);
  }
  function parseCSV(data) {
  //replace UNIX new lines
  data = data.replace (/\r\n/g, "\n");
  //replace MAC new lines
  data = data.replace (/\r/g, "\n");
  //split into rows
  var rows = data.split("\n");
  // create array which will hold our data:
  dataProvider = [];
  
  // loop through all rows
  for (var i = 1; i < rows.length; i++){
  // this line helps to skip empty rows
  if (rows[i]) {
  
  var days, activity;
  // column is array now
  // our columns are separated by comma
  column = rows[i].split(",");
  
  
  if(i === 0) {
  // first item is date
  var days = column[0];
  var activity = column[1];
  } else {
  var days = parseInt(column[0], 10);
  
  var activity = parseInt(column[1], 10);
  }
  
  // create object which contains all these items:
  var dataObject = {days:days,activity:activity};
  
  // add object to dataProvider array
  dataProvider.push(dataObject);
  }
  }
  
  format_arrays();
  }
  
  
  function format_arrays() {
  //init the info_velocity array
  info_activity = new Array(dataProvider.length);
  
  
  //initialize and set the array with variables
  for(var row = 0; row < info_activity.length; row++) {
  info_activity[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_activity[row][col] = dataProvider[row].days;
  }
  if(col === 1) {
  info_activity[row][col] = dataProvider[row].activity;
  }
  }
  }
  
  
  
  testdata = [
              {
              "key" : "Daily Active Users" ,
              "bar": true,
              "values" : info_activity
              },
              ].map(function(series) {
                    series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                    return series;
                    
                    });
  // --------------------------- MAIN EXAMPLE ---------------------------------
 
  
  nv.addGraph(function() {
              var flag = 'daily_active_users';
              var chart = nv.models.linePlusBarChart(flag)
              .margin({top: 30, right: 60, bottom: 50, left: 70})
              .x(function(d,i) { return i })
              .color(d3.scale.category10().range());
              
              chart.xAxis.axisLabel('Days since New Platform').tickValues(dataProvider.days);
              
              chart.yAxis1
              .axisLabel('Daily Active Users').tickFormat(d3.format(',f'));
              
              
              chart.bars.forceY([0]);
              //chart.lines.forceY([0]);
              
              d3.select('#mainExample')
              .datum(testdata)
              .transition().duration(500).call(chart);
              
              mainExample = chart;
              
              return chart;
              });
  
  // --------------------------- EXAMPLE ONE ---------------------------------
  
  nv.addGraph(function() {  
              var flag = 'daily_active_users';
              chart = nv.models.lineChart(flag)
              .margin({top: 30, right: 60, bottom: 50, left: 70})
              //            .x(function(d,i) { return i })
              .showLegend(false)
              .color(d3.scale.category10().range());
              
              
              d3.select('#exampleOne')
              .datum(testdata)
              .transition().duration(500)
              .call(chart);
              
              //TODO: Figure out a good way to do this automatically
              nv.utils.windowResize(chart.update);
              //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
              
              exampleOne = chart;
              
              return chart;
              });  
  

  // --------------------------- EXAMPLE TWO ---------------------------------
  
  nv.addGraph(function() {
              var flag = 'daily_active_users';
              var chart = nv.models.stackedAreaChart(flag)
              .margin({top: 10, bottom: 30, left: 40, right: 10})
              .showControls(false)
              .showLegend(false)
              .style('stacked');
              
              chart.yAxis
              .showMaxMin(false)
              .tickFormat(d3.format(',.1f'));
              
              d3.select("#exampleTwo")
              .datum(testdata)
              .transition().duration(500).call(chart);
              
              nv.utils.windowResize(chart.update);
              
              
              chart.stacked.dispatch.on('areaClick.updateExamples', function(e) {
                                        setTimeout(function() {
                                                   mainExample.update();
                                                   exampleOne.update();
                                                   //exampleTwo.update();
                                                   exampleThree.update();
                                                   }, 100);
                                        })
              
              exampleTwo = chart;
              
              return chart;
              });

  // --------------------------- EXAMPLE THREE ---------------------------------

  function get_scatter_data(groups, points) { //# groups,# points per group
      var bubble_data = [],
      activeStudentsValues =[],
      
      shapes = 'circle';//, 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      
      bubble_data.push({
                       key: 'Daily Active Students',
                       values: []
//                       color: "#800000"
                       });
      activeStudentsValues.push(0);
      
      for (i = 0; i < groups ; i++){
      
      for (j = 1; j < points; j++) {
      //temp1 = dataProvider[j].term, 
      //temp2 = dataProvider[j].courses_passed_in_term,
      if (activeStudentsValues[i] == 0){
      bubble_data[i].values.push({
                                 x: dataProvider[j].days, 
                                 y: dataProvider[j].activity, 
                                 size: 23, 
                                 shape: shapes
                                 });
      }
      }
      
      }
      return bubble_data;
  }
  
  nv.addGraph(function() {
              var chart = nv.models.scatterChart()
              .showControls(false)
              .showDistX(true)
              .showDistY(true)
              //.height(500)
              .color(d3.scale.category10().range());
              
              chart.xAxis.tickFormat(d3.format('.02f'))
              chart.yAxis.tickFormat(d3.format('.02f'))
              
              d3.select('#exampleThree')
              .datum(get_scatter_data(1, dataProvider.length-1))
              .transition().duration(500)
              .call(chart);
              
              nv.utils.windowResize(chart.update);
              
              exampleThree = chart;
              return chart;
              });
  
  
  }
  
  })();
  
