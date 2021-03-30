const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    Order_id:{
        type:String,
        
    },
    Name:{
        type : String,
        
        
    },
    Phone:{
        type : String,
        
    },
    Email:{
        type : String,
        
    },
    Address:{
        type : String,
        
    },
    Number_of_Persons:{
        type : String,
        
        
    }
})


module.exports = mongoose.model('Order',OrderSchema);