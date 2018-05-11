// Dotenv
require('dotenv').config();

// Node modules
const passport 		= require('passport');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const jwt 				= require('jsonwebtoken');
const logger 			= require('morgan');
const mongoose 		= require('mongoose');
const cors 				= require('cors');

// File Imports
const {DB_URL, PORT} = require('./system/config');

// express
const app 				= express();
app.use(cors()); 							 // CORS
app.use(bodyParser.json()); // Parsing
app.use(logger('common')); // Error logging

// Routes
app.use('/api', require('./routes'));
app.use('*', function(req, res, next) {
	res.status(404).send("Sorry can't find that!");
});

// Run server
let server;
mongoose.Promise 	= global.Promise;

function runServer(databaseUrl=DB_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// Close server
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// Execute runServer() if called
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

// Export if needed elsewhere, such as testing
module.exports = {app, runServer, closeServer};
