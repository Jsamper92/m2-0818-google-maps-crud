const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/Restaurant');



router.get('/', (req, res, next) => {
  Restaurant.find().then( restaurants => {
    res.render('restaurant/list', {
      restaurants,
      restStr: JSON.stringify(restaurants)
    });
  }).catch(e=> next(e));
});


router.get('/new', (req, res, next) => {
  res.render('restaurant/new');
});

router.post('/new', (req, res, next) => {

  let restaurant = {
    name: req.body.name,
    description: req.body.description,
    location: {
      type: 'Point',
      coordinates: [Number(req.body.latitude), Number(req.body.longitude)]
    }
  }
  console.log(restaurant);
  Restaurant.create(restaurant).then( restaurant => {
    res.redirect('/restaurant');
  }).catch(e=> next(e));
});


module.exports = router;
