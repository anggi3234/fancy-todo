const jwt = require('jsonwebtoken')

const authenticate = function(req, res, next) {
  try {
    const token = req.headers.access_token;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded
    // console.log(decoded, "THIS IS DECODED")

    next();
  } catch (err) {
    res.status(400).json({
      message: 'Invalid token',
    })
    next(err)
  }
}

module.exports = authenticate;
