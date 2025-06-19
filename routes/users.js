const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const users = require('../utils/users');

router.get('/', (req, res) => {
  try {
    res.render('users/list', {
      users,
      title: 'Users List',
      currentUser: req.session.user || null
    });
  } catch (err) {
    console.error('Render error:', err);
    res.status(500).send('Server error');
  }
});

router.get('/:username', (req, res) => {
  try {
    console.log('Loaded users:', users);

    const user = users.find(u => u.username === req.params.username);

    if (!user) {
      return res.status(404).render('users/error', {
        message: 'User not found'
      });
    }

    res.render('users/detail', {
      user,
      title: `${user.username}'s Profile`,
      isAdmin: req.session.user?.role === 'admin'
    });
  } catch (err) {
    console.error('User detail error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
