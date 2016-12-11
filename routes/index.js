
/*
 * GET home page, which is specified in Jade.
 */
var mysql = require('mysql');

var db_config ={
  host: 'cis550group33.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'PENNTR'
};

var connection;

function query_db(res) {
	connection.query({
	sql: "SELECT A.Name FROM ATHLETE A WHERE A.Country = 'HUN'",
	timeout: 3000, // 3s
	}, function (error, results, fields) {
		if (error) {
			console.log(error); 
		}
		else {
			output_homepage(res, results);
		}
	});
}

function output_homepage(res,results) {
	res.render('index.jade', //TO-DO: render some html
		   { title: "Welcome To Our Home Page",
		     results: results }
	  );
}
 
exports.do_work = function(req, res){
	connection = mysql.createConnection(db_config);
	query_db(res);
};

 
