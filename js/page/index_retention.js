 (function() {
  
  var mainExample, mainExample_2, mainExample_3, exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive, exampleSix, exampleSeven, exampleEight, exampleNine;
  var chart;
  var dataProvider, dataProvider_2, dataDaily;
  var data, data_2;
  var info_withdrawn;
  var info_enrollment;
  var retention_data;
  var daily_active_students_data, testdata;
  var info_activity;
  
  function loadCSV(file, flag) {
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
      if(flag === 1) {
        data = request.responseText;
      }
      if(flag === 2) {
        data_2 = request.responseText;
      }
  }
  
  
  // --------------------------- Get Retention Data ---------------------------------
  
  
  function getRetentionData() {
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
      var column, day, percent_not_withdrawn, percent_not_withdrawn_static_n, enrollments, withdrawals_dynamic_n, withdrawals_static_n;
      // column is array now
      // our columns are separated by comma
      column = rows[i].split(",");
      
      if(i === 0) {
      // first item is date
      var day = column[0];
      var percent_not_withdrawn = column[1];
      var percent_not_withdrawn_static_n = column[2];
      var enrollments = column[3];
      var withdrawals_dynamic_n = column[4];
      var withdrawals_static_n = column[5];
      } else {
      var day = parseInt(column[0], 10);
      
      var percent_not_withdrawn = parseInt(column[1], 10);
      // second item is value of the second column
      var percent_not_withdrawn_static_n = parseInt(column[2], 10);
      // third item is value of the fird column
      var enrollments = parseInt(column[3], 10);
      
      var withdrawals_dynamic_n = parseInt(column[4], 10);
      
      var withdrawals_static_n = parseInt(column[5], 10);
      }
      
      // create object which contains all these items:
      var dataObject = {day:day,percent_not_withdrawn:percent_not_withdrawn, percent_not_withdrawn_static_n:percent_not_withdrawn_static_n, enrollments:enrollments, withdrawals_dynamic_n:withdrawals_dynamic_n, withdrawals_static_n:withdrawals_static_n};
      
      // add object to dataProvider array
      dataProvider.push(dataObject);
      }
      }
      
      //init the info_withdrawn array
      info_withdrawn = new Array(dataProvider.length);
      
      
      //initialize and set the array with variables
      for(var row = 0; row < info_withdrawn.length; row++) {
      info_withdrawn[row] = new Array(2);
      for(var col = 0; col < 2; col++) {
      if(col === 0) {
      info_withdrawn[row][col] = dataProvider[row].day;
      }
      if(col === 1) {
      info_withdrawn[row][col] = dataProvider[row].percent_not_withdrawn;
      }
      }
      }
      
      info_enrollment = new Array(dataProvider.length);
      //initialize and set the array with variables
      for(var row = 0; row < info_enrollment.length; row++) {
      info_enrollment[row] = new Array(2);
      for(var col = 0; col < 2; col++) {
      if(col === 0) {
      info_enrollment[row][col] = dataProvider[row].day;
      }
      if(col === 1) {
      info_enrollment[row][col] = dataProvider[row].enrollments;
      }
      }
      }
      
      retention_data = [
                        {
                        "key" : "Percent Not Withdrawn" ,
                        "bar": true,
                        "values" : info_withdrawn, 
                        },
                        {
                        "key" : "Number of Enrollments" ,
                        "values" : info_enrollment,
                        }
                        ].map(function(series) {
                              series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                              return series;
                              
                              });
  }
  
  
  loadCSV("student_data.csv", 1);
  getRetentionData();
  

   
  // --------------------------- MAIN EXAMPLE ---------------------------------
  
  nv.addGraph(function() {  
              var flag = 'retention';
              var chart = nv.models.linePlusBarChart(flag)
              .margin({top: 30, right: 60, bottom: 50, left: 70})
              .x(function(d,i) { return i })
              .color(d3.scale.category10().range());
              
              d3.select('#mainExample')
              .datum(retention_data)
              .transition().duration(500)
              .call(chart);
              
              //TODO: Figure out a good way to do this automatically
              nv.utils.windowResize(chart.update);
              //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
              
              
             
              
              chart.legend.dispatch.on('legendClick.updateExamples', function() {
                                       setTimeout(function() {
                                                  exampleOne.update();
                                                  exampleTwo.update();
                                                  exampleThree.update();
                                                  }, 100);
                                       });
              
              mainExample = chart;
              
              return chart;
              });  
  
  // --------------------------- EXAMPLE ONE ---------------------------------
  
  
  nv.addGraph(function() {  
              var flag = 'retention';
              chart = nv.models.lineChart(flag)
              .margin({top: 30, right: 60, bottom: 50, left: 70})
              //            .x(function(d,i) { return i })
              .showLegend(false)
              .color(d3.scale.category10().range());
              
              
              d3.select('#exampleOne')
              .datum(retention_data)
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
              var flag = 'retention';
              var chart = nv.models.stackedAreaChart(flag)
              .margin({top: 10, bottom: 30, left: 40, right: 10})
              .showControls(false)
              .showLegend(false)
              .style('stacked');
              
              chart.yAxis
              .showMaxMin(false)
              .tickFormat(d3.format(',.1f'));
              
              d3.select('#exampleTwo')
              .datum(retention_data)
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
      termValue =[],
      
      shapes = 'circle';//, 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      
      bubble_data.push({
                       key: 'Enrollments',
                       values: [],
                       });
      termValue.push(0);
      
      bubble_data.push({
                       key: 'Percent Not Withdrawn',
                       values: [],
                       });
      termValue.push(1);
      
      for (i = 0; i < groups ; i++){
      
      for (j = 1; j < points; j++) {
      //temp1 = dataProvider[j].term, 
      //temp2 = dataProvider[j].courses_passed_in_term,
      if (termValue[i] == 0){
      bubble_data[i].values.push({
                                 x: dataProvider[j].day, 
                                 y: dataProvider[j].percent_not_withdrawn, 
                                 size: 23, 
                                 shape: shapes
                                 });
      }
      if (termValue[i] == 1){
      bubble_data[i].values.push({
                                 x: dataProvider[j].day, 
                                 y: dataProvider[j].enrollments, 
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
              .showLegend(false)
              //.height(500)
              .color(d3.scale.category10().range());
              
              chart.xAxis.tickFormat(d3.format('.02f'))
              chart.yAxis.tickFormat(d3.format('.02f'))
              
              d3.select('#exampleThree')
              .datum(get_scatter_data(2, dataProvider.length-1))
              .transition().duration(500)
              .call(chart);
              
              nv.utils.windowResize(chart.update);
              
              exampleThree = chart;
              return chart;
              });
  
  
  })();
  
