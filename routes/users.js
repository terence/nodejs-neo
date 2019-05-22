var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




/* ===============================================================
 * USER: Add
 * - 2 functions - add, post
 * */
router.get('/add', function(req, res, next) {
//  res.send('foods index');
  res.render('users/add', {
    title: 'Food glorious food'
  });
});



router.post('/add', function(req, res, next) {
  var db = req.db;
  var foodName = req.body.foodname;
  var foodPrice = req.body.foodprice;
  var foodPop = req.body.foodpop;

  db.documents.write({
    uri: '/menu/entree/' + foodName + '.json',
    collections: ['entree'],
    contentType: 'application/json',
    content: {
      name: foodName,
      popularity: foodPop,
      price: foodPrice
    }
  }).result(
    function(response) {
      console.log('Loaded the following documents:');
      response.documents.forEach( function(document) {
        console.log(' ' + document.uri);
      });
      res.redirect('/users/read?uri=' + response.documents[0].uri)

    },
    function(error) {
      console.log('error here');
      console.log(JSON.stringify(error, null, 2));
    }
  );

  console.log(req.body.name);

//  res.redirect('/users/add');
//  res.redirect('/users/read?uri' +  document.uri);

});




/* ===============================================================
 * USER: List
 *
 *
 */
router.get('/list', function(req, res, next) {
  var session = req.session;
  var q = req.q;

  db.documents.query(
    q.where(
      q.collection('entree')
    )
//    .orderBy(
//      q.sort('uri')
//    )
//    .slice(0,5)
  ).
  result(function(records){
    //res.json(records);
    console.log(records)
    res.render('users/list', {
      title: 'All my Food',
      "blobs" : records
    });
  });
});






module.exports = router;
