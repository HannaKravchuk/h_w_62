const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const accessControl = require('../middlewares/accessControl');
const articles = require('../utils/articles');

router.get('/', auth, accessControl, (req, res) => {
  try {
    res.render('articles/list.ejs', { 
      articles,
      title: 'Articles List',
      currentUser: req.session.user,
      isAdmin: req.user?.role === 'admin'
    });
  } catch (err) {
    console.error('Articles list error:', err);
    res.status(500).render('articles/error.ejs', { 
      message: 'Internal Server Error' 
    });
  }
});

router.get('/:articleId', auth, accessControl, (req, res) => {
  try {
    const id = parseInt(req.params.articleId);
    if (isNaN(id)) {
      return res.status(400).render('articles/error.ejs', {
        message: 'Invalid article ID'
      });
    }

    const article = articles.find(a => a.id === id);
    if (!article) {
      return res.status(404).render('articles/error.ejs', {
        message: 'Article not found'
      });
    }

    res.render('articles/detail.ejs', {
      article,
      title: article.title,
      canEdit: req.user?.role === 'admin' || req.user?.id === article.authorId
    });
  } catch (err) {
    console.error('Article detail error:', err);
    res.status(500).render('articles/error.ejs', {
      message: 'Server error'
    });
  }
});

module.exports = router;