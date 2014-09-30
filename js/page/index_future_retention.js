 (function() {
  
  var mainExample, exampleOne, exampleTwo;
  var chart;
  var dataProvider;
  var data;
  var info_term1;
  var info_term2;
  var info_term3;
  var info_term4;
  var info_term5;
  var info_term6;
  var info_term7;
  var info_term8;
  var testdata;
  
  window.onload = function() {
  loadCSV("js/page/Faux_Data.csv");
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
  
  var column, day, term1, term2, term3, term4, term5, term6, term7, term8;
  // column is array now
  // our columns are separated by comma
  column = rows[i].split(",");
  
  
  if(i === 0) {
  // first item is date
  var day = column[0];
  var term1 = column[1];
  var term2 = column[2];
  var term3 = column[3];
  var term4 = column[4];
  var term5 = column[5];
  var term6 = column[6];
  var term7 = column[7];
  var term8 = column[8];
  } else {
  var day = parseInt(column[0], 10);
  
  var term1 = parseInt(column[1], 10);
  // second item is value of the second column
  var term2 = parseInt(column[2], 10);
  // third item is value of the fird column
  var term3 = parseInt(column[3], 10);
  
  var term4 = parseInt(column[4], 10);
  
  var term5 = parseInt(column[5], 10);
  
  var term6 = parseInt(column[6],10);
  var term7 = parseInt (column[7],10);
  var term8 = parseInt (column[8],10);
  }
  
  // create object which contains all these items:
  var dataObject = {day:day,term1:term1, term2:term2, term3:term3, term4:term4, term5:term5, term6:term6, term7:term7, term8:term8};
  
  // add object to dataProvider array
  dataProvider.push(dataObject);
  }
  }
  
  format_arrays();
  }    
  
  function format_arrays() {
  //init the info_withdrawn array
  info_term1 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term1.length; row++) {
  info_term1[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term1[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term1[row][col] = dataProvider[row].term1;
  }
  }
  }
  
  //init the info_withdrawn array
  info_term2 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term2.length; row++) {
  info_term2[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term2[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term2[row][col] = dataProvider[row].term2;
  }
  }
  }
  
  info_term3 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term3.length; row++) {
  info_term3[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term3[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term3[row][col] = dataProvider[row].term3;
  }
  }
  }
  
  info_term4 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term4.length; row++) {
  info_term4[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term4[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term4[row][col] = dataProvider[row].term4;
  }
  }
  }
  info_term5 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term5.length; row++) {
  info_term5[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term5[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term5[row][col] = dataProvider[row].term5;
  }
  }
  }
  info_term6 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term6.length; row++) {
  info_term6[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term6[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term6[row][col] = dataProvider[row].term6;
  }
  }
  }
  info_term7 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term7.length; row++) {
  info_term7[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term7[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term7[row][col] = dataProvider[row].term7;
  }
  }
  }
  info_term8 = new Array(dataProvider.length);
  //initialize and set the array with variables
  for(var row = 0; row < info_term8.length; row++) {
  info_term8[row] = new Array(2);
  for(var col = 0; col < 2; col++) {
  if(col === 0) {
  info_term8[row][col] = dataProvider[row].day;
  }
  if(col === 1) {
  info_term8[row][col] = dataProvider[row].term8;
  }
  }
  }
  
  retention_data = [
                    {
                    "key" : "Term 1" ,
                    "bar": true,
                    "values" : info_term1, 
                    },
                    {
                    "key" : "Term 2" ,
                    "bar": true,
                    "values" : info_term2,
                    },
                    {
                    "key" : "Term 3" ,
                    "bar": true,
                    "values" : info_term3, 
                    },{
                    "key" : "Term 4" ,
                    "bar": true,
                    "values" : info_term4, 
                    },{
                    "key" : "Term 5" ,
                    "bar": true,
                    "values" : info_term5, 
                    },{
                    "key" : "Term 6" ,
                    "bar": true,
                    "values" : info_term6, 
                    },{
                    "key" : "Term 7" ,
                    "bar": true,
                    "values" : info_term7, 
                    },{
                    "key" : "Term 8" ,
                    "bar": true,
                    "values" : info_term8, 
                    },
                    ].map(function(series) {
                          series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                          return series;
                          
                          });
  
  
  var histcatexplong = [ 
                        { 
                        "key" : "Term 1" , 
                        "values" : info_term1
                        } , 
                        { 
                        "key" : "Term 2" , 
                        "values" : info_term2
                        },
                        { 
                        "key" : "Term 3" , 
                        "values" : info_term3
                        },
                        { 
                        "key" : "Term 4" , 
                        "values" : info_term4
                        },
                        { 
                        "key" : "Term 5" , 
                        "values" : info_term5
                        },
                        { 
                        "key" : "Term 6" , 
                        "values" : info_term6
                        },
                        { 
                        "key" : "Term 7" , 
                        "values" : info_term7
                        },
                        { 
                        "key" : "Term 8" , 
                        "values" : info_term8
                        }
                        ];
  
  
  //an example of harmonizing colors between visualizations
  //observe that Consumer Discretionary and Consumer Staples have 
  //been flipped in the second chart
  var colors = d3.scale.category20();
  keyColor = function(d, i) {return colors(d.key)};
  
  
  // --------------------------- MAIN EXAMPLE ---------------------------------

  
  
  nv.addGraph(function() {
              var flag = 'future_retention';
              var chart = nv.models.stackedAreaChart(flag)
              .x(function(d) { return d[0] })
              .y(function(d) { return d[1] })
              .color(keyColor)
              //.clipEdge(true);
              
              chart.xAxis.axisLabel('Days since students start date').tickValues(dataProvider.day);
              
              chart.yAxis
              .axisLabel('Total Number of Enrollments').tickFormat(d3.format(',f'));
              
              
              d3.select('#mainExample')
              .datum(histcatexplong)
              .transition().duration(500).call(chart);
              
              nv.utils.windowResize(chart.update);
              
//              chart.legend.dispatch.on('legendClick.updateExamples', function() {
//                                       setTimeout(function() {
//                                                  exampleOne.update();
//                                                  exampleTwo.update();
//                                                  exampleThree.update();
//                                                  }, 100);
//                                       });
              
              mainExample = chart;
              
              return chart;
              });
  

  // --------------------------- EXAMPLE ONE---------------------------------

  
  nv.addGraph(function() {  
              chart = nv.models.lineChart()
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
  
  // ---------------------------  EXAMPLE TWO ---------------------------------

  
  nv.addGraph(function() {  
              chart = nv.models.linePlusBarChart()
              .margin({top: 30, right: 60, bottom: 50, left: 70})
              //            .x(function(d,i) { return i })
              .showLegend(false)
              .color(d3.scale.category10().range());
              
              
              d3.select('#exampleTwo')
              .datum(retention_data)
              .transition().duration(500)
              .call(chart);
              
              //TODO: Figure out a good way to do this automatically
              nv.utils.windowResize(chart.update);
              //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
              
              exampleTwo = chart;
              
              return chart;
              }); 
  
  
  // ---------------------------  EXAMPLE THREE ---------------------------------
  
  
  function get_scatter_data(groups, points) { //# groups,# points per group
  var bubble_data = [],
  termValue =[],
  
  shapes = 'circle';//, 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
  
  bubble_data.push({
                   key: 'Term 1',
                   values: [],
                   });
  termValue.push(0);
  
  bubble_data.push({
                   key: 'Term 2',
                   values: [],
                   });
  termValue.push(1);
  bubble_data.push({
                   key: 'Term 3',
                   values: [],
                   });
  termValue.push(2);
  bubble_data.push({
                   key: 'Term 4',
                   values: [],
                   });
  termValue.push(3);
  bubble_data.push({
                   key: 'Term 5',
                   values: [],
                   });
  termValue.push(4);
  bubble_data.push({
                   key: 'Term 6',
                   values: [],
                   });
  termValue.push(5);
  bubble_data.push({
                   key: 'Term 7',
                   values: [],
                   });
  termValue.push(6);
  bubble_data.push({
                   key: 'Term 8',
                   values: [],
                   });
  termValue.push(7);
  
  for (i = 0; i < groups ; i++){
  
  for (j = 1; j < points; j++) {
  //temp1 = dataProvider[j].term, 
  //temp2 = dataProvider[j].courses_passed_in_term,
  if (termValue[i] == 0){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term1, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term2, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term3, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term4, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term5, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term6, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term7, 
                             size: 23, 
                             shape: shapes
                             });
  }
  if (termValue[i] == 1){
  bubble_data[i].values.push({
                             x: dataProvider[j].day, 
                             y: dataProvider[j].term8, 
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
              .height(240)
              .color(d3.scale.category10().range());
              
              chart.xAxis.tickFormat(d3.format('.02f'))
              chart.yAxis.tickFormat(d3.format('.02f'))
              
              d3.select('#exampleThree')
              .datum(get_scatter_data(8, dataProvider.length-1))
              .transition().duration(500)
              .call(chart);
              
              nv.utils.windowResize(chart.update);
              
              exampleThree = chart;
              return chart;
              });

  }
  
  })();
  
