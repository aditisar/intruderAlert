var oldIntruderCount = 0;

function setup() {
  // make a new div and position it at 10, 10:
  // make a HTTP call to the server for the data:
  var sensorReading = loadStrings("/data", showData);
}
 
function showData(result) {
   // when the server returns, show the result in the div:
   $("#count").html(result + " intruders");
   // make another HTTP call:
   if (result>oldIntruderCount){
      $("#stage").append("<div class='traveler'><div class='bouncer'><!-- --></div></div>"); 
      $(".traveler").last().css( "-webkit-animation-duration", "3s" );
      oldIntruderCount = result;
   }
   intruderCount = loadStrings("/count", showData);

}
