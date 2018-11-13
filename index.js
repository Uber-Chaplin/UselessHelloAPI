/*
*
* Main file for an useless api
*
*/

// Dependancies
const http = require('http');
const url = require('url');
const config = require('./config');
const fs = require('fs')

// Initalizing the server
let server = http.createServer(function(req,res){

  // Get the URL and parse it.
  let parsedURL = url.parse(req.url,true);

  // Get the path.
  let path = parsedURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Choose the handler this request needs
  let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notfound;

  /* let data = {
      'trimmedPath' : trimmedPath,
    };
  */
  // Route the request to the handler specified
  chosenHandler(data,function(statusCode, payload){

    // Use the status code returned by the handler, else return the code 200
    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

    // Use the payload returned by the handler, else empty object
    payload = typeof(payload) == 'string' ? payload : 'You had one job ... 404';

    // Convert the payload to a string
    let payloadString = JSON.stringify(payload)

    // Send the response
    res.setHeader('Content-Type','application/json');
    res.writeHead(statusCode);
    res.end(payloadString);

    // Log the request path.
    console.log('Returning:',statusCode,payload);
  });
});

// Starting the http server
 server.listen(1337, function(){
  console.log("The server is listening on 1337");
});

// Define the handlers
let handlers = {};

//Ping handler
handlers.hello = function(data,callback){
  callback(303,'Hello and thank you for opening this usless API');
};

//404 handler
handlers.notfound = function(data,callback){
  callback(404);
};

// Define a request router
let router = {
  'hello' : handlers.hello
};
