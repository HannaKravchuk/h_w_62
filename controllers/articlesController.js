exports.getArticles = (req, res) => {
  res.send('All articles (admin only)');
};

exports.getArticleById = (req, res) => {
  res.send(`Article with ID ${req.params.articleId}`);
};
