
/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('404.jade', { 
	  title: 'The page you have requested does not exist' 
  });
};
exports.do_ref = function(req, res){
  res.render('404.jade', {});
};