
/*
 * Require mysql
 */
var mysql = require('mysql');

var db_config ={
  host: '***',
  user: '***',
  password: '***',
  database: '***',
  multipleStatements: true
};

var connection;

var query_set = [
// Query 0
	"SELECT CI.AGENDER, CI.MEDAL, COUNT(CI.MEDAL) AS NUM \
	FROM COMPETES_IN CI \
	WHERE CI.YEAR='2004' \
	  AND CI.COUNTRY='Japan' \
	GROUP BY CI.AGENDER, CI.MEDAL;",
// Query 1
	"SELECT C.YEAR, (C.GDP/1000) AS GDP, COUNT(CI.MEDAL) AS NUM \
	FROM COUNTRY_DATA C \
	INNER JOIN COMPETES_IN CI ON (C.COUNTRY=CI.COUNTRY) AND (C.YEAR = CI.YEAR) \
	WHERE C.COUNTRY='China' \
	  AND C.YEAR > 1983 \
	GROUP BY C.YEAR, (C.GDP/1000);",
// Query 2
	"SELECT t1.MEDAL, t1.EGENDER, COUNT(t1.MEDAL) AS NUM \
	FROM \
	(SELECT DISTINCT CI.MEDAL, CI.EGENDER, CI.EVENT, CI.DISCIPLINE \
	FROM COMPETES_IN CI \
	WHERE CI.COUNTRY = 'United States' \
	  AND CI.YEAR = 2008 \
	ORDER BY CI.MEDAL, CI.EGENDER) t1 \
	GROUP BY t1.MEDAL, t1.EGENDER;",
// Query 3
	"SELECT H.COUNTRY, H.YEAR, H.COST, C.GDP \
	FROM HOST_CITY H, COUNTRY_DATA C \
	WHERE H.COUNTRY = C.COUNTRY \
	  AND H.YEAR = C.YEAR \
	  AND H.COST IS NOT NULL \
	  AND H.YEAR >= 1972;",
// Query 4
	"SELECT C.COUNTRY, C.POPULATION \
	FROM COUNTRY_DATA C \
	WHERE C.YEAR = 2014 \
	  AND (C.COUNTRY = 'China' OR C.COUNTRY = 'Russia' OR C.COUNTRY = 'Indonesia' OR C.COUNTRY = 'Brazil' OR C.COUNTRY = 'India' OR C.COUNTRY = 'United States');",
// Query 5
	"SELECT t1.SPORT, COUNT(*) AS NUM \
	FROM ( \
	SELECT DISTINCT E.EVENT, E.DISCIPLINE, E.GENDER, E.SPORT, C.MEDAL \
	FROM COMPETES_IN C INNER JOIN EVENT E \
	  ON C.EVENT = E.EVENT AND C.DISCIPLINE = E.DISCIPLINE AND C.EGENDER = E.GENDER \
	WHERE C.COUNTRY = 'Australia' \
	  AND C.YEAR = '1976' \
	) t1 \
	GROUP BY t1.SPORT;"
]

var chart_description_set = [ 
	"The medal distribution between Japanese male and female medalists in the Athens 2004 Olympics",
	"Comparing the GDP of China to the number of Chinese medalists from 1984 onwards",
	"The medal distribution of the US by event gender at the Beijing 2008 Olympics",
	"Cost of the Olympics for the host country vs log-GDP (both in USD)",
	"Comparing populations (in millions) from high population countries around the world",
	"Breakdown by sport of Australia's medals in the 1976 Olympics"
]

function query_db(res, query_number) { 
		var multiquery = '';
		for (var i = 0; i < query_set.length; i++) {
			multiquery += query_set[i];
		}
		connection.query(multiquery,
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
	var i = getInt(0, query_set.length-1); // RNG FOR Homepage Chart
	query_db(res, i);
};

function getInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}