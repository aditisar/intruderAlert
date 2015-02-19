var text; // variable for the text div you'll create
var oldIntruderCount = 0;
var a = 30;
var b = 30;
function setup() {
  // make a new div and position it at 10, 10:
  createCanvas($(window).height(), $(window).width());

  text = createDiv("Sensor reading:");
  // make a HTTP call to the server for the data:
  var sensorReading = loadStrings("/data", showData);
}
 
function showData(result) {
   // when the server returns, show the result in the div:
   text.html("Sensor reading: " + result);
   text.position(10, 10);
   // make another HTTP call:
   intruderCount = loadStrings("/count", showData);
   if (result>oldIntruderCount){
      ellipse(a,b,30,30);
      a+=40;
      b+=40;
      oldIntruderCount = result;
   }
}

