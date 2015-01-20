var assert = require('assert');
var server = require('../bin/www');
var request = require('supertest');
var should = require('chai').should();

request = request('http://localhost:3000');

describe('Home page', function(){
	it('should return "It\'s working!"', function (done){
		request.get('/').expect("It\'s working!", done);
	});
});
	
// Pretty much finished
describe('POST service request', function(){
	this.timeout(5000);

	it('rejects lat alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 100,
			lat: '2323993'
		}).expect(400, done);
	});

	it('rejects long alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 100,
			long: '2323993'
		}).expect(400, done);
	});

	it('rejects no location', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 200
		}).expect(400, done);
	});

	it('accepts lat and long', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 2000,
			long: 400,
			lat: 3003
		}).expect(200, done);
	});

	it('accepts an address id only', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 100,
			address_id: 400
		}).expect(200, done);
	});

	it('requires a service code', function(done){
		request.post('/requests.json').type('form').send({
			address_id: 400
		}).expect(400, done);
	})

	it('saves good requests', function (done){
		request.post('/requests.json').type('form').send({
			address_id: 400,
			service_code: 123
		}).expect(200, function(err, res){
			res.body.service_request_id.should.match(/([a-f]|[0-9])+/);
			done();
		});
	});
});