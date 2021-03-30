const express = require('express');
const bodyParser = require('body-parser');
const mangoose = require('mongoose');
const AppRoutes = require('./Routes/router');

const port = 3080;

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(bodyParser.json());

app.use('/', AppRoutes);


mangoose.connect('mongodb+srv://navya1411:navvi2000@cluster0.98hi3.mongodb.net/RestaurantsData?retryWrites=true&w=majority',
    { useNewUrlParser : true , useUnifiedTopology : true})
    .then(res => {
        app.listen(port, (req,res) => {
        console.log("Server is running on port number " + port);
    })})
    .catch(err => console.log(err));
