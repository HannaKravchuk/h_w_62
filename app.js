const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('ejs', require('ejs').renderFile);

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = { username: 'adminUser', role: 'admin' };
  }
  next();
});

app.use('/api', authRoutes);
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

module.exports = app;