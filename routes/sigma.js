var express = require('express');
var router = express.Router();
var path = require('path');


/*
 * SigmaJS
 *
 */
router.get('/', function(req, res, next) {
	console.log ("sigma features reached")

	res.render('sigma/index', {
		title: 'Sigma Features'
	});

});


router.get('/basic', function(req, res, next) {
	console.log ("sigma basic reached")

	res.sendFile(path.join(__dirname+'/../views/sigma/basic.html'));

//app.set('views', path.join(__dirname, 'views'));

});



router.get('/neo4j', function(req, res, next) {
	console.log ("sigma reached" + __dirname)

	res.sendFile(path.join(__dirname+'/../views/sigma/load-neo4j-cypher-query.html'));

//app.set('views', path.join(__dirname, 'views'));

});



/* 
 * SigmaJS + Direct Neo4j connection
 *
 */
router.get('/simple', function(req, res, next) {
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





module.exports = router;
