// Dev test modules required
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Add chai should syntax
const should = chai.should();

// Imports
const {resultsModel} = require('../models/results');
const {runServer, app, closeServer} = require('../server');
const {DB_TEST} = require('../system/config');
const User = require('../models/user');

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
    score: faker.random.number(),
		results: faker.random.arrayElement(),
		date: faker.date.past()
	};
}

// Generate a test user
function generateTestUser() {
	let userEmail = faker.internet.email();
	userEmail = userEmail.toLowerCase();
	return {
		email: userEmail,
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
describe ('RESULTS TESTING', function() {
	before(function() {
		return runServer(DB_TEST);
	});
	before(function() {
		return seedTestResults();
	});
	after(function() {
		return tearDownDb();
	})
	after(function() {
		return closeServer();
	});

	const newTestUser = generateTestUser();
	const newResult = generateTestResults();

	console.log(newResult);

	// Test results endpoint
	describe('Results', function() {
		it('Should create test results', function(done) {
			chai.request(app)
        .post('/api/user/signup')
        .send(newTestUser)
        .end(function(err, res) {
					const token = res.body.token;
					chai.request(app)
						.post('/api/quiz/results')
						.set('Authorization', token)
						.send(newResult)
						.end(function(err, res) {
							res.should.be.json;
							res.body.should.be.a('object');
							res.body.should.have.property('_id');
							res.should.have.status(200);
							should.not.exist(err);
							done();
						});
        });
		});
	});
});
