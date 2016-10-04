# FLW Notif Library

## How to use

`npm install flw-notif`

```
var Notif = require('flw-notif');

var notif = new Notif('_APP_TOKEN_');

/*
If you wish to use a diff service url other than the default.
do 

- notif.setSmsUrl('new sms url')
- notif.setEmailUrl('new email url')

Ensure these are set before you call any of the sendEmail / sendSms functions 
*/


//To send Email
notif.sendEmail( emailData ).then( function(response) {
	
});
/*
Valid emailData
{
	'template_id':'57f3a06ce9f464d11843a2a2', //Id of the template to use
	'sender_name':'FLW', //Name that appears as sender in recipient's email
	'sender_email':'xyz@mapunza.com', //Email that appears as sender email in recipient's email
	'receiver_email':'dalantorreneo@camuno.com', //Recipient's email
	 "placeholders" : {
        "subject" : "EMAIL TEMP",
        "username": "@dalantorreneo"
    }
};
*/


//To send SMS
notif.sendSMS( smsData ).then( function(response) {
	
});

/*
Valid smsData
{
    "template_id" : "57b591bb9400751d114b0583", //Id of the template to use
    "sender" : "PWC", //Name that appears as sender on recipient's phone
    "receiver" : "08140732882", //Phone number of the recipient  
    "placeholders" : { /*  */
        "full_name" : "Dorlet Demide Maek",
        "username": "@dorletGrange"
    }
}
*/




```