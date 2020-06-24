const jwt = require('jsonwebtoken');

CheckAuth = (req, res, next) => {
  const { body, query, headers, app, decoded } = req;
  if (body === undefined) return;

  const token = body.token || query.token || headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decodedJWT) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        decoded = decodedJWT;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}

module.exports = CheckAuth;
