module.exports = function customizeResponse (req, res, next){
	res.send400 = function (description){
		this.status(400).send({
			code: 400,
			description: description
		});
	};

	res.send500 = function (description){
		this.status(500).send({
			code: 500,
			description: description
		});
	}

	res.send404 = function (description){
		this.status(404).send({
			code: 404,
			descrption: description
		});
	}
	
	next();
};