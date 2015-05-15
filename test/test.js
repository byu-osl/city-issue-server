'use strict';
// Each describe call matches up with one of the API methods listed
// on http://wiki.open311.org/GeoReport_v2/
process.env.PORT = 3001;
process.env.DB   = 'mongodb://localhost/city-issues-TEST';

var server   = require('../server.js');
var request  = require('supertest');
var chai     = require('chai');
var expect   = chai.expect;
var Request  = require('../models/request');
var Service  = require('../models/service');
var connection = server.connection;
require('chai').should();

var requestID1;
var requestID2;

before(function (done){
	populateLeDatabase(done);
	request = request('http://localhost:3001');
});

after(function (){
	connection.db.dropDatabase();
});

describe('GET Service Request', function (){
	it('returns 404 for an non-existent id', function (done){
		request.get('/requests/123456781234567812345678.json').expect(404, done);
	});

	it('returns a request', function (done){
		request.get('/requests/'+requestID1+'.json')
			.expect(200)
			.end(function (err, res){
                var request = res.body;
				request.should.have.property('_id');
				request.should.have.property('status');
				done();
			});
	});
});

describe('GET Service Requests', function(){
	it('must have less than 1000 results', function (done){
		request.get('/requests.json')
			.expect(200).end(function (err, res){
				res.body.length.should.be.below(1000);
				res.body.length.should.be.above(0);
				done();
			});
	});

	it('returns the right number of requests', function (done){  
		request.get('/requests.json').type('form').send({
			service_request_id: requestID1+','+requestID2
		}).expect(200).end(function (err, res){
            var requests = res.body;
			requests.length.should.equal(2);
			done();
		});
	});
});

describe('GET Service List', function(){
	it('returns a list of services', function (done){
		request.get('/services.json')
			.expect(200).end(function(err, res){
				res.body.should.be.an('array');
				done();
			});
	});

	it('returns valid services', function (done){
		request.get('/services.json')
			.expect(200).end(function(err, res){
                var services = res.body;
				services.should.be.an('array');
				var service = services[0];
				service.should.have.property('service_code');
				service.should.have.property('service_name');
				service.should.have.property('metadata');
				done();
			});
	});
});

describe('GET Service Definition', function(){
	it('returns 404 for non-existent service codes', function (done){
		request.get('/services/qqqqqldskjkljafsdlkjsad.json').expect(404, done);
	});

	it('rejects requests without a service code defined', function(done){
		request.get('/services').expect(400, done);
	});
});
	
describe('POST Service Request', function(){

	var validCode = '1';

    var validRequestJSON = {
        service_code: validCode,
        address_id: 1
    };

	it.skip('requires an api key', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			address_id: 1
		}).expect(403, done);
	});

	it('rejects lat alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			lat: '2323993'
		}).expect(400, done);
	});

	it('rejects long alone', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			long: '2323993'
		}).expect(400, done);
	});

	it('rejects no location', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode
		}).expect(400, done);
	});

	it('accepts lat and long', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			long: 400,
			lat: 3003
		}).expect(200, done);
	});

	it('accepts an address id only', function (done){
		request.post('/requests.json').type('form').send({
			service_code: validCode,
			address_id: 400
		}).expect(200, done);
	});

	it('requires a service code', function (done){
		request.post('/requests.json').type('form').send({
			address_id: 400
		}).expect(400, done);
	});

	it('saves good requests', function (done){
		request.post('/requests.json')
			.type('form')
			.send(validRequestJSON).expect(200, function(err, res){
				res.body.service_request_id.should.match(/([a-f]|[0-9])+/);
				done();
			});
	});

	it('should not return service_notice or account_id', function (done){
		request.post('/requests.json').type('form')
			.send(validRequestJSON).expect(200, function(err, res){
				expect(res.body.service_notice).to.be.undefined();
				expect(res.body.account_id).to.be.undefined();
				done();
			});
	});

	it('returns a 404 for a bad service_code', function (done){
		request.post('/requests.json').type('form').send({
			service_code: 'No way this is a service code',
			address_id: 13123
		}).expect(404, done);
	});
});

describe('The server', function(){
	it('returns a 404 for not found pages', function (done){
		request.get('/whatever/asdfsadjksdfa.json').expect(404, done);
	});
});

function populateLeDatabase(done){
	new Service({description: 'Requests to fix potholes', metadata: false, keywords: 'roads', group: 'infrastructure', service_code: 1, service_name: 'potholes', type:  'realtime'})
		.save();
	new Service({description: 'Fix streetlamps', metadata: false, keywords: 'lights', group: 'infrastructure', service_code: 2, service_name: 'streetlight', type:  'realtime'})
		.save();
	new Request({account_id: 123, address_string: 'address', address_id: 4, device_id: 5, description: 'desc', email: 'email', first_name: 'Chris', last_name: 'Anderson', lat: '2432', long: '2342342', media_url: undefined, phone_number: '24232234', service_code: 1, requested_datetime: new Date().toISOString(), status: 'open'})
		.save(function (err, request){
			requestID1 = request._id;
		});
	new Request({account_id: 123, address_string: 'address', address_id: 4, device_id: 5, description: 'desc', email: 'email', first_name: 'Chris', last_name: 'Anderson', lat: '2432', long: '2342342', media_url: undefined, phone_number: '24232234', service_code: 2, requested_datetime: new Date().toISOString(), status: 'open'})
		.save(function (err, request){
			requestID2 = request._id;
			done();
		});
}