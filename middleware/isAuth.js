const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    req.isAuth = false;
    next();
  }
  const token = header.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    next();
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.jwtPrivateKey);
  } catch (error) {
    req.isAuth = false;
    next();
  }
  if (!decoded) {
    req.isAuth = false;
    next();
  }
  req.isAuth = true;
  req.userId = decoded.userId;
  next();
};
