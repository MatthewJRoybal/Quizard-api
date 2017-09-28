// Dev test modules required
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// Add chai should syntax
const should = chai.should();

// Import modules for testing
const {questionModel} = require('../models/Question.model');
const {runServer, app, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config/Database.config');

// Use chaiHTTP for transmission
chai.use(chaiHttp);

// Delete/Drop test database upon test completion
function tearDownDb() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

function seedTestQuestions() {
	const seedQuestions = [];
	for(let i = 1; i <= 250; i++) {
		seedQuestions.push(generateTestQuestion());
	}
	return questionModel.insertMany(seedQuestions);
}

function generateTestQuestion() {
	var category = ["html", "css", "javascript", "nodejs", "git"];
	var type = ["booleen", "multiple"];
	var optionsArray = [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()];
	return {
		name: faker.lorem.words(),
		category: category[Math.floor(Math.random()*category.length)],
		type: type[Math.floor(Math.random()*type.length)],
		question: faker.lorem.sentence(),
		correct: 0,
		options: optionsArray
	}
}

// Describe the test
describe ('QUESTION TESTING', function() {
	// Start the server before testing
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});
	// Insert db test users before testing
	before(function() {
		return seedTestQuestions();
	});
	// Remove test users after testing
	after(function() {
		return seedTestQuestions();
    // return tearDownDb();
	});
	// Close the server after testing
	after(function() {
		return closeServer();
	});

	const newQuestion = generateTestQuestion();

	// Test new user creation endpoint
	describe('Contributed questions', function() {
		it('Should create new questions', function(done) {
			chai.request(app)
				.post('/questions')
				.send(newQuestion)
				.end(function(err, res) {
					console.log(err);
				// Ending chai request chain, when it's done do the callback
					should.not.exist(err);
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					done(); // This is actually when its ended and the next test can be done
			});
		});
	});
});
