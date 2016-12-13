
/*
 * Require mysql
 */
var mysql = require('mysql');

var db_config ={
  host: 'cis550group33.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'PENNTR'
};

var connection;

var query_set = [
	"SELECT A.GENDER, CI.MEDAL, COUNT(CI.MEDAL) AS NUM \
	FROM COMPETES_IN CI INNER JOIN ATHLETE A \
	  ON CI.NAME=A.NAME \
	WHERE CI.YEAR='2008' \
	  AND A.COUNTRY='USA' \
	GROUP BY A.GENDER, CI.MEDAL \
	ORDER BY CI.MEDAL, A.GENDER;"
]

var chart_description_set = [ 
	"The medal distribution between US male and female medalists in the Beijing 2008 Olympics"
]

function query_db(res, query, query_number) {
	connection.query({
	sql: query,
	timeout: 3000, // 3s
	}, function (error, results, fields) {
		if (error) {
			console.log(error); 
		}
		else {
			output_homepage(res, results, query_number);
			console.log(results)
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
	var i = Math.floor((Math.random())); // always returns 0 for now
	query_db(res, query_set[i], i);
};