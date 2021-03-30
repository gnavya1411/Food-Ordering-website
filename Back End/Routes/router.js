const express = require('express');

var LocationController = require('../Controllers/Location');
var MealtypeController = require('../Controllers/Mealtype');
var RestaurantController = require('../Controllers/Restaurant');
var UserController = require('../Controllers/User');
var OrderController = require('../Controllers/Order');
var mealController = require('../Controllers/meal')

const router = express.Router();

router.get('/cities',LocationController.LocationList);
router.get('/mealtypes',MealtypeController.MealtypeList);
router.get('/RestByCity/:cityname',RestaurantController.RestByCityList);
router.post('/restaurantfilter', RestaurantController.filterSearch);
router.get('/getResById/:resId', RestaurantController.getRestaurantById);
router.get('/api/:mealtype_id', mealController.resbylocality );

router.post('/signup',UserController.signUp);
router.post('/login',UserController.login);

router.post('/placeorder',OrderController.placeOrder)



module.exports = router;