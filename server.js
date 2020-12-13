const express = require('express');
const app = express();
const routes = require('./routes/index');
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({
    extended: true
}));
//Parses the text as JSON 
app.use(bodyParser.json());

//CORS HANDLING
app.use((req,res,next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === "OPTIONS")
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE');
        return res.status(200).json({});
    }
    next();
});

//setup view template
app.set('view engine','ejs');

//add the router and start the app
app.use('/', routes);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');