# City Issue Tracker

[![Build Status](https://travis-ci.org/byu-osl/city-issue-server.svg?branch=master)](https://travis-ci.org/byu-osl/city-issue-server)

* [Introduction](#introduction)
	- [Features](#features)
* [Installation](#installation)
* [Walkthrough](#walkthrough)
	- [Backend](#backend)
	- [Frontend](#frontend)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [Appendix](#appendix)
	- Working in Node

## Introduction

The city issue tracker provides a way for citizens to submit issues (e.g. graffiti, a streetlight is out) and be in a close feedback loop with the city. It is written in [Node](https://nodejs.org/) using [Express](http://expressjs.com/), [Mongoose (MongoDB)](http://mongoosejs.com/index.html), and [React](http://facebook.github.io/react/).

This readme is quite optimistic: since the project is in its early stages, some of this is a todo list rather than documentation for existing code.

### Features

- issue reporting
	- geolocation
	- picture taking
- administrative features
	- add service types (issue categories)
	- comment on issues

## Installation

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/)(and make sure it's running!). After that,

	git clone (clone url) && cd city-issue-server

Install your dependencies using npm (which comes with Node)(sudo may be necessary):

	npm install

Start the server:

	npm start

After that, you can hit the homepage at [http://localhost:3000/](http://localhost:3000/).

## Walkthrough

The intent of this section is to give you some intution about how the application fits together. Here's what happens when a user submits an issue request:

* the client-side code packs up all of the user input into a POST request, and [sends it to the server](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/client-side/js/app.js#L25).
* the first file it hits is [app.js](app.js), which is where the meat of the server code is. The server itself is initialized in [server.js](server.js).
* The request is [routed](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/app.js#L27) according to its URL.
* The request and response pass through a bunch of *middleware*. Middleware are a series of functions that the request and response objects pass through. 

### Backend

#### Node.js, Express.js

Node is a platform used to build server-side applications in JavaScript. Here's a short example from [Node's website](https://nodejs.org/):

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

Express is used to organize your server code. [app.js](app.js)

#### Mongoose and MongoDB

### Frontend

#### React

[React](http://facebook.github.io/react/) is a library to help you organize your front end, *including your HTML*. It helps you to think of portions of your 

### Testing

Testing is done using Mocha.

#### Bootstrap

## Contributing

### What's next
- administrative portion
- push notifications?
- Travis CI
- 


## Troubleshooting

## Appendix

