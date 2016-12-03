'use strict';
/*
Ab-initio
*/
var Q = require('q');
var R = require('request');
var mosc = require('mosc');
var morx = require('morx'); 
var notifCred  = {}; //require('../config/cred').NotificationService;
var MORX_DEFAULT = {throw_error:true};

function flwNotification ( APP_TOKEN )
{
	
	var validateresult, email_url, sms_url;
	//https://emailnotificationqueue.herokuapp.com/
	email_url = "https://emailnotificationqueue.herokuapp.com/api/queue/email"; //default email url;
	sms_url   = "https://emailnotificationqueue.herokuapp.com/api/queue/sms"; //default email url;

	this.setSmsUrl   = function (new_sms_url)   { sms_url   = new_sms_url;   };
	this.setEmailUrl = function (new_email_url) { email_url = new_email_url; };

	validateresult = morx
					 .validate
					 (
					 	{APP_TOKEN:APP_TOKEN}, 
					 	methodSpec.APP_TOKEN, 
					 	MORX_DEFAULT
					 );

	this.APP_TOKEN = validateresult.params.APP_TOKEN;

	this.sendEmail = function ( emailData ) {

		var deferred = Q.defer();

		var validateresult;
		validateresult = morx.validate( emailData, methodSpec.queueEmail, MORX_DEFAULT);
		validateresult.params.app_token = this.APP_TOKEN;

		if(!validateresult.params.placeholders){
			validateresult.params.placeholders = {_____nit:23};
		}
		else
		{
			validateresult.params.placeholders._____nit = 23;
		}

		makeRequest(email_url, validateresult.params)
		.then( function(response) {
			return deferred.resolve(response);
		})
		.catch( function(error){
			return deferred.reject(error);
		});

		return deferred.promise;	
	}



	this.sendSMS = function ( smsData ) {

		var deferred = Q.defer();

		var validateresult;
		validateresult = morx.validate( smsData, methodSpec.queueSMS, MORX_DEFAULT);
		validateresult.params.app_token = this.APP_TOKEN;

		if(!validateresult.params.placeholders){
			validateresult.params.placeholders = {_____nit:23};
		}
		else
		{
			validateresult.params.placeholders._____nit = 23;
		}

		makeRequest(sms_url, validateresult.params)
		.then( function(response) {
			return deferred.resolve(response);
		})
		.catch( function(error){
			return deferred.reject(error);
		});

		return deferred.promise;	
	}


}


function makeRequest(url, formData){
	var requestData = {};
	var deferred    = Q.defer();

	requestData.form = {};
	requestData.form = formData;
	R.post(url, requestData, function(err, res, body){

		if(err){
			return deferred.reject(err);
		}

		return deferred.resolve(body);
	});


	return deferred.promise;
}

/*
Define method specs
*/
var methodSpec = {};

methodSpec['APP_TOKEN'] = morx.spec({}).build('APP_TOKEN', 'required:true').end();

methodSpec['queueSMS'] = morx.spec({})
								.build('template_id', 'required:true')
								.build('sender', 'required:true')
								.build('receiver', 'required:true') 
								.build('placeholders', 'required:false')  
								.end();

methodSpec['queueEmail'] = morx.spec({})
							.build('template_id', 'required:true')
							.build('sender_email', 'required:true')
							.build('sender_name', 'required:true') 
							.build('receiver_email', 'required:true') 
							.build('placeholders', 'required:false')  
							.end();


module.exports = flwNotification;