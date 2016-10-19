'use strict';

var expect = require('chai').expect;
var notif   = require('../');

function notifDelegate (token, data, action) {

	return function () {
		var notifObj = new notif(token);
		return notifObj[action](data);
	}

}

describe('#NotificationService', function () {

	it('Should throw "APP_TOKEN is required error"', function () {

		expect(notifDelegate()).to.throw('APP_TOKEN is required');

	});

	var requiredFields = ['template_id', 'sender_email', 'sender_name', 'receiver_email'];
	requiredFields
	.forEach( function (required) {

		it('Should throw ' + required + ' is required error', function () {
			var data = {
				'template_id':'90909',
				'sender_name':'Meol Neeo',
				'sender_email':'Meol@gmail.com',
				'receiver_email':'kingran@gmail.com'
			};
			delete data[required];
			expect( notifDelegate('abcde', data, 'sendEmail') ).to.throw(required + ' is required');
		});

	});

	it('Should fail with template not found error', function (done) {

		var data = {
			'template_id':'57f39da1e9f464d11843a29f',
			'sender_name':'Meol Neeo',
			'sender_email':'Meol@gmail.com',
			'receiver_email':'kingran@gmail.com'
		};
		notifDelegate('57f39da1e9f464d11843a29f', data, 'sendEmail')()
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


	it('Should successfully queue an email for sending', function (done) {

		var data = {
			'template_id':'5805ebe718732edb5dab67ba',
			'sender_name':'PWC',
			'sender_email':'noreply@thrivesend.com',
			'receiver_email':'ayodejsol@gmail.com'
		};
		notifDelegate('90933-NSJKD-ASKD', data, 'sendEmail')()
		.then( function (response) {
			response = JSON.parse(response); console.log(response);
			expect(response).to.have.property('status').to.equal('ok');
			expect(response.data).to.have.property('message').to.equal('successfuly saved');
			done();
		})
		.catch( function (error) {
			console.log(error, '12');
			expect(error).to.equal(null);
			done();
		});
	});
 


});