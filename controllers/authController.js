const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../utils/users');

const SECRET = 'jwt_secret_key';

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const existing = users.find(u => u.username === username);
  if (existing) return res.status(400).send('User already exists');
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role });
  res.send('User registered');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('Invalid credentials');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET);
  res.json({ token });
};
