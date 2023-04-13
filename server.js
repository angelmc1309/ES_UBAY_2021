//Install express server
const express = require('express');
const path = require('path');

const app = express();

const cors=require("cors");
const corsOptions ={
  origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/tests'));
app.use(cors(corsOptions)) // Use this after the variable declaration
app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/tests/index.html'));
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


