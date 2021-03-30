const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    cityId:{
        type : String,
        required: true
    },
    locationId:{
        type : String,
        required: true
    },
    cityName:{
        type : String,
        required: true
    },
    area:{
        type : String,
        required: true
    },
    locality:{
        type : String,
        required: true
    },
    adress:{
        type : String,
        required: true
    }
})


module.exports = mongoose.model('city',LocationSchema);