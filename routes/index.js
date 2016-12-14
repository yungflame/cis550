
/*
 * Require mysql
 */
var mysql = require('mysql');

var db_config ={
  host: 'cis550group33.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'PENNTR',
  multipleStatements: true
};

var connection;

var query_set = [
// Query 0
	"SELECT A.GENDER, CI.MEDAL, COUNT(CI.MEDAL) AS NUM \
	FROM COMPETES_IN CI INNER JOIN ATHLETE A \
	  ON CI.NAME=A.NAME \
	WHERE CI.YEAR='2008' \
	  AND A.COUNTRY='USA' \
	GROUP BY A.GENDER, CI.MEDAL \
	ORDER BY CI.MEDAL, A.GENDER",
// Query 
	"SELECT C.YEAR, C.GDP \
	FROM COUNTRY_DATA C \
	WHERE C.COUNTRY='China' \
	  AND C.YEAR > 1990"
]

var chart_description_set = [ 
	"The medal distribution between US male and female medalists in the Beijing 2008 Olympics",
	"Comparing the GDP of China to Russia over time"
]

function query_db(res, query_number) { 
		connection.query(query_set[0] + '; ' + query_set[1],
		function (error, row, fields) {
			if (error) {
				console.log(error); 
			}
			else {
				console.log(row);
				output_homepage(res, row, query_number);
			}
		});
	
}

function output_homepage(res,results, query_number) {
	res.render('index.jade', //TO-DO: render some html
		   	{ 
		   		title: "Charting The Olympics",
		     	results: results,
		     	charttype: query_number,
		     	description: chart_description_set[query_number]
		 	}
	  );
}
 
exports.do_work = function(req, res){
	connection = mysql.createConnection(db_config);
	var i = Math.floor((Math.random()+1)); // RNG FOR Homepage Chart
	query_db(res, i);
};