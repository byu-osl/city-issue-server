# City Issue Tracker

[![Build Status](https://travis-ci.org/byu-osl/city-issue-server.svg?branch=master)](https://travis-ci.org/byu-osl/city-issue-server)

* [Introduction](#introduction)
	- [Features](#features)
* [Installation](#installation)
* [Contributing](#contributing)
* [Walkthrough](#walkthrough)
	- [Backend](#backend)
	- [Frontend](#frontend)
* [Troubleshooting](#troubleshooting)

## Introduction

The city issue tracker provides a way for citizens to submit issues (e.g. graffiti, a streetlight is out) and be in a close feedback loop with the city. It is written in [Node](https://nodejs.org/) using [Express](http://expressjs.com/), [Mongoose (MongoDB)](http://mongoosejs.com/index.html), and [React](http://facebook.github.io/react/). It implements (and will augment) the [Open311 specification](http://wiki.open311.org/GeoReport_v2/), and is under the direction of [Daniel Zappala](https://github.com/zappala) of BYU. 

This readme assumes you know very little about Node, etc.

### Features

- issue reporting
	+ Geolocation
- Node JSON API

## Installation and workflow

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/)(and make sure it's running!). After that, run this in your terminal:

	git clone https://github.com/byu-osl/city-issue-server.git && cd city-issue-server

*All terminal commands should be from the city-issue-server directory from now on*. Install your dependencies using npm (this may take a minute or two, and may require using sudo):

	npm install
	sudo npm install -g gulp

Start the server:

	npm start

Npm tries to use [node supervisor](https://github.com/isaacs/node-supervisor) to run, and falls back to `node server.js` if you don't have it installed. After that, you can hit the homepage at [http://localhost:3000/](http://localhost:3000/). **Note**: you won't see anything on the homepage until you run `gulp`. See the next section for details.

After the server is running, populate the database with a few dummy items:

	node load-database.js

#### Frontend workflow

The project is separated into different modules, and you can use <code>require(*file without extension*)</code> to gain access to the module. Browserify is what resolves dependencies. Gulp watches files for changes, and then compiles everything into build.js, which is the main file you include in [index.html](client-side/index.html). Start with this:
	
	cd client-side
	gulp

Gulp is now watching your files, and rebuilds whenever you save a file.

## Contributing

Before pushing to the repo, make sure your code passes:

* [jsxhint](https://github.com/STRML/JSXHint)
* Mocha tests (using `npm test`)

### Todo

Ranked by priority:
- [ ] administrative section for city employees
- [ ] endpoints:
	+ [ ] POST service type
- [ ] authentication
- [ ] email notifications for status updates
- [ ] optional account creation at issue submission
- [ ] form validation
- [ ] submit issue by picture
- [ ] set up frontend testing
- [ ] production concatenation/minifcation
- [ ] code coverage
- [ ] push notifications?
- [ ] ES6 integration: frontend and backend

## Walkthrough

The intent of this section is to give you some intution about how the application fits together. Here's what happens when a user submits an issue request:

* the client-side code packs up all of the user input into a POST request, and [sends it to the server](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/client-side/js/app.js#L25).
* the first file it hits is [app.js](app.js), where the meat of the server code is. The server itself is initialized in [server.js](server.js).
* The request is [routed](https://github.com/byu-osl/city-issue-server/blob/91d028777761815ce4814f8ec081179809a9cfdb/app.js#L27) according to its URL.
* The request and response pass through a bunch of *middleware*. Middleware are a series of functions that the request and response objects pass through. The server modifies the request and response objects until it finally sends the response back to the client.

### File structure

```
city-issue-server                  // main directory
├── 311spec.txt                    // kept sort of as a todo list from the
│									  Open311 spec
├── app.js                         // main server file
├── client-side                    // public files for the client
│   ├── css                        // css
│   ├── dist                       // where Gulp sends built files
│   ├── gulpfile.js                // Gulp configuration
│   ├── index.html                 // main html file
│   ├── js                         // js
│   │   ├── app.js                 // main js file
│   │   ├── CategorySection.js     // request submission React component
│   │   ├── DescriptionSection.js  // request submission React component
│   │   ├── LocationSection.js     // request submission React component
│   │   ├── navbar.js              // 
│   │   ├── reactdemo.jsx          // temporary React demo for reference
│   │   └── server-api.js          // Object that interacts with the server
│   └── vendor                     // directory containing 3rd-party files
├── load-database.js               // use this to load dummy data in the DB
├── models                         // Mongoose models - request, service, user
├── node_modules                   // don't modify: npm manages this
├── package.json                   // npm project configuration
├── README.md                      // this document (inception)
├── routes                         // handlers for the different API endpoints
├── server.js                      // entry point for the server
├── start.sh                       // used by npm start: starts the server
├── test                           // server-side tests
└── utility                        // custom extras for the server
```

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

Express is used to organize your server code. If you look in [app.js](app.js), you'll see <code>app.use(*path*, *middleware*)</code> all over. `app.use` accepts a callback which takes two parameters: `req` and `res`. <code>[req](http://expressjs.com/4x/api.html#request)</code> is the request object and <code>[res](http://expressjs.com/4x/api.html#response)</code> is the response object. Routers (like [these handlers](https://github.com/byu-osl/city-issue-server/blob/df461f5672b59b7f06b44cecfddd924d3f5045cc/app.js#L27-29)) are where the meat of your application is.

#### Mongoose and MongoDB

[Mongoose](http://mongoosejs.com/docs/guide.html) is the *M* in MVC. You use it to interact with the database: saving requests, searching, deleting, etc. 

#### Testing

Testing is done using Mocha and a few different libraries. The main test file is [test.js](test/test.js). Right now, the only tests that are written send GET and POST requests to the different endpoints and verify that the right information came back.

### Frontend

#### React

[React](http://facebook.github.io/react/) is a library to help you organize your frontend. It encourages you to separate your application into different components composed of JS *and* HTML in a language called JSX.

#### Bootstrap

[Bootstrap](http://getbootstrap.com/) is an extremely popular, responsive HTML/CSS framework. Try to stick to using default Bootstrap classes - we can modify them later.

### Testing

No front end tests are set up, ATM. Feel free to recommend testing strategies; Facebook uses something called [Jest](https://facebook.github.io/jest/) to test React apps, so that's probably what we'll go with.

## Troubleshooting

If you need help, [submit an issue](https://github.com/byu-osl/city-issue-server/issues/new).

The biggest problem I've seen is when `npm install` explodes. I think you'll typically see something like this in the error message:

	npm ERR! code EACCES

To fix this, prepend sudo to your command: <code>*sudo* npm install</code> and that should take care of it.

