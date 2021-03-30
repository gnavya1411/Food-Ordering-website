const mealtypes = require('../Models/Mealtype');

exports.MealtypeList = (req,res) => {
    mealtypes.find().then(response =>{
        res.status(200).json({Message : "Mealtype Fetched Succefully", MealType : response})
    }).catch(err => {
            res.status(500).json({Message : err})})

}