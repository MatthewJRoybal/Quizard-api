// Dev test modules required
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Add chai should syntax
const should = chai.should();

// Import modules for testing
const User = require('../models/user');
const {runServer, app, closeServer} = require('../server');
const {DB_TEST} = require('../system/config');

// Use chaiHTTP for transmission
chai.use(chaiHttp);

// Create 10 test users and push them into the database with the userModel
function seedTestUsers() {
	const seedUsers = [];
	for(let i = 1; i <=10; i++) {
		seedUsers.push(generateTestUser());
	}
	return User.insertMany(seedUsers);
}

// Generate a test user
function generateTestUser() {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
		gender: ['Wizard', 'Witch'][Math.floor(Math.random() * 2)]
	}
}

// Delete/Drop the test database upon test completion
function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

// Describe the test
describe ('USER TESTING', function() {
	// Start the server before testing
	before(function() {
		return runServer(DB_TEST);
	});
	// Insert db test users before testing
	before(function() {
		return seedTestUsers();
	});
	// Remove test users after testing
	after(function() {
		return seedTestUsers(); // return tearDownDb();
	});
	// Close the server after testing
	after(function() {
		return closeServer();
	});

	const newTestUser = generateTestUser();

	// Test new user creation endpoint
	describe('Register New User', function() {
		it('Should create a user account', function(done) {
			// Is the chai request "app" the same const app from server.js for express()?
			chai.request(app)
				.post('/api/user/signup')
				.send(newTestUser)
				.end(function(err, res) {
					console.log(res.body);
				// Ending chai request chain, when it's done do the callback
					should.not.exist(err);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					// res.body.should.have.property('_id');
					done(); // This is actually when its ended and the next test can be done
			});
		});
	});
	describe('User login process', function() {
		it('Should login a user', function() {
			return chai.request(app)
				.post('/api/user/signin')
				.send({
					email: newTestUser.email,
					password: newTestUser.password
				})
				.then(function(res) {
				})
				.catch(function(err) {
					console.log('Your sessions request failed', err);
					should.not.exist(err);
				})
		})
	})
});
