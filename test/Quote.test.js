// Dev test modules required
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Add chai should syntax
const should = chai.should();

// Import modules for testing
const {quoteModel} = require('../models/quote');
const {runServer, app, closeServer} = require('../server');
const {DB_TEST} = require('../system/config');

// Use chaiHTTP for transmission
chai.use(chaiHttp);

function seedTestQuotes() {
	const seedQuotes = [];
	for(let i = 1; i <= 250; i++) {
		seedQuotes.push(generateTestQuotes());
	}
	return quoteModel.insertMany(seedQuotes);
}

function generateTestQuotes() {
	var type = ["book", "comic", "tvshow", "movie", "other"];
	return {
		type: type[Math.floor(Math.random()*type.length)],
		story: faker.lorem.words(),
		character: faker.name.firstName(),
		quote: faker.lorem.sentence()
	}
}

// Delete/Drop the test database upon test completion
function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

// Describe the test
describe ('QUOTES TESTING', function() {
	// Start the server before testing
	before(function() {
		return runServer(DB_TEST);
	});
	// Insert db test users before testing
	before(function() {
		return seedTestQuotes();
	});
	// Remove test users after testing
	after(function() {
		// return seedTestQuotes(); 
		return tearDownDb();
	});
	// Close the server after testing
	after(function() {
		return closeServer();
	});

	const newQuote = generateTestQuotes();

	// Test new user creation endpoint
	describe('Contributed quotes', function() {
		it('Should create magic quotes', function(done) {
			// Is the chai request "app" the same const app from server.js for express()?
			chai.request(app)
				.post('/api/quiz/quotes')
				.send(newQuote)
				.end(function(err, res) {
					console.log(err);
				// Ending chai request chain, when it's done do the callback
//					should.not.exist(err);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					done(); // This is actually when its ended and the next test can be done
			});
		});
	});
});
