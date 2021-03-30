const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealtypeSchema = new Schema({
    id_:{
        type : String,
        required: true
    },
    Name:{
        type : String,
        required: true
    },
    Content:{
        type : String,
        required: true
    },
    Image:{
        type : String,
        required: true
    }
})


module.exports = mongoose.model('mealtypes',MealtypeSchema);