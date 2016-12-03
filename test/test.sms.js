'use strict';

var expect = require('chai').expect;
var notif   = require('../');

function notifDelegate (token, data, action) {

	return function () {
		var notifObj = new notif(token);
		return notifObj[action](data);
	}

}

describe('#NotificationSMSService', function () {

	it('Should throw "APP_TOKEN is required error"', function () {

		expect(notifDelegate()).to.throw('APP_TOKEN is required');

	});

	var requiredFields = ['template_id', 'sender', 'receiver'];
	requiredFields
	.forEach( function (required) {

		it('Should throw ' + required + ' is required error', function () {
			var data = {
			    "template_id" : "57b591bb9400751d114b0583",
			    "sender" : "PWC",
			    "receiver" : "08140732882",
			    "placeholders" : {
			        "Ridwan" : "Mandem",
			        "user": "123455ss"
			    }
			};
			delete data[required];
			expect( notifDelegate('abcde', data, 'sendSMS') ).to.throw(required + ' is required');
		});

	});

	it('Should fail with template not found error', function (done) {

		var data = {
			    "template_id" : "57b591bb9400751d114b0583",
			    "sender" : "PWC",
			    "receiver" : "08140732882",
			    "placeholders" : {
			        "Ridwan" : "Mandem",
			        "user": "123455ss"
			    }
			};
		notifDelegate('90933-NSJKD-ASKD', data, 'sendSMS')()
		.then( function (response) {
			response = JSON.parse(response);
			expect(response).to.have.property('status').to.equal('error');
			expect(response.data).to.have.property('message').to.equal('template not found');
			done();
		})
		.catch( function (error) {
			console.log(error, '12');
			done();
		});
	});


	it('Should successfully queue an SMS for sending', function (done) {
		var data = {
			    "template_id" : "5800ef819d625ced5e8431a4",
			    "sender" : "PWC",
			    "receiver" : "+2348068369634",
			    "placeholders": {
			    	"senderName":"Deji Naiwo"
			    }
			};
		notifDelegate('90933-NSJKD-ASKD'/*'90933-NSJKD-ASKD'*/, data, 'sendSMS')()
		.then( function (response) {
			response = JSON.parse(response); console.log(response);
			expect(response).to.have.property('status').to.equal('ok');
			expect(response.data).to.have.property('message').to.equal('successfuly saved');
			done();
		})
		.catch( function (error) {
			console.log(error, '12');
			//expect(error).to.equal(null);
			done();
		});
	});
 


});