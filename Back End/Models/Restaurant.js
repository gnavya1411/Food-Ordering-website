var mongoose = require('mongoose');

var Schema  = mongoose.Schema;

var FiltersList = new Schema({
    resId:{
        type:String,
    },
    cuisine_type:{
        type:String,
    },
    
    name:{
        type:String,
    },
    cityName:{
        type:String,
    },
    location_id:{
        type:Number,
    },
    city_id:{
        type:Number,
    },
    locality:{
        type:String,
    },
    rating_text:{
        type:String,
    },
    min_price:{
        type:Number,
    },
    contact_number:{
        type:Number,
    },
    cuisine_id:{
        type:Number,
    },
    mealtype_id:{
        type:Number,
    },

    type:{
        type:Array,
    },
    cuisine:{
        type:Array,
    }
   

    
});


module.exports = mongoose.models.filters || mongoose.model('filters',FiltersList);