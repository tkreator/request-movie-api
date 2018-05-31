var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search');
  return;
});

router.get('/results', function(req, res, next) {
  var search = req.query.search;
  var apiKey = process.env.MOVIE_API_KEY;
  var url = 'http://www.omdbapi.com/?apikey=' + process.env.MOVIE_API_KEY + '&s=' + search; 
	request(url, function(error, response, body){
      if (error) {
        res.json({
          confirmation: 'failure',
          message: error
        });
        return;
      }
      if(response.statusCode == 200) {
          var data = JSON.parse(body);
          res.render("results", {data: data});
           //res.json({
            // confirmation: data
           //});
           return;
       }
       return;
  });
  return;
});


module.exports = router;
