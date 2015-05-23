'use strict';

var multer     = require('multer');
var mkdirp = require('mkdirp');


module.exports = multer({

	changeDest: function (dest, req, res){
		var date = new Date();
		var dateDir = date.getMonth() + '-' + date.getFullYear() + '/';
		var fullDir = global.__rootDirname + '/uploads/' + dateDir
		mkdirp.sync(fullDir)
		return fullDir;
	},

	limits: {
		files: 1,
		fileSize: 10000000 // in bytes: 10Mb
	}
})