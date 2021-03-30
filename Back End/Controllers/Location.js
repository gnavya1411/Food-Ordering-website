const city = require('../Models/Location');

exports.LocationList = (req,res) => {
    city.find().then(response => {
        res.status(200).json({ message :"City Fetched Successfully", City: response})
    }).catch(err => {
        res.status(500).json({ message : err})
    })
}