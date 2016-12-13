
/*
 * Require express and Chart.js
 */
var mysql = require('mysql');

var db_config ={
  host: 'cis550group33.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'PENNTR'
};

var connection;

var query1 = "SELECT A.GENDER, CI.MEDAL, COUNT(CI.MEDAL) AS NUM \
FROM COMPETES_IN CI INNER JOIN ATHLETE A \
  ON CI.NAME=A.NAME \
WHERE CI.YEAR='2008' \
  AND A.COUNTRY='USA' \
GROUP BY A.GENDER, CI.MEDAL;";

function query_db(res, query) {
	connection.query({
	sql: query1,
	timeout: 3000, // 3s
	}, function (error, results, fields) {
		if (error) {
			console.log(error); 
		}
		else {
			output_homepage(res, results);
			console.log(results)
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
	query_db(res, query1);
};

 
