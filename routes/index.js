var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS + Express + Neo4j' });
});


// About
router.get('/about', function(req, res, next) {
	var session = req.session;
	session
				.run('MATCH(n) RETURN n LIMIT 25')
				.then(function(result){
					result.records.forEach(function(record){
						console.log(record);
					});
				})
				.catch();
	console.log ('About Page renders');
  res.render('about', { title: 'About Page' });
});



/* =============================
 * LOGIN: Signup
 *
 * */
router.get('/signup', function(req, res, next) {
//  res.send("Index Page");
  res.render('index', { title: 'Graph App Signup' });

});








module.exports = router;
