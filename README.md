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

## Introduction

The city issue tracker provides a way for citizens to submit issues (e.g. graffiti, a streetlight is out) and be in a close feedback loop with the city. It is written in [Node](https://nodejs.org/) using [Express](http://expressjs.com/), [Mongoose (MongoDB)](http://mongoosejs.com/index.html), and [React](http://facebook.github.io/react/).

### Features

- issue reporting
	+ Geolocation
- Node JSON API

## Installation and workflow

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/)(and make sure it's running!). After that, run this in your terminal:

	git clone https://github.com/byu-osl/city-issue-server.git && cd city-issue-server

Install your dependencies using npm (which comes with Node)(sudo may be necessary):

	npm install

Start the server:

	npm start

Npm tries to use [node supervisor](https://github.com/isaacs/node-supervisor) to run, and falls back to `node server.js` if you don't have it installed. After that, you can hit the homepage at [http://localhost:3000/](http://localhost:3000/).

#### Frontend workflow

The project is separated into different modules, and you can use <pre>require(*file without extension*)</pre> to gain access to the module. Browserify is what resolves dependencies. Gulp watches files for changes, and then compiles everything into build.js, which is the main file you include in [index.html](client-side/index.html). Start with this:
	
	cd client-side
	gulp

Gulp is now watching your files, and rebuilds whenever you save a file.

## Walkthrough

The intent of this section is to give you some intution about how the application fits together. Here's what happens when a user submits an issue request:

* the client-side code packs up all of the user input into a POST request, and [sends it to the server](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/client-side/js/app.js#L25).
* the first file it hits is [app.js](app.js), where the meat of the server code is. The server itself is initialized in [server.js](server.js).
* The request is [routed](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/app.js#L27) according to its URL.
* The request and response pass through a bunch of *middleware*. Middleware are a series of functions that the request and response objects pass through. The server modifies the request and response objects until it finally sends the response back to the client.

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

Express is used to organize your server code. If you look in [app.js](app.js), you'll see <pre>app.use(*path*,*middleware*)</pre> all over. `app.use` accepts a callback which takes two parameters: `req` and `res`. <pre>[req](http://expressjs.com/4x/api.html#request)</pre> is the request object and <pre>[res](http://expressjs.com/4x/api.html#response)</pre> is the response object. Routers (like [these handlers](https://github.com/byu-osl/city-issue-server/blob/df461f5672b59b7f06b44cecfddd924d3f5045cc/app.js#L27-29)) are where the meat of your application is.

#### Mongoose and MongoDB

Mongoose is a layer between you and MongoDB. It's how you save incoming requests.

#### Testing

The main test file is (test.js)

### Frontend

#### React

[React](http://facebook.github.io/react/) is a library to help you organize your frontend. It encourages you to separate your application into different components composed of JS *and* HTML in a language called JSX.

#### Bootstrap

### Testing

Testing is done using Mocha. 

## Contributing

Before pushing to the repo, make sure your code passes:

* [jsxhint](https://github.com/STRML/JSXHint)
* Mocha tests (using `npm test`)

### Needs

* administrative section
* submit issue by picture
* optional account creation at issue submission
* form validation
* push notifications?
* code coverage
* front end testing
* production concatenation/minifcation

## Troubleshooting