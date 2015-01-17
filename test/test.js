var assert = require('assert');
var server = require('../bin/www');
var request = require('supertest');

request = request('http://localhost:3000');

describe('Home page', function(){
	it('should return "It\'s working!"', function (done){
		request.get('/').expect("It\'s working!", done);
	});
});

describe('POST service request ', function(){
	it('rejects lat alone', function (done){
		request.post('/requests.json').send({
			service_code: 100,
			lat: '2323993'
		}).expect(400, done);
	});

	it('rejects long alone', function (done){
		request.post('/requests.json').send({
			service_code: 100,
			long: '2323993'
		}).expect(400, done);
	});

	it('rejects no location', function (done){
		request.post('/requests.json').send({
			service_code: 200
		}).expect(400, done);
	});

	it('accepts lat and long', function (done){
		request.post('/requests.json').send({
			service_code: 2000,
			long: 400,
			lat: 3003
		}).expect("test", done);
	});

	// Not working. Says a service code is not defined.
	it('accepts an address string only', function (done){
		request.post('/requests.json').send({
			service_code: 100,
			address_string: 400
		}).expect(200, done);
	});

	it('accepts an address id only', function (done){
		request.post('/requests.json').send({
			service_code: 100,
			address_id: 400
		}).expect(200, done);
	});

	it.skip('saves good requests', function (done){
		
	});
});