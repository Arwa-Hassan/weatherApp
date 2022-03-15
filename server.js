// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website')) ;

// Setup Server
const port = 3030 ;
const server = app.listen(port , ()=> {
  console.log(`Your running on port ${port}`) ;
}) ;

// Initialize all route with a callback function
app.get('/all' , call1 ) ;
// Callback function to complete GET '/all'
function call1(req , res){
  
};
// Post Route
app.post('/postall' , function (req , res){
      const data = req.body;
      console.log(data);
      projectData = {
        date: data.date ,
        temp: data.temp ,
        content: data.feeling ,
      }
});
