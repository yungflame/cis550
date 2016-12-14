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
