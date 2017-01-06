var express = require('express');
var admin = require("firebase-admin");

var serviceAccount = require('./cis550group33-firebase-adminsdk-6u35v-4643d3d6b9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "***"
});

var db = admin.database();
var ref = db.ref("messages");;

function saveMessage(name,email,message) {
	ref.push().set({
	  name: name,
	  email: email,
	  message: message
	});
}

exports.do_work = function(req, res){
  res.render('contact.jade', { 
	  title: 'Contact Us Here' 
  });
  var name = req.query.name; // $_GET["name"]
  var email = req.query.email;
  var message = req.query.message;
  if (req.query.human == '5') {saveMessage(name,email,message);}
};
