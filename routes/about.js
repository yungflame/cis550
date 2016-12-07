
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('about.jade', { 
	  title: 'Welcome to our About Page' 
  });
};
exports.do_ref = function(req, res){
  res.render('about.jade', {});
};