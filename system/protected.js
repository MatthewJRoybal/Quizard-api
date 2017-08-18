const security = require('./security');
const {sessionsModel} = require('../models/Sessions.model');

module.exports = function(req, res, next) {
  // Pull token from req headers
  // Verify token is valid
  // If valid, apply token data to req and call next
  // If invalid, short circuit the req with a 401
  let token = (req.headers.Authorization || req.headers.authorization || '').split(' ')[1] || req.query.token;
  let user;
  sessionsModel.find({token: token}).then(function(session) {
    let now = Date.now();
    if ((now - session.created) >= session.expiration) {
      return res.status(401).send('Unauthorized');
    }
    try{
      req.user = security.verify(token);
      next()
    }catch(err){
      return res.status(401).send(err)
    }
  }).catch(function(err) {
    return res.status(401).send(err)
  })
}