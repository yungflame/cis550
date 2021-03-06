var mysql = require('mysql');

var db_config ={
  host: '***',
  user: '***',
  password: '***',
  database: '***',
  multipleStatements: true
};

var connection;

function query_db2(res,country,year) { 
  query = "SELECT CI.AGENDER, CI.MEDAL, COUNT(CI.MEDAL) AS NUM " +
  "FROM COMPETES_IN CI " +
  "WHERE CI.YEAR='" + year + "'" + " AND CI.COUNTRY = '" + country + "'" +
  " GROUP BY CI. AGENDER, CI.MEDAL";
	connection.query(query,
		function (error, row, fields) {
			if (error) {
				console.log(error); 
			}
			else {
				for (var i = 0; i < 6; i++) {
					if (!row[i]) {
						row[i] = {NUM: 0};
					}
				}
				output_userchart(res, row, country, year);
			}
		});
}
function output_userchart(res,results, country, year) {
	res.render('chartform.jade',
		   { country: country,
		   	 year: year,
		     results: results }
	  );
}

function query_db1(res) { 
  query = "SELECT DISTINCT(C.COUNTRY) FROM COUNTRY_DATA C";
		connection.query(query,
		function (error, row, fields) {
			if (error) {
				console.log(error); 
			}
			else {
				output_userform(res, row);
			}
		});
}
function output_userform(res,results) {
	res.render('userform.jade',
		   { title: "Choose a country",
		     results: results }
	  );
}


exports.do_work = function(req, res){
  connection = mysql.createConnection(db_config);
  var country = req.query.country; // $_GET["country"]
  var year = req.query.year;
  if (country) { 
    //console.log(country);
    //console.log(year);
    query_db2(res,country,year);
  }
  else {
    query_db1(res);
    /*res.render('userform.jade', { 
  	  title: 'Try Interacting With Our Database' 
    });*/
  }
};
