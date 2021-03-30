const filters = require('../Models/Restaurant');

exports.resbylocality=  (req,res) => {
    var city = req.params.mealtype_id;
    
    filters.find({"mealtype_id": city}).then(response =>{
            res.status(200).json({'meal_id': response.map((item)=>item.locality)});
       
    }).catch(err => {
        res.status(500).json({message :  err});
    });
    
 }