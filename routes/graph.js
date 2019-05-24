var express = require('express');
var router = express.Router();
var path = require('path');


// Popoto
router.get('/popoto', function(req, res, next) {
	console.log ("popoto reached" + __dirname)

	res.sendFile(path.join(__dirname+'/../views/graph/load-neo4j-cypher-query.html'));

//app.set('views', path.join(__dirname, 'views'));

});


// Simple Popoto
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
