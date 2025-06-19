const jwt = require('jsonwebtoken');
const SECRET = 'jwt_secret_key';

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }

  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Invalid token');
  }
};
