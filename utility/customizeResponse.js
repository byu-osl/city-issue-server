'use strict';

module.exports = function customizeResponse (req, res, next){
	[400,401,403,404,500].forEach(function (code) {
		res['send'+code] = function sendCode (description) {
			this.status(code).send({
				code: code,
				descrption: description
			});
		}
	});
	next();
};