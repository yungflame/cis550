
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('index.jade', { 
	  title: 'Welcome to our Home Page' 
  });
};
exports.do_ref = function(req, res){
  res.render('index.jade', {});
};