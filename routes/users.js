var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




/* ===============================================================
 * USER: Add
 * - 2 functions - get, post
 * */
router.get('/add', function(req, res, next) {
//  res.send('Users index');
  res.render('users/add', {
    title: 'Add Users'
  });
});



router.post('/add', function(req, res, next) {
  var session = req.session;
  var userName = req.body.username;
  var userYear = req.body.useryear;

	session
		.run('CREATE(n:Person {name:{nameParam}, born:{yearParam}}) RETURN n.title', {nameParam:userName, yearParam:userYear})
		.then(function(result){
			res.redirect('/users/list');
			session.close();
		})
		.catch(function(err){
			console.log(err);
		});


  console.log(req.body.username);

//  res.redirect('/users/add');
//  res.redirect('/users/read?uri' +  document.uri);

});


/*
 * USER: Read Single Record
 *
 */

router.get('/read', function (req, res, next) {
  var session = req.session;
	var id = req.query.id

//  var uri = ['/gs/bluebird.json']
  console.log(req.query.id);
//  console.log(req.params);
	session
		.run('MATCH(n:Person) WHERE id(n) = '+ id +' RETURN n')
		.then(function(result){
			var Person
			console.log(result.records[0]._fields[0].properties.name);
			console.log(result.records[0]._fields[0].properties.born);
			res.render('users/read', {
				title: 'A User',
				id: result.records[0]._fields[0].identity.low,
				name: result.records[0]._fields[0].properties.name,
				year: result.records[0]._fields[0].properties.born
			});
		})
		.catch(function(err){
			console.log(err)
		});

});






/*
 * USER: List
 *
 */
router.get('/list', function(req, res, next) {
  var session = req.session;
  session
		.run('MATCH(n:Person) RETURN n LIMIT 25')
		.then(function(result){
			var PersonArr = [];
			result.records.forEach(function(record){
				PersonArr.push({
					id: record._fields[0].identity.low,
					name: record._fields[0].properties.name,
					born: record._fields[0].properties.born.low
				});		
				console.log(record._fields[0].properties.name);
				console.log(record._fields[0].properties.born.low);
				console.log(record._fields[0].identity.low);
			});
			res.render('users/list', {
				title: 'All My Users',
				people: PersonArr
			});
		})
		.catch(function(err){
			console.log(err);
		});
  console.log ('User List renders');

});


module.exports = router;
