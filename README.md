# City Issue Tracker

![Issue tracker screenshot](https://raw.github.com/byu-osl/city-issue-server/master/notes/screenshot.png)

[![Build Status](https://travis-ci.org/byu-osl/city-issue-server.svg?branch=master)](https://travis-ci.org/byu-osl/city-issue-server)

* [Introduction](#introduction)
	- [Features](#features)
* [Installation and workflow](#installation-and-workflow)
* [Contributing](#contributing)
* [Overview](#overview)
* [Troubleshooting](#troubleshooting)

## Introduction

The City Issue Tracker provides a way for citizens to submit issues (e.g. graffiti, a streetlight is out) and receive status updates from the city. It is written in JavaScript using <a href="https://nodejs.org/" target="_blank">Node</a>, [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com/index.html), and [React](http://facebook.github.io/react/). It implements (and augments) the [Open311 specification](http://wiki.open311.org/GeoReport_v2/), and is under the direction of [Daniel Zappala](https://github.com/zappala) of BYU. 

### Features

- issue reporting with geolocation and image submission
- adminstrative geo-visualization of issues, filtering, searching
- Node JSON API

## Installation and workflow

Install [Node.js](https://nodejs.org/) and [MongoDB](http://docs.mongodb.org/manual/installation/) (make sure it is running: run `mongo` in the terminal, and then `version()`. If Mongo is running, you will get a version number). After that, run this in your terminal:

<code>git clone https://github.com/byu-osl/city-issue-server.git && cd city-issue-server</code>

Install your dependencies using npm (this may take a minute or two, and may require using sudo):

<code>npm install</code>

<code>sudo npm install **-g** supervisor</code>

Start the server:

<code>npm start</code>

`npm start` uses node-supervisor to watch your files and restart when you r files change. You can now hit the homepage at [http://localhost:3000/](http://localhost:3000/). 

You can load some dummy data into the database using [utility/load-demo-requests.js](/utility/load-demo-requests.js)

#### Frontend workflow

The entry point of the application is [App.js](client-side/js/App.js). Dependencies are resolved using Webpack (which also does the ES6 transpilation). You can use `webpack -d --watch` to automatically rebuild when your files change.

## Contributing

This project also uses [JSXHint](https://github.com/STRML/JSXHint). Every JS/JSX file should pass JSXHint.

After that, [submit a pull request](https://help.github.com/articles/using-pull-requests/). Thanks for helping out! Feel free to [submit an issue](https://github.com/byu-osl/city-issue-server/issues/new) for any confusion you might have.

### Todo list

Ranked by priority:
- [ ] admin/users: add users, change roles
- [ ] permissions server/client-side
- [ ] sign in / sign out
- [ ] 
- [ ] 
- [ ] 

## Overview

The main server files are [server.js](server.js) and [app.js](app.js). The business logic is mostly contained in [the routes directory](routes).

### File structure

<pre>
                           
├── app.js                      // entry point for the server.
├── client-side                 // all public, client-side files     
│ ├── bundle.js                 // built by webpack       
│ ├── css                       // more global css (most styling in jsx)
│ ├── images                    // app images    
│ ├── index.html                // main and only html file      
│ ├── js                        
│ │ ├── admin                         
│ │ │ ├── AdminMap.js           // map on the admin page               
│ │ │ ├── AdminNav.js           // left navigation/filtering
│ │ │ ├── AdminPage.js          // body of admin page            
│ │ │ ├── RequestFilters.js     // to filter requests
│ │ │ ├── Requests.js           // shows when "requests" is selected
│ │ │ ├── Services.js           // shows when "services" is selected
│ │ │ └── Users.js              // shows when "users" is selected
│ │ ├── App.js                  // main client-side file. Includes routes.
│ │ ├── components              // commonly used throughout the app         
│ │ ├── HomePage.js             // hit at /               
│ │ ├── individual-request      // details on single request                 
│ │ ├── mixins                           
│ │ │ └── mapMixin.js                           
│ │ ├── Navbar.js               // shows on every page at the top            
│ │ ├── request-form            // main issue request form           
│ │ └── utility                           
│ │   ├── global.js          // ran when the app starts                
│ │   ├── _.js               // underscore.js        
│ │   ├── server-api.js      // talks to server/caches data                  
│ ├── vendor                 // 3rd party libs                   
├── config.js                // server config       
├── models                   // mongoose models    
│ ├── request.js                           
│ ├── service.js                           
│ └── user.js                          
├── notes                           
│ ├── 311spec.txt            // used as a checklist               
│ ├── CI analysis.md         // contextual inquiry results                  
│ ├── contextual inquiry.md                           
│ ├── LICENSE                           
│ ├── Notes.md                           
│ └── screenshot.png         // used in this readme                  
├── package.json                           
├── README.md                           
├── routes                   // node routes        
├── server.js                // initial server creation           
├── start.sh                 // ran in "npm start"          
├── test                           
│ └── test.js                // test file           
├── uploads                  // user uploads
└── utility                           
</pre>

### Example: implementing a new feature

Here is a overview of how you might add a field to the issue request form. Starting server-side:

- For this feature, you need to make changes in [requestsHandler.js](routes/requestsHandler.js), and [the request model](models/request.js).
- Add the field you want to the issue request [schema](https://github.com/byu-osl/city-issue-server/blob/17d05d5950880dcbfe5b02b887665b6ccc983896/models/request.js#L3).
- Add any validation logic in [saveRequest()](https://github.com/byu-osl/city-issue-server/blob/17d05d5950880dcbfe5b02b887665b6ccc983896/routes/requestsHandler.js#L68).
- Write a React component for that portion of the form. This is where your HTML will go.
	+ Create a new file, and follow the pattern of the other components of the form. Make sure to write a getter to expose state to the parent component (avoid using jQuery to interact with the DOM as much as possible).
- Head over to the client-side [app.js](client-side/js/app.js). The entry point for the request form is here. `require` the component you made at the top of the file, and add a reference to it in the `render` function of the form.
- In RequestForm's `submitForm`, get the new field, and add it to the POST request.

## Troubleshooting

If you need help, [submit an issue](https://github.com/byu-osl/city-issue-server/issues/new).