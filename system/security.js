const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'as;dlkja;lkjasdf';
const round = 10;


function hash(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(round, function(err, salt) {
      if(err) {
        return reject(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if(err) {
          return reject(err);
        }
        resolve(hash);
      })
    })
  })
}

function compare(password, hash) {
  // compare the two hashes
  return bcrypt.compare(password, hash);
}

function sign(data) {
  // Encrypt here and have client decrypt it --> has is never decryptable
  return jwt.sign(data, secret);
}

function verify(token) {
  // When someone sends us a token and we need to decrypt it
  return jwt.verify(token, secret);
}

module.exports = {hash, compare, sign, verify};
