// Node modules
const express 		= require('express');
const bodyParser 	= require('body-parser');
const jwt 				= require('jsonwebtoken');
const logger 			= require('morgan');
const mongoose 		= require('mongoose');
const app 				= express();

// Imports
const {DATABASE_URL, PORT} = require('./config/Database.config');
const cors 								 = require('./system/cors');

// Routing
const userCreate 	= require('./routes/user/Create.user.route');
const userLogin  	= require('./routes/user/Login.user.route');
const questions		= require('./routes/quiz/questions.route');
const quotes			= require('./routes/quiz/quotes.route');
const results 		= require('./routes/results/results.route');

// express
app.use(cors); 							 // CORS
app.use(bodyParser.json()); // Parsing
app.use(logger('common')); // Error logging

// Routing
app.use('/user/create', userCreate); // New user
app.use('/user/login', userLogin);  // Login user
app.use('/questions', questions);
app.use('/quotes', quotes);
app.use('/results', results);

// Run server
let server;
mongoose.Promise 	= global.Promise;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, {useMongoClient: true}, (err) => {
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
