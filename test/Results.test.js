// Dev test modules required
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Add chai should syntax
const should = chai.should();

// Imports
const {resultsModel} = require('../models/Results.model');
const {runServer, app, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config/Database.config');
const {userModel} = require('../models/User.model');

// chaiHTTP for transmission
chai.use(chaiHttp);

function seedTestResults() {
	const seedResults = [];
	for(let i = 1; i <= 250; i++) {
		seedResults.push(generateTestResults());
	}
	return resultsModel.insertMany(seedResults);
}

function generateTestResults() {
	return {
		user_id: faker.random.uuid(),
    score: faker.random.number(),
		results: faker.random.arrayElement(),
		date: faker.date.past()
	}
}

// Generate a test user
function generateTestUser() {
	return {
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		gender: ['Wizard', 'Witch'][Math.floor(Math.random() * 2)]
	}
}

// Delete/Drop the test database upon test completion
function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

// Describe the test
describe ('RESULTS TESTING', function() {
	// Start the server before testing
  let newTestUser;
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});
	// Insert db test users before testing
	before(function() {
    newTestUser = generateTestUser();
    userModel.create(newTestUser);
		return seedTestResults();
	});
	// Remove test users after testing
	after(function() {
		return tearDownDb();
	});
	// Close the server after testing
	after(function() {
		return closeServer();
	});

	const newResult = generateTestResults();


	// Test results endpoint
	describe('Results', function() {
		it('Should create test results', function(done) {
			chai.request(app)
        .post('/user/login')
        .send({
					username: newTestUser.username,
					password: newTestUser.password
				})
        .end(function(err, res) {
          chai.request(app)
          .post('/results?token=' + res.body.token)
          .send(newResult)
          .end(function(err, res) {
            // Chai request chain end, callback when ready
            should.not.exist(err);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            done();
          })
        });
			});
		});
	});
