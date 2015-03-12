# City Issue Tracker

## Contents

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

This README is quite *optimistic*. Since the project is in its early stages, some of this is a todo list rather than documentation for existing code.

### Features

- issue reporting
	- geolocation
	- picture taking
- administrative features
	- add service types (issue categories)
	- comment on issues

## Installation

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/). After that,

	git clone (clone url) && cd city-issue-server

Install your dependencies using npm (which comes with Node)(sudo may be necessary):

	npm install

Start the server:

	npm start

After that, it should be running at [http://localhost:3000/](http://localhost:3000/).

## Walkthrough

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

Express is used to organize your server code.

#### Mongoose and MongoDB

### Frontend

#### React

[React](http://facebook.github.io/react/) is a library to help you organize your front end, *including your HTML*. It helps you to think of portions of your 

#### Bootstrap

## Contributing



## Troubleshooting

## Appendix

