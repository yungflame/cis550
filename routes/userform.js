var mysql = require('mysql');

var db_config ={
  host: 'cis550group33.chgqikrkerri.us-west-2.rds.amazonaws.com',
  user: 'maxying',
  password: 'cis550group33',
  database: 'PENNTR',
  multipleStatements: true
};

var connection;

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
				//console.log(row);
				output_homepage(res, row, query_number);
			}
		});
}

exports.do_work = function(req, res){
  var country = req.query.country; // $_GET["country"]
  if (country) { 
    res.render('chartform.jade', { 
      title: "Here's Your Chart",
      country: country
    });
  }
  else {
    res.render('userform.jade', { 
  	  title: 'Try Interacting With Our Database' 
    });
  }
};
