var express = require('express'),
    morgan  = require('morgan'),
    path = require('path'),
    serialport = require('serialport'),// include the library
    SerialPort = serialport.SerialPort

var servi = require('servi');
var prevData = "safe";
var latestData = "";
var intruderCount = 0; 

var myPort = new SerialPort('/dev/tty.usbmodem1411', {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\r\n")
 });



function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function saveLatestData(data) {
   console.log(data);
   if(prevData[0]=='I' && latestData[0]=='s') intruderCount+=1;
   prevData = latestData;
   latestData = data; 
   console.log("there are "+ intruderCount +"intruders");
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}

myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);



var app = new servi(false); // servi instance
app.port(33333);             // port number to run the server on
 
// configure the server's behavior:
app.serveFiles("public");     // serve static HTML from public folder
app.route('/data', sendData); // route requests for /data to sendData()
app.route('/count', sendCount); // route requests for /count to sendCount()
// now that everything is configured, start the server:
app.start();

function sendData(request) {
  // print out the fact that a client HTTP request came in to the server:
  //console.log("Got a client request, sending them the data.");
  // respond to the client request with the latest serial string:
  request.respond(latestData);
}

function sendCount(request) {
  // respond to the client request with intrudercount:
  request.respond(intruderCount);
}