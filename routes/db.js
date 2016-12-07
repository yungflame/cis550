
/*
 * GET home page, which is specified in Jade.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'cis550project.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'maxying'
})
 
function query_db(res) {
  //query = "SELECT P.login FROM Person P" ;
  query = "SELECT C.Country, C.Year, C.GDP FROM COUNTRY_DATA C"
  + "WHERE C.Country='China' AND C.Year > 1988 AND C.Year < 2016"
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			// output_homepage(res, rows);
		}
	});
}

function output_homepage(res,results) {
	res.render('index.jade', //TO-DO: render some html
		   { title: "CIS550 project",
		     results: results }
	  );
}
 
exports.do_work = function(req, res){
	query_db(res);
};
 
